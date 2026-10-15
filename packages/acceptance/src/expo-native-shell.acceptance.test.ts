import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createHttpReferenceClient, createReferenceHandler, ReferenceClientError } from "../../../examples/expo-siwc/transport";
import { createNativeController } from "../../../examples/expo-siwc/native/controller";
import type { NativePorts, SecureStorage } from "../../../examples/expo-siwc/native/controller";
import { createCubidAuthState, createCubidPkceCodeChallenge } from "../../../examples/expo-siwc/sdk";
import { advance, clientId, epoch, fixture, issuer, prepareSigningKey, redirectUri } from "./fixtures/expo-reference";

beforeAll(prepareSigningKey);
beforeEach(() => { vi.spyOn(Date, "now").mockReturnValue(epoch * 1000); });
afterEach(() => { vi.restoreAllMocks(); });
const prefix = "cubid.sdk.reference.test.v1";
const config = { issuer, clientId, callback: redirectUri, storagePrefix: prefix };
const origin = "http://127.0.0.1:8787";
let hostSequence = 0;
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
}
class Storage implements SecureStorage {
  values = new Map<string, string>();
  beforeWrite: (key: string, value: string) => Promise<void> = async () => {};
  beforeRead: (key: string) => Promise<void> = async () => {};
  beforeRemove: (key: string) => Promise<void> = async () => {};
  async getItem(key: string) { await this.beforeRead(key); return this.values.get(key) ?? null; }
  async setItem(key: string, value: string) { await this.beforeWrite(key, value); this.values.set(key, value); }
  async removeItem(key: string) { await this.beforeRemove(key); this.values.delete(key); }
}
async function host() {
  const storagePrefix = `${prefix}.${hostSequence++}`;
  const backend = await fixture();
  const handler = createReferenceHandler(backend.backend, origin);
  const rpcFetch = vi.fn<typeof fetch>(async (input, init) => handler(new Request(input, init)));
  const client = createHttpReferenceClient(origin, rpcFetch);
  const storage = new Storage();
  const ports: NativePorts = {
    client, storage, randomVerifier: async () => createCubidAuthState(), challenge: createCubidPkceCodeChallenge,
    openBrowser: vi.fn(async (url: string) => ({ type: "success" as const, url: backend.callbackFor(url) })), dismissBrowser: vi.fn(async () => {}),
  };
  const create = () => createNativeController(ports, { ...config, storagePrefix });
  const app = create(); await app.initialize();
  const session = () => JSON.parse(storage.values.get(`${storagePrefix}.session`) ?? "null") as { credential: string; expiresAt: number } | null;
  const pending = () => JSON.parse(storage.values.get(`${storagePrefix}.pending`) ?? "null") as { transactionId: string; verifier: string } | null;
  return { backend, handler, rpcFetch, client, storage, ports, create, app, session, pending, storagePrefix };
}

