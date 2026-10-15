import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryReferenceStore } from "../../../examples/expo-siwc/memory-store";
import { ReferenceError } from "../../../examples/expo-siwc/model";
import { createCubidAuthState, createCubidPkceCodeChallenge } from "../../../examples/expo-siwc/sdk";
import { advance, clientId, epoch, fixture, issuer, prepareSigningKey, redirectUri } from "./fixtures/expo-reference";
beforeAll(prepareSigningKey);
beforeEach(() => { vi.spyOn(Date, "now").mockReturnValue(epoch * 1000); });
afterEach(() => { vi.restoreAllMocks(); });

describe("source-only Expo reference backend", () => {
  it("uses minimal public PKCE and returns only an opaque app credential; shared store supports app restart", async () => {
    const f = await fixture();
    const { request, result } = await f.login();
    const params = new URL(request.authorizationUrl).searchParams;
    expect(params.get("scope")).toBe("openid");
    expect(params.get("code_challenge_method")).toBe("S256");
    expect(params.get("acr_values")).toBe("urn:cubid:acr:passkey");
    expect(params.get("redirect_uri")).toBe(redirectUri);
    expect(params.has("cubid_provider")).toBe(false);
    expect(Object.keys(result).sort()).toEqual(["credential", "expiresAt", "status"]);
    expect(result.credential).toMatch(/^[A-Za-z0-9_-]{43}$/u);
    expect(JSON.stringify(result)).not.toMatch(/synthetic-private|synthetic-pairwise|id_token|access_token|refresh_token/u);
    const restoredBackend = await f.create();
    expect(await restoredBackend.session(result.credential)).toEqual({ status: "authenticated", expiresAt: epoch + 900 });
    const saved = await f.store.getSession(await createCubidPkceCodeChallenge(result.credential), epoch);
    expect(saved?.subject).toBe("synthetic-pairwise-sub");
    expect(JSON.stringify(saved)).not.toContain(result.credential);
    expect(JSON.stringify(saved)).not.toContain("synthetic-private");
  });
  it("does not consume another device's transaction, even with the callback and transaction id", async () => {
    const f = await fixture();
    const request = await f.backend.startLogin(f.deviceChallenge);
    const input = { transactionId: request.transactionId, callbackUrl: f.callbackFor(request.authorizationUrl), deviceVerifier: createCubidAuthState() };
    await expect(f.backend.completeLogin(input)).rejects.toMatchObject({ code: "invalid_transaction" });
    expect(f.tokenCalls()).toBe(0);
    expect((await f.backend.completeLogin({ ...input, deviceVerifier: f.deviceVerifier })).status).toBe("authenticated");
  });
  it("isolates configured clients sharing a store before transaction consumption and session use/revocation", async () => {
    const f = await fixture(); const other = await f.create({ clientId: "another-client" });
    const request = await f.backend.startLogin(f.deviceChallenge);
    const input = { transactionId: request.transactionId, callbackUrl: f.callbackFor(request.authorizationUrl), deviceVerifier: f.deviceVerifier };
    await expect(other.completeLogin(input)).rejects.toMatchObject({ code: "invalid_transaction" });
    expect(f.tokenCalls()).toBe(0);
    const result = await f.backend.completeLogin(input);
    if (result.status !== "authenticated") throw new Error("Expected login");
    await expect(other.session(result.credential)).rejects.toMatchObject({ code: "unauthorized" });
    await expect(other.logout(result.credential)).rejects.toMatchObject({ code: "unauthorized" });
    expect((await f.backend.session(result.credential)).status).toBe("authenticated");
  });
  it("rejects a tampered signature using real public SDK verification", async () => {
    const f = await fixture();
    f.alterToken((value) => {
      const [header, payload, signature] = value.split(".");
      return `${header}.${payload}.${signature![0] === "A" ? "B" : "A"}${signature!.slice(1)}`;
    });
    await expect(f.login()).rejects.toMatchObject({ code: "authentication_failed" });
  });
  it.each(["wrong_destination", "wrong_state", "wrong_issuer", "duplicate_code"])("rejects %s before consuming/exchanging the original transaction", async (fault) => {
    const f = await fixture();
    const request = await f.backend.startLogin(f.deviceChallenge);
    const callbackUrl = f.callbackFor(request.authorizationUrl);
    const malformed = new URL(callbackUrl);
    if (fault === "wrong_destination") malformed.pathname = "/other";
    if (fault === "wrong_state") malformed.searchParams.set("state", createCubidAuthState());
    if (fault === "wrong_issuer") malformed.searchParams.set("iss", "https://other.invalid");
    if (fault === "duplicate_code") malformed.searchParams.append("code", "second");
    const input = { transactionId: request.transactionId, deviceVerifier: f.deviceVerifier, callbackUrl };
    await expect(f.backend.completeLogin({ ...input, callbackUrl: malformed.href })).rejects.toBeInstanceOf(ReferenceError);
    expect(f.tokenCalls()).toBe(0);
    expect((await f.backend.completeLogin(input)).status).toBe("authenticated");
  });
  it("atomically permits only one concurrent completion/exchange", async () => {
    const f = await fixture();
    const request = await f.backend.startLogin(f.deviceChallenge);
    const input = { transactionId: request.transactionId, deviceVerifier: f.deviceVerifier, callbackUrl: f.callbackFor(request.authorizationUrl) };
    const outcomes = await Promise.allSettled([f.backend.completeLogin(input), f.backend.completeLogin(input)]);
    expect(outcomes.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    expect(f.tokenCalls()).toBe(1);
  });
  it.each([
    { nonce: "wrong" }, { nonce: null }, { iss: "https://other.invalid" }, { aud: "another-client" },
    { aud: [clientId, "another-client"] }, { azp: "another-client" }, { sub: "" }, { exp: epoch },
    { iat: epoch - 60 }, { iat: epoch + 60 }, { acr: "ordinary", amr: ["password"] },
  ])("rejects invalid signed login claims %j without issuing a session or leaking raw errors", async (claims) => {
    const f = await fixture();
    try { await f.login(claims); throw new Error("Expected rejection"); } catch (error) {
      expect(error).toBeInstanceOf(ReferenceError);
      expect(Object.keys(error as object)).toEqual(["code", "name"]);
      expect((error as Error).message).toBe("authentication_failed");
      expect("raw" in (error as object)).toBe(false);
    }
  });
  it("expires before exchange and checks transaction lifetime again after network work", async () => {
    const f = await fixture();
    const request = await f.backend.startLogin(f.deviceChallenge);
    const input = { transactionId: request.transactionId, deviceVerifier: f.deviceVerifier, callbackUrl: f.callbackFor(request.authorizationUrl) };
    advance(300);
    await expect(f.backend.completeLogin(input)).rejects.toMatchObject({ code: "invalid_transaction" });
    expect(f.tokenCalls()).toBe(0);
    advance(0);
    f.tokenHook(async () => { advance(300); });
    await expect(f.login()).rejects.toMatchObject({ code: "authentication_failed" });
  });
  it("rejects ID-token expiry during asynchronous signature/key retrieval", async () => {
    const f = await fixture();
    f.jwksHook(async () => { advance(10); });
    await expect(f.login({ exp: epoch + 5 })).rejects.toMatchObject({ code: "authentication_failed" });
  });
  it("turns issuer denial into a closed response and consumes it once", async () => {
    const f = await fixture();
    const request = await f.backend.startLogin(f.deviceChallenge);
    const input = { transactionId: request.transactionId, deviceVerifier: f.deviceVerifier, callbackUrl: `${redirectUri}?error=access_denied&error_description=private&state=${request.transactionId}` };
    expect(await f.backend.completeLogin(input)).toEqual({ status: "denied" });
    await expect(f.backend.completeLogin(input)).rejects.toMatchObject({ code: "invalid_transaction" });
    expect(f.tokenCalls()).toBe(0);
  });
  it("cancels only with the originating device proof and restores/revokes only the app session", async () => {
    const f = await fixture();
    const request = await f.backend.startLogin(f.deviceChallenge);
    await f.backend.cancelLogin(request.transactionId, createCubidAuthState());
    await f.backend.cancelLogin(request.transactionId, f.deviceVerifier);
    await expect(f.backend.completeLogin({ transactionId: request.transactionId, deviceVerifier: f.deviceVerifier, callbackUrl: f.callbackFor(request.authorizationUrl) })).rejects.toMatchObject({ code: "invalid_transaction" });
    const { credential } = await f.login();
    await f.backend.logout(credential);
    await expect(f.backend.session(credential)).rejects.toMatchObject({ code: "unauthorized" });
    const second = await f.login();
    advance(900);
    await expect(f.backend.session(second.credential)).rejects.toMatchObject({ code: "unauthorized" });
  });
  it("confirms one harmless action through fresh same-subject passkey step-up without replacing the app session", async () => {
    const f = await fixture();
    const { credential, result } = await f.login();
    const request = await f.backend.startDemoAction(credential, f.deviceChallenge);
    const params = new URL(request.authorizationUrl).searchParams;
    expect(params.get("prompt")).toBe("login"); expect(params.get("max_age")).toBe("60");
    const input = { transactionId: request.transactionId, deviceVerifier: f.deviceVerifier, callbackUrl: f.callbackFor(request.authorizationUrl) };
    expect(await f.backend.completeDemoAction(credential, input)).toEqual({ status: "confirmed", action: "no_op" });
    await expect(f.backend.completeDemoAction(credential, input)).rejects.toMatchObject({ code: "authentication_failed" });
    expect(await f.backend.session(credential)).toEqual({ status: "authenticated", expiresAt: result.expiresAt });
  });
  it.each([{ sub: "different-account" }, { auth_time: epoch - 60 }, { acr: "ordinary", amr: ["password"] }])("rejects step-up identity/assurance/freshness mismatch %j", async (claims) => {
    const f = await fixture(); const { credential } = await f.login();
    const request = await f.backend.startDemoAction(credential, f.deviceChallenge);
    await expect(f.backend.completeDemoAction(credential, { transactionId: request.transactionId, deviceVerifier: f.deviceVerifier, callbackUrl: f.callbackFor(request.authorizationUrl, claims) })).rejects.toMatchObject({ code: "authentication_failed" });
    expect((await f.backend.session(credential)).status).toBe("authenticated");
  });
  it("binds step-up to both the device and existing app session; dismissal consumes only the owner transaction", async () => {
    const f = await fixture(); const first = await f.login(); const other = await f.login();
    const request = await f.backend.startDemoAction(first.credential, f.deviceChallenge);
    const input = { transactionId: request.transactionId, deviceVerifier: f.deviceVerifier, callbackUrl: f.callbackFor(request.authorizationUrl) };
    await expect(f.backend.completeDemoAction(other.credential, input)).rejects.toMatchObject({ code: "authentication_failed" });
    await expect(f.backend.completeDemoAction(first.credential, { ...input, deviceVerifier: createCubidAuthState() })).rejects.toMatchObject({ code: "authentication_failed" });
    await f.backend.cancelDemoAction(first.credential, request.transactionId, f.deviceVerifier);
    await expect(f.backend.completeDemoAction(first.credential, input)).rejects.toMatchObject({ code: "authentication_failed" });
  });
  it("rechecks app-session revocation after an asynchronous step-up exchange", async () => {
    const f = await fixture(); const { credential } = await f.login();
    const request = await f.backend.startDemoAction(credential, f.deviceChallenge);
    f.tokenHook(async () => { await f.backend.logout(credential); });
    await expect(f.backend.completeDemoAction(credential, { transactionId: request.transactionId, deviceVerifier: f.deviceVerifier, callbackUrl: f.callbackFor(request.authorizationUrl) })).rejects.toMatchObject({ code: "unauthorized" });
  });
  it.each([{ issuer: "https://other.invalid" }, { token_endpoint: "https://other.invalid/token" }, { code_challenge_methods_supported: [] }, { token_endpoint_auth_methods_supported: ["client_secret_basic"] }])("rejects unsupported discovery %j", async (overrides) => {
    const f = await fixture(); f.discovery(overrides);
    await expect(f.create()).rejects.toMatchObject({ code: "invalid_request" });
  });
  it("bounds live transaction capacity and snapshots caller-owned records", async () => {
    const store = new MemoryReferenceStore(1); const f = await fixture(store);
    await f.backend.startLogin(f.deviceChallenge);
    await expect(f.backend.startLogin(f.deviceChallenge)).rejects.toMatchObject({ code: "capacity" });
    advance(300); expect((await f.backend.startLogin(f.deviceChallenge)).expiresAt).toBe(epoch + 600);
    const session = { key: "hash", issuer, clientId, subject: "original", expiresAt: epoch + 1000 };
    await store.putSession(session, epoch); session.subject = "changed";
    const read = await store.getSession("hash", epoch); expect(read?.subject).toBe("original");
    read!.subject = "changed-again"; expect((await store.getSession("hash", epoch))?.subject).toBe("original");
  });
});
