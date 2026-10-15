import { useLayoutEffect } from "react";
import { act, render, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { CUBID_AUTH_SESSION_STORAGE_KEY, type CubidAuthCrypto } from "@cubid/auth";
import {
  CUBID_AUTH_TRANSACTION_STORAGE_KEY, CubidAuthProvider, useCubidAuth,
  type CubidAuthContextValue, type CubidAuthProviderStorage,
} from "./index";

const issuer = "https://id.cubid.me";
const clientId = "synthetic-native-hook";
const redirectUri = "cubidexample://auth/callback";
const postLogoutRedirectUri = "cubidexample://auth/logged-out";
const discovery = { issuer, authorization_endpoint: `${issuer}/authorize`, token_endpoint: `${issuer}/token`, jwks_uri: `${issuer}/jwks`, end_session_endpoint: `${issuer}/logout` };
let signingKey: CryptoKey;
let jwks: { keys: JsonWebKey[] };
beforeAll(async () => {
  const key = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
  signingKey = key.privateKey;
  jwks = { keys: [{ ...await crypto.subtle.exportKey("jwk", key.publicKey), kid: "native-hook-key", alg: "RS256", use: "sig" } as JsonWebKey] };
});
class NativeStore implements CubidAuthProviderStorage {
  readonly values = new Map<string, string>();
  getItem = vi.fn(async (key: string) => this.values.get(key) ?? null);
  setItem = vi.fn(async (key: string, value: string) => { this.values.set(key, value); });
  removeItem = vi.fn(async (key: string) => { this.values.delete(key); });
}
function Capture({ capture }: { capture: (auth: CubidAuthContextValue) => void }) {
  const auth = useCubidAuth();
  useLayoutEffect(() => capture(auth), [auth, capture]);
  return null;
}
function fixture() {
  const storage = new NativeStore();
  const cryptoAdapter: CubidAuthCrypto = {
    getRandomValues: vi.fn(crypto.getRandomValues.bind(crypto)),
    subtle: {
      digest: vi.fn(crypto.subtle.digest.bind(crypto.subtle)),
      importKey: crypto.subtle.importKey.bind(crypto.subtle),
      verify: vi.fn(crypto.subtle.verify.bind(crypto.subtle)),
    },
  };
  const fetch = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    if (String(url) === discovery.jwks_uri) return new Response(JSON.stringify(jwks));
    if (String(url) !== discovery.token_endpoint) throw new Error("Unexpected synthetic endpoint");
    const transaction = JSON.parse(storage.values.get(CUBID_AUTH_TRANSACTION_STORAGE_KEY) ?? "null");
    const body = new URLSearchParams(String(init?.body));
    expect(body.get("redirect_uri")).toBe(redirectUri);
    expect(body.get("code_verifier")).toBe(transaction.codeVerifier);
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: "RS256", kid: "native-hook-key" })).toString("base64url");
    const claims = Buffer.from(JSON.stringify({ iss: issuer, aud: clientId, sub: "synthetic-pairwise-sub", iat: now, exp: now + 300, nonce: transaction.nonce, acr: "urn:cubid:acr:passkey", amr: ["passkey"] })).toString("base64url");
    const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", signingKey, new TextEncoder().encode(`${header}.${claims}`));
    return new Response(JSON.stringify({ access_token: "synthetic-access", token_type: "Bearer", expires_in: 300, scope: "openid", id_token: `${header}.${claims}.${Buffer.from(signature).toString("base64url")}` }));
  });
  const mount = () => {
    let auth!: CubidAuthContextValue;
    const capture = (value: CubidAuthContextValue) => { auth = value; };
    const view = render(<CubidAuthProvider clientId={clientId} issuer={issuer} redirectUri={redirectUri}
      postLogoutRedirectUri={postLogoutRedirectUri} discoveryDocument={discovery} storage={storage}
      crypto={cryptoAdapter} fetch={fetch} autoUserInfo={false} scope={["openid"]} requirePasskey>
      <Capture capture={capture} />
    </CubidAuthProvider>);
    return { auth: () => auth, view };
  };
  const callbackFor = (url: string) => {
    const request = new URL(url);
    expect(request.searchParams.get("redirect_uri")).toBe(redirectUri);
    expect(request.searchParams.get("code_challenge_method")).toBe("S256");
    expect(request.searchParams.get("nonce")).toBeTruthy();
    expect(request.searchParams.get("acr_values")).toBe("urn:cubid:acr:passkey");
    return `${redirectUri}?code=synthetic-code&state=${request.searchParams.get("state")}&iss=${encodeURIComponent(issuer)}`;
  };
  return { storage, cryptoAdapter, fetch, mount, callbackFor };
}