describe("native source lifecycle over the real reference backend and synthetic issuer", () => {
  it("signs in, confirms one no-op, restores only after backend validation and signs out without exposing tokens", async () => {
    const h = await host();
    expect(h.app.getSnapshot().signedIn).toBe(false);
    h.ports.openBrowser = vi.fn(async (url) => {
      expect(h.pending()?.transactionId).toBe(new URL(url).searchParams.get("state"));
      expect(h.pending()?.verifier).toHaveLength(43);
      return { type: "success" as const, url: h.backend.callbackFor(url) };
    });
    await h.app.signIn(); expect(h.app.getSnapshot()).toMatchObject({ signedIn: true, busy: false, pending: false });
    const saved = h.session()!;
    expect(Object.keys(saved).sort()).toEqual(["credential", "expiresAt", "version"]);
    expect(JSON.stringify([...h.storage.values])).not.toMatch(/synthetic-private|id_token|access_token|refresh_token|pairwise/u);
    expect(JSON.stringify(h.app.getSnapshot())).not.toContain(saved.credential);
    await h.app.confirmDemoAction(); expect(h.app.getSnapshot().message).toBe("confirmed");
    expect(h.session()?.credential).toBe(saved.credential);
    const restarted = h.create(); await restarted.initialize();
    expect(restarted.getSnapshot()).toMatchObject({ signedIn: true, message: "restored" });
    await restarted.logout(); expect(restarted.getSnapshot().signedIn).toBe(false); expect(h.session()).toBeNull();
    for (const [url, init] of h.rpcFetch.mock.calls) {
      expect(String(url)).not.toContain("?"); expect(String(url)).not.toContain(saved.credential);
      expect(init).toMatchObject({ credentials: "omit", redirect: "error", cache: "no-store" });
    }
  });
  it.each(["cancel", "dismiss"] as const)("handles browser %s without an app session or token exchange", async (type) => {
    const h = await host(); h.ports.openBrowser = vi.fn(async () => ({ type }));
    await h.app.signIn(); expect(h.app.getSnapshot()).toMatchObject({ signedIn: false, busy: false, pending: false, message: "cancelled" });
    expect(h.session()).toBeNull(); expect(h.pending()).toBeNull(); expect(h.backend.tokenCalls()).toBe(0);
  });
  it("serializes repeated sign-in, invalidates a late browser callback after cancellation and preserves a newer ceremony", async () => {
    const h = await host(); const browser = deferred<{ type: "success"; url: string }>(); let url = "";
    h.ports.openBrowser = vi.fn(async (value) => { url = value; return browser.promise; });
    const first = h.app.signIn(); await vi.waitFor(() => expect(url).not.toBe(""));
    await h.app.signIn(); expect(h.ports.openBrowser).toHaveBeenCalledOnce();
    await h.app.cancel(); expect(h.pending()).toBeNull();
    h.ports.openBrowser = vi.fn(async (value) => ({ type: "success" as const, url: h.backend.callbackFor(value) }));
    await h.app.signIn(); const credential = h.session()?.credential;
    browser.resolve({ type: "success" as const, url: h.backend.callbackFor(url) }); await first;
    expect(h.app.getSnapshot().signedIn).toBe(true); expect(h.session()?.credential).toBe(credential); expect(h.backend.tokenCalls()).toBe(1);
  });
  it("cancels a request that returns after cancellation before persisting or opening a browser", async () => {
    const h = await host(); const gate = deferred<void>(); const entered = deferred<void>();
    const original = h.client.startLogin;
    h.client.startLogin = async (challenge) => { entered.resolve(); await gate.promise; return original(challenge); };
    const running = h.app.signIn(); await entered.promise; await h.app.cancel(); gate.resolve(); await running;
    expect(h.ports.openBrowser).not.toHaveBeenCalled(); expect(h.pending()).toBeNull(); expect(h.app.getSnapshot().signedIn).toBe(false);
  });
  it.each(["login", "step_up"] as const)("completes an interrupted %s callback using persisted proof and deduplicates the old browser result", async (kind) => {
    const h = await host(); if (kind === "step_up") await h.app.signIn();
    const browser = deferred<{ type: "success"; url: string }>(); let url = "";
    h.ports.openBrowser = vi.fn(async (value) => { url = value; return browser.promise; });
    const interrupted = kind === "login" ? h.app.signIn() : h.app.confirmDemoAction();
    await vi.waitFor(() => expect(url).not.toBe("")); const callback = h.backend.callbackFor(url);
    h.app.dispose(); const restored = h.create(); await restored.initialize(callback);
    expect(restored.getSnapshot()).toMatchObject({ signedIn: true, pending: false, message: kind === "login" ? "signed_in" : "confirmed" });
    browser.resolve({ type: "success" as const, url: callback }); await interrupted;
    expect(h.backend.tokenCalls()).toBe(kind === "login" ? 1 : 2);
    expect(await restored.handleIncoming(callback)).toBe(false);
  });
  it("queues a cold-launch link delivered during storage restoration and ignores unrelated/ambiguous callbacks", async () => {
    const h = await host(); const browser = deferred<{ type: "success"; url: string }>(); let url = "";
    h.ports.openBrowser = async (value) => { url = value; return browser.promise; };
    const interrupted = h.app.signIn(); await vi.waitFor(() => expect(url).not.toBe("")); h.app.dispose();
    const entered = deferred<void>(); const gate = deferred<void>(); let once = true;
    h.storage.beforeRead = async (key) => { if (once && key.endsWith(".session")) { once = false; entered.resolve(); await gate.promise; } };
    const restored = h.create(); const initializing = restored.initialize(); await entered.promise;
    const callback = h.backend.callbackFor(url);
    await restored.handleIncoming(callback); gate.resolve(); await initializing;
    await vi.waitFor(() => expect(restored.getSnapshot().signedIn).toBe(true));
    browser.resolve({ type: "success" as const, url: callback }); await interrupted;
    expect(h.backend.tokenCalls()).toBe(1);
    const nextBrowser = deferred<{ type: "success"; url: string }>(); url = "";
    h.ports.openBrowser = async (value) => { url = value; return nextBrowser.promise; };
    const step = restored.confirmDemoAction(); await vi.waitFor(() => expect(url).not.toBe("")); restored.dispose();
    const last = h.create(); await last.initialize(); const pending = h.pending();
    const legitimate = h.backend.callbackFor(url);
    expect(await last.handleIncoming(legitimate.replace("/callback?", "/other?"))).toBe(false);
    expect(await last.handleIncoming(`${legitimate}&code=duplicate`)).toBe(false);
    expect(h.pending()).toEqual(pending);
    expect(await last.handleIncoming(legitimate)).toBe(true);
    nextBrowser.resolve({ type: "success" as const, url: legitimate }); await step;
    expect(last.getSnapshot().message).toBe("confirmed");
  });
  it("fails closed before browser open if pending secure storage fails", async () => {
    const h = await host(); h.storage.beforeWrite = async () => { throw new Error("private storage detail"); };
    await h.app.signIn(); expect(h.ports.openBrowser).not.toHaveBeenCalled(); expect(h.session()).toBeNull();
    expect(h.app.getSnapshot()).toMatchObject({ signedIn: false, message: "storage_error" }); expect(h.backend.tokenCalls()).toBe(0);
  });
  it("revokes an issued app credential if secure persistence fails", async () => {
    const h = await host(); let issued = ""; const original = h.client.completeLogin;
    h.client.completeLogin = async (input) => { const value = await original(input); if (value.status === "authenticated") issued = value.credential; return value; };
    h.storage.beforeWrite = async (key) => { if (key.endsWith(".session")) throw new Error("storage failed"); };
    await h.app.signIn(); expect(h.app.getSnapshot()).toMatchObject({ signedIn: false, message: "storage_error" });
    await expect(h.client.session(issued)).rejects.toMatchObject({ code: "unauthorized" }); expect(h.session()).toBeNull();
  });
  it("removes/revokes a stale delayed credential write after cancellation without overwriting the newer sign-in", async () => {
    const h = await host(); const entered = deferred<void>(); const gate = deferred<void>(); let once = true; let oldCredential = "";
    h.storage.beforeWrite = async (key, value) => { if (once && key.endsWith(".session")) { once = false; oldCredential = JSON.parse(value).credential; entered.resolve(); await gate.promise; } };
    const old = h.app.signIn(); await entered.promise; const cancellation = h.app.cancel();
    gate.resolve(); await Promise.all([old, cancellation]); await h.app.signIn();
    expect(h.app.getSnapshot().signedIn).toBe(true); expect(h.session()?.credential).not.toBe(oldCredential);
    await expect(h.client.session(oldCredential)).rejects.toMatchObject({ code: "unauthorized" });
  });
  it("preserves an existing app session on failed step-up and never confirms a different subject", async () => {
    const h = await host(); await h.app.signIn(); const saved = h.session();
    h.ports.openBrowser = async (url) => ({ type: "success" as const, url: h.backend.callbackFor(url, { sub: "different-account" }) });
    await h.app.confirmDemoAction(); expect(h.app.getSnapshot()).toMatchObject({ signedIn: true, message: "unavailable" }); expect(h.session()).toEqual(saved);
  });
  it("does not accept stored credentials as proof; preserves them on outage and clears them on backend rejection", async () => {
    const h = await host(); await h.app.signIn(); const saved = h.session()!; const original = h.client.session;
    h.client.session = async () => { throw new ReferenceClientError("unavailable"); };
    const restored = h.create(); await restored.initialize(); expect(restored.getSnapshot().signedIn).toBe(false); expect(h.session()).toEqual(saved);
    h.client.session = original; await h.client.logout(saved.credential); await restored.initialize(); expect(restored.getSnapshot().signedIn).toBe(false); expect(h.session()).toBeNull();
  });
  it("expires interrupted proof and app sessions without refresh or local authentication promotion", async () => {
    const h = await host(); await h.app.signIn(); advance(900);
    const restored = h.create(); await restored.initialize(); expect(restored.getSnapshot().signedIn).toBe(false); expect(h.session()).toBeNull();
  });
  it("clears a cached session when protected step-up explicitly rejects its expired app credential", async () => {
    const h = await host(); await h.app.signIn(); advance(900); await h.app.confirmDemoAction();
    expect(h.app.getSnapshot()).toMatchObject({ signedIn: false, message: "signed_out" }); expect(h.session()).toBeNull();
  });
  it("rejects corrupted/extra private storage fields without exposing raw content in state", async () => {
    const h = await host(); h.storage.values.set(`${h.storagePrefix}.session`, JSON.stringify({ version: 1, credential: createCubidAuthState(), expiresAt: epoch + 900, id_token: "synthetic-private" }));
    await h.app.initialize(); expect(h.app.getSnapshot()).toMatchObject({ signedIn: false, message: "storage_error" }); expect(JSON.stringify(h.app.getSnapshot())).not.toContain("synthetic-private");
  });
  it("does not restore a credential write that was in flight when its controller unmounted", async () => {
    const h = await host(); const entered = deferred<void>(); const gate = deferred<void>();
    h.storage.beforeWrite = async (key) => { if (key.endsWith(".session")) { entered.resolve(); await gate.promise; } };
    const old = h.app.signIn(); await entered.promise; h.app.dispose();
    const restored = h.create(); const initialize = restored.initialize(); gate.resolve(); await Promise.all([old, initialize]);
    expect(restored.getSnapshot().signedIn).toBe(false); expect(h.session()).toBeNull();
  });
  it("clears and revokes a stored credential when logout interrupts initial secure-storage loading", async () => {
    const h = await host(); await h.app.signIn(); const saved = h.session()!;
    const entered = deferred<void>(); const gate = deferred<void>(); let once = true;
    h.storage.beforeRead = async (key) => { if (once && key.endsWith(".session")) { once = false; entered.resolve(); await gate.promise; } };
    const restored = h.create(); const initializing = restored.initialize(); await entered.promise;
    const logout = restored.logout(); gate.resolve(); await Promise.all([initializing, logout]);
    expect(restored.getSnapshot().signedIn).toBe(false); expect(h.session()).toBeNull();
    await expect(h.client.session(saved.credential)).rejects.toMatchObject({ code: "unauthorized" });
  });
  it("never confirms a late step-up response after logout", async () => {
    const h = await host(); await h.app.signIn(); const entered = deferred<void>(); const gate = deferred<void>();
    h.backend.tokenHook(async () => { entered.resolve(); await gate.promise; });
    const step = h.app.confirmDemoAction(); await entered.promise; await h.app.logout(); gate.resolve(); await step;
    expect(h.app.getSnapshot()).toMatchObject({ signedIn: false, message: "signed_out" }); expect(h.session()).toBeNull();
  });
  it("keeps partial-write rollback and delayed revocation ahead of replacement restoration", async () => {
    const h = await host(); const revoking = deferred<void>(); const gate = deferred<void>(); let issued = "";
    h.storage.beforeWrite = async (key, value) => { if (key.endsWith(".session")) { h.storage.values.set(key, value); issued = JSON.parse(value).credential; throw new Error("write then reject"); } };
    const original = h.client.logout;
    h.client.logout = async (credential) => { revoking.resolve(); await gate.promise; return original(credential); };
    const old = h.app.signIn(); await revoking.promise; h.app.dispose();
    const sessionSpy = vi.fn(h.client.session); h.client.session = sessionSpy;
    const restored = h.create(); const loading = restored.initialize();
    expect(restored.getSnapshot().signedIn).toBe(false); expect(sessionSpy).not.toHaveBeenCalled();
    gate.resolve(); await Promise.all([old, loading]);
    expect(restored.getSnapshot().signedIn).toBe(false); expect(h.session()).toBeNull();
    await expect(h.client.session(issued)).rejects.toMatchObject({ code: "unauthorized" });
  });
  it("attempts server revocation even if secure-store deletion fails during logout", async () => {
    const h = await host(); await h.app.signIn(); const saved = h.session()!;
    h.storage.beforeRemove = async (key) => { if (key.endsWith(".session")) throw new Error("private deletion error"); };
    await h.app.logout(); expect(h.app.getSnapshot()).toMatchObject({ signedIn: false, message: "storage_error" });
    await expect(h.client.session(saved.credential)).rejects.toMatchObject({ code: "unauthorized" });
    const restored = h.create(); await restored.initialize(); expect(restored.getSnapshot().signedIn).toBe(false);
  });
});

