import { startTransition, Suspense, useLayoutEffect, useState, type ReactNode } from "react";
import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  CUBID_AUTH_SESSION_STORAGE_KEY,
  serializeCubidAuthSession,
  type CubidAuthSession,
} from "@cubid/auth";
import {
  CUBID_AUTH_TRANSACTION_STORAGE_KEY,
  CubidAuthProvider,
  CubidAuthCallback,
  useCubidAuth,
  type CubidAuthContextValue,
  type CubidAuthProviderProps,
  type CubidAuthProviderStorage,
} from "./index";

const issuer = "https://id.cubid.me";
const clientId = "synthetic-native-rp";
const redirectUri = "cubidexample://auth/callback";
const discovery = {
  issuer,
  authorization_endpoint: `${issuer}/authorize`,
  token_endpoint: `${issuer}/token`,
  userinfo_endpoint: `${issuer}/userinfo`,
  end_session_endpoint: `${issuer}/logout`,
};
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
class AsyncStorage implements CubidAuthProviderStorage {
  readonly values = new Map<string, string>();
  getItem = vi.fn(async (key: string) => this.values.get(key) ?? null);
  setItem = vi.fn(async (key: string, value: string) => { this.values.set(key, value); });
  removeItem = vi.fn(async (key: string) => { this.values.delete(key); });
}
function storedSession(subject = "synthetic-subject", overrides: Partial<CubidAuthSession> = {}): CubidAuthSession {
  return {
    accessToken: "synthetic-access-token", clientId, expiresAt: Date.now() + 60_000,
    idToken: null, idTokenClaims: null, issuedAt: Date.now(), issuer,
    refreshToken: null, scope: ["profile"], subject, tokenType: "Bearer", userInfo: null,
    ...overrides,
  };
}
function seedTransaction(storage: AsyncStorage) {
  storage.values.set(CUBID_AUTH_TRANSACTION_STORAGE_KEY, JSON.stringify({
    clientId, codeVerifier: "synthetic-verifier", issuer, nonce: "synthetic-nonce",
    redirectUri, scope: ["profile"], state: "synthetic-state",
  }));
}
const callbackUrl = `${redirectUri}?code=synthetic-code&state=synthetic-state`;
function callbackFetch() {
  return vi.fn(async (input: string | URL | Request) => new Response(JSON.stringify(
    String(input).endsWith("/token")
      ? { access_token: "synthetic-access-token", token_type: "Bearer", expires_in: 60, scope: "profile" }
      : { sub: "synthetic-new-subject" }
  ), { headers: { "content-type": "application/json" } }));
}
function Capture({ capture }: { capture: (auth: CubidAuthContextValue) => void }) {
  const auth = useCubidAuth();
  useLayoutEffect(() => { capture(auth); }, [auth, capture]);
  return null;
}
function mount(storage: CubidAuthProviderStorage, props: Partial<CubidAuthProviderProps> = {}, extraChildren?: ReactNode) {
  let auth!: CubidAuthContextValue;
  const capture = (value: CubidAuthContextValue) => { auth = value; };
  const tree = (next: Partial<CubidAuthProviderProps> = {}) => (
    <CubidAuthProvider clientId={clientId} issuer={issuer} redirectUri={redirectUri}
      discoveryDocument={discovery} storage={storage} {...props} {...next}>
      <Capture capture={capture} />
      {extraChildren}
    </CubidAuthProvider>
  );
  const view = render(tree());
  return { auth: () => auth, view, rerender: (next: Partial<CubidAuthProviderProps>) => view.rerender(tree(next)) };
}
async function ready(app: ReturnType<typeof mount>, status = "signed_out") {
  await waitFor(() => expect(app.auth().status).toBe(status));
}