describe("native auth-react host redirect contract", () => {
  it.each(["manual", "navigate"])("completes signed custom-scheme sign-in and host-owned logout using %s handoff", async (mode) => {
    const host = fixture();
    const app = host.mount();
    const location = window.location.href;
    await waitFor(() => expect(app.auth().status).toBe("signed_out"));
    const navigate = vi.fn((url: string) => {
      if (new URL(url).pathname === "/authorize") expect(host.storage.values.has(CUBID_AUTH_TRANSACTION_STORAGE_KEY)).toBe(true);
    });
    let authorizationUrl!: string;
    await act(async () => { authorizationUrl = await app.auth().signIn({ navigate, performRedirect: mode !== "manual" }); });
    expect(navigate).toHaveBeenCalledTimes(mode === "manual" ? 0 : 1);
    if (mode === "navigate") expect(navigate).toHaveBeenLastCalledWith(authorizationUrl);
    const callbackUrl = host.callbackFor(authorizationUrl); // host system browser result, not window.location
    await act(async () => { await app.auth().handleCallback({ callbackUrl }); });
    await waitFor(() => expect(app.auth().isAuthenticated).toBe(true));
    expect(app.auth().session?.subject).toBe("synthetic-pairwise-sub");
    expect(app.auth().session?.idTokenClaims?.email).toBeUndefined();
    expect(app.auth().assurance.hasPasskeyAssurance).toBe(true);
    expect(host.cryptoAdapter.subtle.verify).toHaveBeenCalledOnce();
    expect(host.storage.values.has(CUBID_AUTH_TRANSACTION_STORAGE_KEY)).toBe(false);
    expect(host.storage.values.has(CUBID_AUTH_SESSION_STORAGE_KEY)).toBe(true);
    let logoutUrl!: string | null;
    await act(async () => { logoutUrl = await app.auth().logout({ navigate, performRedirect: mode !== "manual" }); });
    expect(new URL(logoutUrl!).searchParams.get("post_logout_redirect_uri")).toBe(postLogoutRedirectUri);
    expect(navigate).toHaveBeenCalledTimes(mode === "manual" ? 0 : 2);
    if (mode === "navigate") expect(navigate).toHaveBeenLastCalledWith(logoutUrl);
    expect(app.auth().isAuthenticated).toBe(false);
    expect(host.storage.values.size).toBe(0);
    expect(window.location.href).toBe(location);
    app.view.unmount();
  });

  it("completes an explicit cold-launch callback using the persisted nonce/verifier, then restores only the verified session", async () => {
    const host = fixture();
    const first = host.mount();
    await waitFor(() => expect(first.auth().status).toBe("signed_out"));
    let authorizationUrl!: string;
    await act(async () => { authorizationUrl = await first.auth().signIn({ performRedirect: false }); });
    const pending = host.storage.values.get(CUBID_AUTH_TRANSACTION_STORAGE_KEY);
    first.view.unmount();
    const restarted = host.mount();
    await waitFor(() => expect(restarted.auth().status).toBe("signed_out"));
    expect(host.storage.values.get(CUBID_AUTH_TRANSACTION_STORAGE_KEY)).toBe(pending);
    await act(async () => { await restarted.auth().handleCallback({ callbackUrl: host.callbackFor(authorizationUrl) }); });
    expect(restarted.auth().session?.subject).toBe("synthetic-pairwise-sub");
    expect(host.cryptoAdapter.subtle.verify).toHaveBeenCalledOnce();
    expect(host.fetch.mock.calls.filter(([url]) => String(url) === discovery.token_endpoint)).toHaveLength(1);
    restarted.view.unmount();
    const restored = host.mount();
    await waitFor(() => expect(restored.auth().isAuthenticated).toBe(true));
    expect(restored.auth().session?.subject).toBe("synthetic-pairwise-sub");
    expect(host.cryptoAdapter.subtle.verify).toHaveBeenCalledOnce(); // no second exchange on app-session restoration
    expect(host.storage.values.has(CUBID_AUTH_TRANSACTION_STORAGE_KEY)).toBe(false);
    restored.view.unmount();
  });
});
