import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  completeCubidReauthentication,
  createCubidReauthenticationRequest,
  reauthenticateCubidSession,
  type CubidAuthCrypto,
  type CubidIdTokenClaims,
  type CubidReauthenticationTransaction,
} from "./index";

const epoch = 1_800_000_000;
const session = Object.freeze({ issuer: "https://id.cubid.me", clientId: "synthetic-native-rp", subject: "synthetic-pairwise-sub" });
const redirectUri = "cubidexample://auth/callback?tenant=registered";
const discovery = {
  issuer: session.issuer, authorization_endpoint: `${session.issuer}/authorize`,
  token_endpoint: `${session.issuer}/token`, jwks_uri: `${session.issuer}/jwks`,
  token_endpoint_auth_methods_supported: ["none"],
};
const injectedCrypto: CubidAuthCrypto = {
  getRandomValues: crypto.getRandomValues.bind(crypto),
  subtle: {
    digest: crypto.subtle.digest.bind(crypto.subtle),
    importKey: crypto.subtle.importKey.bind(crypto.subtle),
    verify: crypto.subtle.verify.bind(crypto.subtle),
  },
};
let key: CryptoKey;
let jwks: { keys: JsonWebKey[] };
beforeAll(async () => {
  const pair = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
  key = pair.privateKey;
  jwks = { keys: [{ ...await crypto.subtle.exportKey("jwk", pair.publicKey), kid: "synthetic-key", alg: "RS256", use: "sig" } as JsonWebKey] };
});
async function signed(payload: Record<string, unknown>) {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", kid: "synthetic-key" })).toString("base64url");
  const claims = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${header}.${claims}`));
  return `${header}.${claims}.${Buffer.from(signature).toString("base64url")}`;
}
async function setup(options: { patch?: Record<string, unknown>; maxAge?: number; requirePasskey?: boolean; now?: number; noIdToken?: boolean; badSignature?: boolean } = {}) {
  const request = await createCubidReauthenticationRequest({ session, discoveryDocument: discovery, redirectUri, nowSeconds: epoch, crypto: injectedCrypto, maxAge: options.maxAge, requirePasskey: options.requirePasskey });
  const payload: CubidIdTokenClaims = {
    iss: session.issuer, aud: session.clientId, sub: session.subject,
    exp: epoch + 600, iat: epoch + 1, nonce: request.transaction.nonce,
    auth_time: epoch + 1, acr: "urn:cubid:acr:passkey", amr: ["passkey"], ...options.patch,
  };
  let idToken = await signed(payload);
  if (options.badSignature) {
    const parts = idToken.split(".");
    const bytes = Buffer.from(parts[2]!, "base64url");
    bytes[0] = bytes[0]! ^ 1;
    idToken = `${parts[0]}.${parts[1]}.${bytes.toString("base64url")}`;
  }
  const fetch = vi.fn(async (url: string | URL | Request) => {
    if (String(url) === discovery.jwks_uri) return new Response(JSON.stringify(jwks));
    if (String(url) !== discovery.token_endpoint) throw new Error("unexpected synthetic endpoint");
    return new Response(JSON.stringify({ access_token: "synthetic-unused-access-token", token_type: "Bearer", expires_in: 60, ...(options.noIdToken ? {} : { id_token: idToken }) }));
  });
  const transactions = new Map([[request.transaction.state, request.transaction]]);
  const consumeTransaction = vi.fn((state: string) => {
    const transaction = transactions.get(state) ?? null;
    transactions.delete(state);
    return transaction;
  });
  const callbackUrl = `${redirectUri}&code=synthetic-code&state=${request.transaction.state}&iss=${encodeURIComponent(session.issuer)}`;
  const input = { callbackUrl, session, redirectUri, discoveryDocument: discovery, consumeTransaction, fetch, crypto: injectedCrypto, nowSeconds: options.now ?? epoch + 2 };
  return { request, fetch, input, transactions, payload };
}

describe("Cubid step-up reauthentication (#50)", () => {
  it("prepares fresh S256/state/nonce, forced login and minimal scope without changing the app session", async () => {
    const before = { ...session };
    const first = await createCubidReauthenticationRequest({ session, discoveryDocument: discovery, redirectUri, nowSeconds: epoch, crypto: injectedCrypto });
    const second = await createCubidReauthenticationRequest({ session, discoveryDocument: discovery, redirectUri, nowSeconds: epoch, crypto: injectedCrypto });
    const url = new URL(first.authorizationUrl);
    expect(url.searchParams.get("prompt")).toBe("login");
    expect(url.searchParams.get("max_age")).toBe("60");
    expect(url.searchParams.get("acr_values")).toBe("urn:cubid:acr:passkey");
    expect(url.searchParams.get("scope")).toBe("openid");
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
    expect(url.searchParams.get("state")).toBe(first.transaction.state);
    expect(url.searchParams.get("nonce")).toBe(first.transaction.nonce);
    expect(first.transaction.state).not.toBe(second.transaction.state);
    expect(first.transaction.nonce).not.toBe(second.transaction.nonce);
    expect(first.transaction.codeVerifier).not.toBe(second.transaction.codeVerifier);
    expect(first.transaction.expiresAtSeconds).toBe(epoch + 300);
    expect(first.authorizationUrl).not.toContain(first.transaction.codeVerifier);
    expect(first.authorizationUrl).not.toContain(session.subject);
    expect(session).toEqual(before);
  });

  it("returns a verified same-subject fresh passkey result without tokens or optional claims", async () => {
    const { input, fetch } = await setup();
    const result = await completeCubidReauthentication(input);
    expect(result).toEqual({ status: "authenticated", subject: session.subject, authTime: epoch + 1, assurance: { acr: "urn:cubid:acr:passkey", amr: ["passkey"], hasPasskeyAssurance: true } });
    expect(JSON.stringify(result)).not.toMatch(/access_token|id_token|refresh_token|email/u);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(input.consumeTransaction).toHaveBeenCalledOnce();
  });

  it.each([undefined, null, "1800000001", -1, 1.5, epoch + 8])("rejects missing/malformed/future signed auth_time %j", async (auth_time) => {
    const { input } = await setup({ patch: { auth_time } });
    await expect(completeCubidReauthentication(input)).rejects.toMatchObject({ code: "invalid_auth_time" });
  });

  it.each([
    { authTime: epoch - 6, now: epoch + 2, maxAge: 60 },
    { authTime: epoch + 1, now: epoch + 80, maxAge: 60 },
    { authTime: epoch + 1, now: epoch + 8, maxAge: 0 },
  ])("rejects stale ceremony time at the request and completion boundaries", async ({ authTime, now, maxAge }) => {
    const { input } = await setup({ patch: { auth_time: authTime }, now, maxAge });
    await expect(completeCubidReauthentication(input)).rejects.toMatchObject({ code: "stale_auth_time" });
  });

  it("supports strict zero age at the boundary with explicit zero clock tolerance", async () => {
    const { input, request } = await setup({ maxAge: 0, now: epoch + 1 });
    expect(new URL(request.authorizationUrl).searchParams.get("max_age")).toBe("0");
    await expect(completeCubidReauthentication({ ...input, clockToleranceSeconds: 0 })).resolves.toMatchObject({ status: "authenticated" });
  });

  it.each([
    [{ sub: "synthetic-other-sub" }, "reauthentication_subject_mismatch"],
    [{ nonce: "synthetic-wrong-nonce" }, "invalid_nonce"],
    [{ nonce: undefined }, "missing_nonce"],
    [{ iss: "https://other.example" }, "invalid_issuer"],
    [{ aud: "other-client" }, "invalid_audience"],
    [{ aud: [session.clientId, "other-client"] }, "invalid_audience"],
    [{ azp: "other-client" }, "invalid_authorized_party"],
    [{ iat: undefined }, "invalid_issued_at"],
    [{ iat: epoch + 8 }, "invalid_issued_at"],
    [{ iat: epoch - 6 }, "invalid_issued_at"],
    [{ auth_time: epoch + 7 }, "invalid_auth_time"],
    [{ exp: epoch }, "expired_id_token"],
    [{ acr: "urn:cubid:acr:email", amr: ["email"] }, "insufficient_assurance"],
  ])("rejects invalid signed token binding/assurance", async (patch, code) => {
    const { input } = await setup({ patch: patch as Record<string, unknown> });
    await expect(completeCubidReauthentication(input)).rejects.toMatchObject({ code });
  });

  it("verifies the signature instead of trusting decoded auth_time or assurance", async () => {
    const { input } = await setup({ badSignature: true });
    await expect(completeCubidReauthentication(input)).rejects.toMatchObject({ code: "invalid_id_token_signature" });
  });

  it("requires an ID token even if token exchange returns an access token", async () => {
    const { input } = await setup({ noIdToken: true });
    await expect(completeCubidReauthentication(input)).rejects.toMatchObject({ code: "missing_id_token" });
  });

  it("allows an explicitly requested non-passkey ceremony without claiming passkey assurance", async () => {
    const { input, request } = await setup({ requirePasskey: false, patch: { acr: "urn:cubid:acr:email", amr: ["email"] } });
    expect(new URL(request.authorizationUrl).searchParams.has("acr_values")).toBe(false);
    await expect(completeCubidReauthentication(input)).resolves.toMatchObject({ status: "authenticated", assurance: { hasPasskeyAssurance: false } });
  });

  it.each(["access_denied", "login_required", "interaction_required", "consent_required"])("handles bound %s without exchanging tokens or altering the existing session", async (reason) => {
    const { input, request, fetch } = await setup();
    const before = { ...session };
    await expect(completeCubidReauthentication({ ...input, callbackUrl: `${redirectUri}&error=${reason}&state=${request.transaction.state}` })).resolves.toEqual({ status: "denied", reason });
    expect(fetch).not.toHaveBeenCalled();
    expect(session).toEqual(before);
  });

  it("fails closed on other issuer protocol errors", async () => {
    const { input, request, fetch } = await setup();
    await expect(completeCubidReauthentication({ ...input, callbackUrl: `${redirectUri}&error=invalid_request&state=${request.transaction.state}` })).rejects.toMatchObject({ code: "reauthentication_failed" });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("atomically consumes one transaction and rejects replay before a second exchange", async () => {
    const { input, fetch } = await setup();
    await expect(completeCubidReauthentication(input)).resolves.toMatchObject({ status: "authenticated" });
    const count = fetch.mock.calls.length;
    await expect(completeCubidReauthentication(input)).rejects.toMatchObject({ code: "missing_transaction" });
    expect(fetch).toHaveBeenCalledTimes(count);
  });

  it.each(["subject", "clientId", "issuer", "redirectUri", "state", "nonce", "codeVerifier", "maxAge", "expiresAtSeconds", "requirePasskey"])("rejects an invalid stored %s without token exchange", async (field) => {
    const { input, request, fetch, transactions } = await setup();
    const patch = field === "maxAge" ? -1 : field === "expiresAtSeconds" ? epoch + 301
      : field === "requirePasskey" ? "yes" : field === "nonce" || field === "codeVerifier" ? "" : "wrong";
    transactions.set(request.transaction.state, { ...request.transaction, [field]: patch } as CubidReauthenticationTransaction);
    await expect(completeCubidReauthentication(input)).rejects.toThrow();
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([epoch - 6, epoch + 300])("rejects a transaction outside its lifetime before exchange", async (nowSeconds) => {
    const { input, fetch } = await setup();
    await expect(completeCubidReauthentication({ ...input, nowSeconds })).rejects.toMatchObject({ code: "expired_transaction" });
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([
    { query: "error=login_required", code: "state_mismatch" },
    { query: "code=x&state=unknown", code: "missing_transaction" },
    { query: "code=x&state=x&state=y", code: "invalid_callback" },
    { query: "code=x&state=x&error=access_denied", code: "invalid_callback" },
    { query: "error=access_denied&state=x&iss=https://other.example", code: "invalid_issuer" },
  ])("binds malformed/success/error callbacks before exchange", async ({ query, code }) => {
    const { input, fetch } = await setup();
    await expect(completeCubidReauthentication({ ...input, callbackUrl: `${redirectUri}&${query}` })).rejects.toMatchObject({ code });
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each(["cubidexample://wrong/callback?tenant=registered", "cubidexample://auth/other?tenant=registered", "other://auth/callback?tenant=registered", "cubidexample://auth/callback?tenant=wrong", `${redirectUri}#fragment`])("rejects an unregistered destination before consuming transaction", async (destination) => {
    const { input, request, fetch } = await setup();
    await expect(completeCubidReauthentication({ ...input, callbackUrl: `${destination}&code=x&state=${request.transaction.state}` })).rejects.toMatchObject({ code: "invalid_callback_destination" });
    expect(input.consumeTransaction).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([-1, NaN, Infinity, 1.5])("rejects unsafe options %j before a browser handoff", async (maxAge) => {
    const openAuthorizationSession = vi.fn();
    await expect(reauthenticateCubidSession({ session, discoveryDocument: discovery, redirectUri, maxAge, openAuthorizationSession })).rejects.toMatchObject({ code: "invalid_reauthentication_options" });
    expect(openAuthorizationSession).not.toHaveBeenCalled();
  });

  it.each([-1, NaN, Infinity, 61])("bounds clock tolerance %j before a browser handoff", async (clockToleranceSeconds) => {
    const openAuthorizationSession = vi.fn();
    await expect(reauthenticateCubidSession({ session, discoveryDocument: discovery, redirectUri, clockToleranceSeconds, openAuthorizationSession })).rejects.toMatchObject({ code: "invalid_reauthentication_options" });
    expect(openAuthorizationSession).not.toHaveBeenCalled();
  });

  it("rejects concurrent replay without invalidating the first valid completion", async () => {
    const { input, fetch } = await setup();
    const results = await Promise.allSettled([completeCubidReauthentication(input), completeCubidReauthentication(input)]);
    expect(results.filter((value) => value.status === "fulfilled")).toHaveLength(1);
    expect(results.find((value) => value.status === "rejected")).toMatchObject({ reason: { code: "missing_transaction" } });
    expect(fetch.mock.calls.filter(([url]) => String(url) === discovery.token_endpoint)).toHaveLength(1);
  });

  it("rejects a changed current app subject between start and completion before exchange", async () => {
    const { input, fetch } = await setup();
    await expect(completeCubidReauthentication({ ...input, session: { ...session, subject: "new-app-user" } })).rejects.toMatchObject({ code: "invalid_transaction" });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("rechecks transaction expiry after asynchronous signature-key lookup", async () => {
    const { input, fetch } = await setup();
    const original = fetch.getMockImplementation()!;
    vi.useFakeTimers();
    vi.setSystemTime(new Date((epoch + 2) * 1000));
    fetch.mockImplementation(async (url) => {
      if (String(url) === discovery.jwks_uri) vi.setSystemTime(new Date((epoch + 300) * 1000));
      return original(url);
    });
    try {
      await expect(completeCubidReauthentication({ ...input, nowSeconds: undefined })).rejects.toMatchObject({ code: "expired_transaction" });
    } finally { vi.useRealTimers(); }
  });

  it("rechecks ID-token expiry after asynchronous signature-key lookup", async () => {
    const { input, fetch } = await setup({ patch: { exp: epoch + 3 } });
    const original = fetch.getMockImplementation()!;
    vi.useFakeTimers();
    vi.setSystemTime(new Date((epoch + 2) * 1000));
    fetch.mockImplementation(async (url) => {
      if (String(url) === discovery.jwks_uri) vi.setSystemTime(new Date((epoch + 3) * 1000));
      return original(url);
    });
    try {
      await expect(completeCubidReauthentication({ ...input, nowSeconds: undefined })).rejects.toMatchObject({ code: "expired_id_token" });
    } finally { vi.useRealTimers(); }
  });

  it("normalizes host cancellation explicitly and keeps the existing session intact", async () => {
    const before = { ...session };
    const result = await reauthenticateCubidSession({ session, discoveryDocument: discovery, redirectUri, crypto: injectedCrypto, openAuthorizationSession: async () => null });
    expect(result).toEqual({ status: "cancelled" });
    expect(session).toEqual(before);
  });

  it("runs a host handoff end to end with no automatic session replacement or UserInfo call", async () => {
    let state = "";
    let nonce = "";
    const fetch = vi.fn(async (url: string | URL | Request) => {
      if (String(url) === discovery.jwks_uri) return new Response(JSON.stringify(jwks));
      expect(String(url)).toBe(discovery.token_endpoint);
      return new Response(JSON.stringify({ access_token: "synthetic-unused", token_type: "Bearer", id_token: await signed({ iss: session.issuer, aud: session.clientId, sub: session.subject, exp: epoch + 60, iat: epoch, nonce, auth_time: epoch, acr: "urn:cubid:acr:passkey" }) }));
    });
    const result = await reauthenticateCubidSession({ session, discoveryDocument: discovery, redirectUri, crypto: injectedCrypto, nowSeconds: epoch, fetch, openAuthorizationSession: async (url) => {
      const params = new URL(url).searchParams;
      state = params.get("state")!; nonce = params.get("nonce")!;
      return `${redirectUri}&code=synthetic-code&state=${state}`;
    } });
    expect(result).toMatchObject({ status: "authenticated", subject: session.subject });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(session.subject).toBe("synthetic-pairwise-sub");
  });
});