describe("async auth-react persistence", () => {
  it("restores a native session after unmount/remount without a synchronous store", async () => {
    const storage = new AsyncStorage();
    storage.values.set(CUBID_AUTH_SESSION_STORAGE_KEY, serializeCubidAuthSession(storedSession()));
    const first = mount(storage);
    await ready(first, "authenticated");
    expect(first.auth().session?.subject).toBe("synthetic-subject");
    first.view.unmount();
    const restarted = mount(storage);
    await ready(restarted, "authenticated");
    expect(restarted.auth().isAuthenticated).toBe(true);
    expect(restarted.auth().session?.subject).toBe("synthetic-subject");
  });

  it("awaits expired-session removal before finishing hydration", async () => {
    const storage = new AsyncStorage();
    const removal = deferred<void>();
    storage.values.set(CUBID_AUTH_SESSION_STORAGE_KEY, serializeCubidAuthSession(storedSession("expired", { expiresAt: 1 })));
    storage.removeItem.mockImplementation(async (key) => { await removal.promise; storage.values.delete(key); });
    const app = mount(storage);
    await waitFor(() => expect(storage.removeItem).toHaveBeenCalledWith(CUBID_AUTH_SESSION_STORAGE_KEY));
    expect(app.auth().status).toBe("loading");
    expect(app.auth().isAuthenticated).toBe(false);
    await act(async () => removal.resolve());
    await ready(app);
    expect(storage.values.has(CUBID_AUTH_SESSION_STORAGE_KEY)).toBe(false);
  });

  it.each(["read", "expired removal"])("surfaces a rejected hydration %s without authentication", async (stage) => {
    const storage = new AsyncStorage();
    const failure = new Error("synthetic storage failure");
    if (stage === "read") storage.getItem.mockRejectedValue(failure);
    else {
      storage.values.set(CUBID_AUTH_SESSION_STORAGE_KEY, serializeCubidAuthSession(storedSession("expired", { expiresAt: 1 })));
      storage.removeItem.mockRejectedValue(failure);
    }
    const app = mount(storage);
    await ready(app, "error");
    expect(app.auth().error).toBe(failure);
    expect(app.auth().isAuthenticated).toBe(false);
  });

  it.each(["logout", "clearSession", "signIn"])("ignores delayed hydration superseded by %s", async (action) => {
    const storage = new AsyncStorage();
    const read = deferred<string | null>();
    storage.getItem.mockReturnValueOnce(read.promise);
    const app = mount(storage);
    await waitFor(() => expect(storage.getItem).toHaveBeenCalled());
    await act(async () => {
      if (action === "signIn") await app.auth().signIn({ performRedirect: false });
      else if (action === "logout") await app.auth().logout({ performRedirect: false });
      else await app.auth().clearSession();
    });
    await act(async () => read.resolve(serializeCubidAuthSession(storedSession("stale"))));
    await ready(app);
    expect(app.auth().session).toBeNull();
    expect(app.auth().error).toBeNull();
  });

  it.each(["storage", "client", "issuer", "redirect"])("ignores a delayed load after changed %s configuration", async (changed) => {
    const storage = new AsyncStorage();
    const read = deferred<string | null>();
    storage.getItem.mockReturnValueOnce(read.promise);
    const app = mount(storage);
    await waitFor(() => expect(storage.getItem).toHaveBeenCalled());
    const nextStorage = new AsyncStorage();
    const next = changed === "storage" ? { storage: nextStorage }
      : changed === "client" ? { clientId: "other-client" }
      : changed === "issuer" ? { issuer: "https://other.example" }
      : { redirectUri: "cubidexample://auth/other" };
    app.rerender(next);
    await ready(app);
    await act(async () => read.resolve(serializeCubidAuthSession(storedSession("stale"))));
    expect(app.auth().session).toBeNull();
    expect(app.auth().status).toBe("signed_out");
  });

  it("does not hydrate a stored session belonging to another client or issuer", async () => {
    const storage = new AsyncStorage();
    storage.values.set(CUBID_AUTH_SESSION_STORAGE_KEY, serializeCubidAuthSession(storedSession("other", { clientId: "other-client" })));
    const app = mount(storage);
    await ready(app);
    expect(app.auth().isAuthenticated).toBe(false);
    // A shared store's other-client data is preserved rather than deleted.
    expect(storage.values.has(CUBID_AUTH_SESSION_STORAGE_KEY)).toBe(true);
  });

  it("does not let a late rejected read overwrite a newer action", async () => {
    const storage = new AsyncStorage();
    const read = deferred<string | null>();
    storage.getItem.mockReturnValueOnce(read.promise);
    const app = mount(storage);
    await waitFor(() => expect(storage.getItem).toHaveBeenCalled());
    await act(async () => { await app.auth().clearSession(); });
    await act(async () => read.reject(new Error("stale failure")));
    expect(app.auth().status).toBe("signed_out");
    expect(app.auth().error).toBeNull();
  });

  it("awaits the PKCE transaction write before launching the system browser", async () => {
    const storage = new AsyncStorage();
    const write = deferred<void>();
    storage.setItem.mockImplementation(async (key, value) => { await write.promise; storage.values.set(key, value); });
    const navigate = vi.fn();
    const app = mount(storage);
    await ready(app);
    let pending!: Promise<string>;
    act(() => { pending = app.auth().signIn({ navigate, provider: "google" }); });
    await waitFor(() => expect(storage.setItem).toHaveBeenCalled());
    expect(navigate).not.toHaveBeenCalled();
    expect(app.auth().status).toBe("loading");
    await act(async () => { write.resolve(); await pending; });
    expect(navigate).toHaveBeenCalledOnce();
    expect(JSON.parse(storage.values.get(CUBID_AUTH_TRANSACTION_STORAGE_KEY) ?? "{}").nonce).toBeTruthy();
    expect(new URL(String(navigate.mock.calls[0]?.[0])).searchParams.get("cubid_provider")).toBe("google");
  });

  it("does not navigate after a rejected transaction write", async () => {
    const storage = new AsyncStorage();
    const failure = new Error("synthetic write rejected");
    storage.setItem.mockRejectedValue(failure);
    const navigate = vi.fn();
    const app = mount(storage);
    await ready(app);
    await act(async () => { await expect(app.auth().signIn({ navigate })).rejects.toBe(failure); });
    expect(navigate).not.toHaveBeenCalled();
    expect(app.auth().status).toBe("error");
    expect(app.auth().isAuthenticated).toBe(false);
  });

  it("persists the callback session before clearing its transaction or authenticating", async () => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    const write = deferred<void>();
    storage.setItem.mockImplementation(async (key, value) => { await write.promise; storage.values.set(key, value); });
    const app = mount(storage, { fetch: callbackFetch() });
    await ready(app);
    let pending!: Promise<CubidAuthSession>;
    act(() => { pending = app.auth().handleCallback({ callbackUrl }); });
    await waitFor(() => expect(storage.setItem).toHaveBeenCalledWith(CUBID_AUTH_SESSION_STORAGE_KEY, expect.any(String)));
    expect(storage.values.has(CUBID_AUTH_TRANSACTION_STORAGE_KEY)).toBe(true);
    expect(app.auth().isAuthenticated).toBe(false);
    await act(async () => { write.resolve(); await pending; });
    expect(app.auth().session?.subject).toBe("synthetic-new-subject");
    expect(storage.values.has(CUBID_AUTH_TRANSACTION_STORAGE_KEY)).toBe(false);
    app.view.unmount();
    const restart = mount(storage);
    await ready(restart, "authenticated");
    expect(restart.auth().session?.subject).toBe("synthetic-new-subject");
  });

  it("keeps the transaction and reports errors when callback persistence fails", async () => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    const failure = new Error("synthetic persistence failure");
    storage.setItem.mockRejectedValue(failure);
    const app = mount(storage, { fetch: callbackFetch() });
    await ready(app);
    await act(async () => { await expect(app.auth().handleCallback({ callbackUrl })).rejects.toBe(failure); });
    expect(app.auth().status).toBe("error");
    expect(app.auth().isAuthenticated).toBe(false);
    expect(storage.values.has(CUBID_AUTH_TRANSACTION_STORAGE_KEY)).toBe(true);
  });

  it("logout removes an in-flight callback write last and prevents session resurrection", async () => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    const write = deferred<void>();
    storage.setItem.mockImplementation(async (key, value) => { await write.promise; storage.values.set(key, value); });
    const app = mount(storage, { fetch: callbackFetch() });
    await ready(app);
    let callback!: Promise<unknown>;
    act(() => { callback = app.auth().handleCallback({ callbackUrl }).catch((error: unknown) => error); });
    await waitFor(() => expect(storage.setItem).toHaveBeenCalled());
    let logout!: Promise<string | null>;
    act(() => { logout = app.auth().logout({ performRedirect: false }); });
    await act(async () => {
      write.resolve();
      expect(await callback).toMatchObject({ code: "operation_superseded" });
      await logout;
    });
    expect(app.auth().status).toBe("signed_out");
    expect(app.auth().session).toBeNull();
    expect(storage.values.size).toBe(0);
  });

  it("does not let an old hydration result overwrite a completed callback", async () => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    const read = deferred<string | null>();
    storage.getItem.mockReturnValueOnce(read.promise);
    const app = mount(storage, { fetch: callbackFetch() });
    await waitFor(() => expect(storage.getItem).toHaveBeenCalled());
    await act(async () => { await app.auth().handleCallback({ callbackUrl }); });
    expect(app.auth().session?.subject).toBe("synthetic-new-subject");
    await act(async () => read.resolve(serializeCubidAuthSession(storedSession("stale"))));
    expect(app.auth().session?.subject).toBe("synthetic-new-subject");
    expect(app.auth().status).toBe("authenticated");
  });

  it("does not launch a pending sign-in after logout supersedes its write", async () => {
    const storage = new AsyncStorage();
    const write = deferred<void>();
    storage.setItem.mockImplementation(async (key, value) => { await write.promise; storage.values.set(key, value); });
    const app = mount(storage);
    const navigate = vi.fn();
    await ready(app);
    let signIn!: Promise<unknown>;
    act(() => { signIn = app.auth().signIn({ navigate }).catch((error: unknown) => error); });
    await waitFor(() => expect(storage.setItem).toHaveBeenCalled());
    let logout!: Promise<string | null>;
    act(() => { logout = app.auth().logout({ performRedirect: false }); });
    await act(async () => {
      write.resolve();
      expect(await signIn).toMatchObject({ code: "operation_superseded" });
      await logout;
    });
    expect(navigate).not.toHaveBeenCalled();
    expect(storage.values.size).toBe(0);
    expect(app.auth().status).toBe("signed_out");
  });

  it.each(["same string", "reordered query", "normalized URL", "optional issuer"])("deduplicates an in-flight one-use callback: %s", async (delivery) => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    const token = deferred<Response>();
    const fetch = vi.fn(async (input: string | URL | Request) => {
      if (String(input).endsWith("/token")) {
        const exchanges = fetch.mock.calls.filter(([url]) => String(url).endsWith("/token"));
        return exchanges.length === 1 ? token.promise
          : new Response(JSON.stringify({ error: "invalid_grant" }), { status: 400 });
      }
      return new Response(JSON.stringify({ sub: "synthetic-new-subject" }));
    });
    const app = mount(storage, { fetch });
    await ready(app);
    let first!: Promise<CubidAuthSession>;
    let duplicate!: Promise<CubidAuthSession>;
    act(() => { first = app.auth().handleCallback({ callbackUrl }); });
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const alternate = delivery === "reordered query" ? `${redirectUri}?state=synthetic-state&code=synthetic-code`
      : delivery === "normalized URL" ? new URL(`${redirectUri}?state=%73ynthetic-state&code=synthetic-code`)
      : delivery === "optional issuer" ? `${callbackUrl}&iss=${encodeURIComponent(issuer)}` : callbackUrl;
    act(() => { duplicate = app.auth().handleCallback({ callbackUrl: alternate }); });
    await act(async () => {
      token.resolve(new Response(JSON.stringify({ access_token: "synthetic-access-token", token_type: "Bearer", expires_in: 60 })));
      expect(await duplicate).toBe(await first);
    });
    expect(fetch.mock.calls.filter(([url]) => String(url).endsWith("/token"))).toHaveLength(1);
    expect(app.auth().status).toBe("authenticated");
  });

  it("rolls back a session when transaction removal fails, including after cold restart", async () => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    const failure = new Error("synthetic transaction removal failure");
    storage.removeItem.mockImplementation(async (key) => {
      if (key === CUBID_AUTH_TRANSACTION_STORAGE_KEY) throw failure;
      storage.values.delete(key);
    });
    const app = mount(storage, { fetch: callbackFetch() });
    await ready(app);
    await act(async () => { await expect(app.auth().handleCallback({ callbackUrl })).rejects.toBe(failure); });
    expect(app.auth().session).toBeNull();
    expect(storage.values.has(CUBID_AUTH_SESSION_STORAGE_KEY)).toBe(false);
    expect(storage.values.has(CUBID_AUTH_TRANSACTION_STORAGE_KEY)).toBe(true);
    app.view.unmount();
    const restart = mount(storage);
    await ready(restart);
    expect(restart.auth().isAuthenticated).toBe(false);
  });

  it("restores the prior persisted session when callback completion fails", async () => {
    const storage = new AsyncStorage();
    const previous = serializeCubidAuthSession(storedSession("prior"));
    storage.values.set(CUBID_AUTH_SESSION_STORAGE_KEY, previous);
    seedTransaction(storage);
    storage.removeItem.mockRejectedValue(new Error("synthetic removal failure"));
    const app = mount(storage, { fetch: callbackFetch() });
    await ready(app, "authenticated");
    await act(async () => { await expect(app.auth().handleCallback({ callbackUrl })).rejects.toThrow("synthetic removal failure"); });
    expect(storage.values.get(CUBID_AUTH_SESSION_STORAGE_KEY)).toBe(previous);
    expect(app.auth().session?.subject).toBe("prior");
  });

  it("reports rollback failure explicitly when the store cannot repair a partial write", async () => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    storage.removeItem.mockRejectedValue(new Error("synthetic removals unavailable"));
    const app = mount(storage, { fetch: callbackFetch() });
    await ready(app);
    await act(async () => {
      await expect(app.auth().handleCallback({ callbackUrl })).rejects.toMatchObject({ code: "session_rollback_failed" });
    });
    expect(app.auth().status).toBe("error");
    expect(app.auth().isAuthenticated).toBe(false);
  });

  it("an uncommitted suspended configuration cannot invalidate the active callback", async () => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    const token = deferred<Response>();
    const never = deferred<void>();
    const attempted = vi.fn();
    const fetch = vi.fn(async (input: string | URL | Request) =>
      String(input).endsWith("/token") ? token.promise : new Response(JSON.stringify({ sub: "synthetic-new-subject" })));
    let auth!: CubidAuthContextValue;
    let changeClient!: () => void;
    function Suspend({ client }: { client: string }) {
      if (client !== clientId) { attempted(); throw never.promise; }
      return null;
    }
    function Harness() {
      const [client, setClient] = useState(clientId);
      changeClient = () => setClient("uncommitted-client");
      return <Suspense fallback={<span>fallback</span>}>
        <CubidAuthProvider clientId={client} issuer={issuer} redirectUri={redirectUri}
          discoveryDocument={discovery} storage={storage} fetch={fetch}>
          <Suspend client={client} />
          <Capture capture={(value) => { auth = value; }} />
        </CubidAuthProvider>
      </Suspense>;
    }
    render(<Harness />);
    await waitFor(() => expect(auth.status).toBe("signed_out"));
    let callback!: Promise<CubidAuthSession>;
    act(() => { callback = auth.handleCallback({ callbackUrl }); });
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    act(() => { startTransition(changeClient); });
    expect(attempted).toHaveBeenCalled();
    await act(async () => {
      token.resolve(new Response(JSON.stringify({ access_token: "synthetic-access-token", token_type: "Bearer", expires_in: 60 })));
      expect((await callback).subject).toBe("synthetic-new-subject");
    });
    expect(auth.status).toBe("authenticated");
  });

  it.each(["redirect change", "unmount"])("rolls back a partial commit across %s during transaction removal", async (change) => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    const removal = deferred<void>();
    storage.removeItem.mockImplementation(async (key) => {
      if (key === CUBID_AUTH_TRANSACTION_STORAGE_KEY) await removal.promise;
      storage.values.delete(key);
    });
    const app = mount(storage, { fetch: callbackFetch() });
    await ready(app);
    let callback!: Promise<unknown>;
    act(() => { callback = app.auth().handleCallback({ callbackUrl }).catch((error: unknown) => error); });
    await waitFor(() => expect(storage.removeItem).toHaveBeenCalledWith(CUBID_AUTH_TRANSACTION_STORAGE_KEY));
    expect(storage.values.has(CUBID_AUTH_SESSION_STORAGE_KEY)).toBe(true);
    let restart: ReturnType<typeof mount> | undefined;
    if (change === "redirect change") app.rerender({ redirectUri: "cubidexample://auth/new" });
    else {
      app.view.unmount();
      restart = mount(storage);
      expect(restart.auth().isAuthenticated).toBe(false);
      expect(restart.auth().status).toBe("loading");
    }
    await act(async () => {
      removal.resolve();
      expect(await callback).toMatchObject({ code: "operation_superseded" });
    });
    expect(storage.values.has(CUBID_AUTH_SESSION_STORAGE_KEY)).toBe(false);
    if (change === "redirect change") {
      await ready(app);
      expect(app.auth().isAuthenticated).toBe(false);
    } else if (restart) {
      await ready(restart);
      expect(restart.auth().isAuthenticated).toBe(false);
    }
  });

  it.each(["clearSession", "logout", "signIn", "handleCallback"])("starts %s from a descendant layout effect after a committed storage change", async (action) => {
    const oldStorage = new AsyncStorage();
    const newStorage = new AsyncStorage();
    seedTransaction(newStorage);
    const done = vi.fn();
    const failed = vi.fn();
    function LayoutAction({ active }: { active: boolean }) {
      const auth = useCubidAuth();
      useLayoutEffect(() => {
        if (!active) return;
        const pending = action === "signIn" ? auth.signIn({ performRedirect: false })
          : action === "handleCallback" ? auth.handleCallback({ callbackUrl })
          : action === "logout" ? auth.logout({ performRedirect: false }) : auth.clearSession();
        void pending.then(done, failed);
      }, [active]);
      return null;
    }
    const tree = (storage: AsyncStorage, active: boolean) =>
      <CubidAuthProvider clientId={clientId} issuer={issuer} redirectUri={redirectUri}
        discoveryDocument={discovery} storage={storage} fetch={callbackFetch()}>
        <LayoutAction active={active} />
      </CubidAuthProvider>;
    const view = render(tree(oldStorage, false));
    view.rerender(tree(newStorage, true));
    await waitFor(() => expect(done).toHaveBeenCalledOnce());
    expect(failed).not.toHaveBeenCalled();
    expect(oldStorage.values.size).toBe(0);
  });

  it.each(["exchange", "validation", "persistence"])("retains a stored session after an initial callback %s failure", async (stage) => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    const previous = serializeCubidAuthSession(storedSession("prior-valid-subject"));
    storage.values.set(CUBID_AUTH_SESSION_STORAGE_KEY, previous);
    if (stage === "validation") {
      const transaction = JSON.parse(storage.values.get(CUBID_AUTH_TRANSACTION_STORAGE_KEY) ?? "{}");
      transaction.scope = ["openid"];
      storage.values.set(CUBID_AUTH_TRANSACTION_STORAGE_KEY, JSON.stringify(transaction));
    }
    if (stage === "persistence") storage.removeItem.mockImplementation(async (key) => {
      if (key === CUBID_AUTH_TRANSACTION_STORAGE_KEY) throw new Error("synthetic removal failure");
      storage.values.delete(key);
    });
    const fetch = stage === "exchange" ? vi.fn(async () => new Response(JSON.stringify({ error: "invalid_grant" }), { status: 400 })) : callbackFetch();
    const app = mount(storage, { fetch }, <CubidAuthCallback callbackUrl={callbackUrl} />);
    await ready(app, "error");
    expect(app.auth().session?.subject).toBe("prior-valid-subject");
    expect(storage.values.get(CUBID_AUTH_SESSION_STORAGE_KEY)).toBe(previous);
    act(() => app.auth().clearError());
    expect(app.auth().status).toBe("authenticated");
    expect(app.auth().isAuthenticated).toBe(true);
  });

  it("never coalesces an invalid callback destination or ambiguous response with a valid exchange", async () => {
    const storage = new AsyncStorage();
    seedTransaction(storage);
    const token = deferred<Response>();
    const fetch = vi.fn(async (input: string | URL | Request) =>
      String(input).endsWith("/token") ? token.promise : new Response(JSON.stringify({ sub: "synthetic-new-subject" })));
    const app = mount(storage, { fetch });
    await ready(app);
    let pending!: Promise<CubidAuthSession>;
    act(() => { pending = app.auth().handleCallback({ callbackUrl }); });
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    await act(async () => {
      await expect(app.auth().handleCallback({ callbackUrl: callbackUrl.replace("/callback", "/wrong") })).rejects.toMatchObject({ code: "invalid_callback_destination" });
      await expect(app.auth().handleCallback({ callbackUrl: `${callbackUrl}&code=synthetic-code` })).rejects.toMatchObject({ code: "invalid_callback" });
      await expect(app.auth().handleCallback({ callbackUrl: `${callbackUrl}&iss=https://other.example` })).rejects.toMatchObject({ code: "invalid_issuer" });
      await expect(app.auth().handleCallback({ callbackUrl: callbackUrl.replace("synthetic-code", "other-code") })).rejects.toMatchObject({ code: "callback_in_progress" });
      token.resolve(new Response(JSON.stringify({ access_token: "synthetic-access-token", token_type: "Bearer", expires_in: 60 })));
      await pending;
    });
    expect(fetch.mock.calls.filter(([url]) => String(url).endsWith("/token"))).toHaveLength(1);
    expect(app.auth().status).toBe("authenticated");
  });

  it("clearSession clears memory immediately, attempts both removals and rejects on failure", async () => {
    const storage = new AsyncStorage();
    storage.values.set(CUBID_AUTH_SESSION_STORAGE_KEY, serializeCubidAuthSession(storedSession()));
    seedTransaction(storage);
    const app = mount(storage);
    await ready(app, "authenticated");
    const failure = new Error("synthetic removal failure");
    storage.removeItem.mockImplementation(async (key) => {
      if (key === CUBID_AUTH_SESSION_STORAGE_KEY) throw failure;
      storage.values.delete(key);
    });
    await act(async () => { await expect(app.auth().clearSession()).rejects.toBe(failure); });
    expect(app.auth().session).toBeNull();
    expect(app.auth().error).toBe(failure);
    expect(app.auth().status).toBe("error");
    expect(storage.removeItem).toHaveBeenCalledWith(CUBID_AUTH_TRANSACTION_STORAGE_KEY);
    expect(storage.values.has(CUBID_AUTH_TRANSACTION_STORAGE_KEY)).toBe(false);
  });
});