describe("closed local reference transport", () => {
  it.each(["http://example.com", "https://user:password@example.com", "https://example.com/?secret=x", "https://example.com/path"])("rejects unsafe backend base %s", (base) => {
    expect(() => createHttpReferenceClient(base, fetch)).toThrow(ReferenceClientError);
  });
  it.each(["method", "origin", "query", "extra", "large", "missing_bearer"])("rejects %s requests with no private echo", async (fault) => {
    const h = await host(); const challenge = await createCubidPkceCodeChallenge(createCubidAuthState());
    const url = `${origin}/reference/${fault === "missing_bearer" ? "session" : "startLogin"}${fault === "query" ? "?credential=private" : ""}`;
    const body = fault === "large" ? "x".repeat(8193) : JSON.stringify({ deviceChallenge: challenge, ...(fault === "extra" ? { private: "private" } : {}) });
    const response = await h.handler(new Request(url, { method: fault === "method" ? "PUT" : "POST", headers: { "content-type": "application/json", ...(fault === "origin" ? { origin: "https://other.invalid" } : {}) }, body }));
    expect(response.ok).toBe(false); const payload = await response.json(); expect(Object.keys(payload)).toEqual(["error"]); expect(JSON.stringify(payload)).not.toContain("private");
  });
  it("refuses private fields in backend replies rather than forwarding tokens", async () => {
    const h = await host(); const original = h.backend.backend.session;
    h.backend.backend.session = async (credential) => ({ ...await original(credential), id_token: "synthetic-private" });
    await h.app.signIn(); await expect(h.client.session(h.session()!.credential)).rejects.toMatchObject({ code: "invalid_request" });
  });
  it("fails closed for a fetch adapter without a readable response body", async () => {
    const client = createHttpReferenceClient(origin, async () => ({ ok: true, headers: new Headers({ "content-type": "application/json" }), body: null }));
    await expect(client.session(createCubidAuthState())).rejects.toMatchObject({ code: "invalid_request" });
  });
  it("cancels an oversized streaming response before JSON parsing", async () => {
    let cancelled = false;
    const body = new ReadableStream<Uint8Array<ArrayBuffer>>({ start(controller) { controller.enqueue(new Uint8Array(8193)); }, cancel() { cancelled = true; } });
    const client = createHttpReferenceClient(origin, async () => ({ ok: true, headers: new Headers({ "content-type": "application/json" }), body }));
    await expect(client.session(createCubidAuthState())).rejects.toMatchObject({ code: "invalid_request" }); expect(cancelled).toBe(true);
  });
});
