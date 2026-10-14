import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildCubidAuthorizationUrl,
  createCubidAuthSession,
  createCubidPkceCodeVerifier,
  decodeCubidIdTokenClaims,
  parseCubidAuthorizationCallback,
  type CubidAuthProviderHint,
} from "./index";

const authorization = {
  authorizationEndpoint: "https://id.cubid.me/authorize",
  clientId: "example-rp",
  codeChallenge: "challenge",
  redirectUri: "cubidexample://auth/callback",
  state: "state",
  nonce: "nonce",
};

afterEach(() => vi.unstubAllGlobals());

describe("Cubid federation contract v1", () => {
  it.each(["google", "github", "apple", "passkey"] as const)("sends %s only as a Cubid hosted choice", (provider) => {
    const url = new URL(buildCubidAuthorizationUrl({
      ...authorization, provider, requirePasskey: true, prompt: "login", maxAge: 0,
      loginHint: "existing-account-hint",
    }));
    expect(url.origin).toBe("https://id.cubid.me");
    expect(url.searchParams.getAll("cubid_provider")).toEqual([provider]);
    expect(url.searchParams.get("login_hint")).toBe("existing-account-hint");
    expect(url.searchParams.get("acr_values")).toBe("urn:cubid:acr:passkey");
    expect(url.searchParams.get("prompt")).toBe("login");
    expect(url.searchParams.get("max_age")).toBe("0");
    expect(url.searchParams.get("state")).toBe("state");
    expect(url.searchParams.get("nonce")).toBe("nonce");
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
  });

  it("preserves legacy requests and accepts one valid low-level hint", () => {
    expect(new URL(buildCubidAuthorizationUrl(authorization)).searchParams.has("cubid_provider")).toBe(false);
    expect(new URL(buildCubidAuthorizationUrl({ ...authorization, extraParams: { cubid_provider: "google" } })).searchParams.get("cubid_provider")).toBe("google");
  });

  it.each(["", "unknown", "Google", "google github", 1, false, ["google", "apple"], null])("rejects unsupported hint %j", (provider) => {
    expect(() => buildCubidAuthorizationUrl({ ...authorization, provider: provider as CubidAuthProviderHint })).toThrow(expect.objectContaining({ code: "invalid_provider" }));
  });

  it.each([
    { provider: "google" as const, extraParams: { cubid_provider: "apple" } },
    { provider: "google" as const, extraParams: { cubid_provider: "google" } },
    { authorizationEndpoint: "https://id.cubid.me/authorize?cubid_provider=google&cubid_provider=google" },
    { authorizationEndpoint: "https://id.cubid.me/authorize?cubid_provider=google", provider: "apple" as const },
    { extraParams: { cubid_provider: "" } },
  ])("rejects ambiguous or empty provider sources", (input) => {
    expect(() => buildCubidAuthorizationUrl({ ...authorization, ...input })).toThrow(expect.objectContaining({ code: "invalid_provider" }));
  });

  it("parses native custom-scheme and claimed HTTPS callbacks", () => {
    for (const callback of ["cubidexample://auth/callback", "https://app.example/auth/callback"]) {
      expect(parseCubidAuthorizationCallback(`${callback}?code=code&state=state&iss=https%3A%2F%2Fid.cubid.me`)).toMatchObject({ kind: "success", code: "code", state: "state", iss: "https://id.cubid.me" });
    }
    expect(parseCubidAuthorizationCallback("cubidexample://auth/callback?error=access_denied&state=state")).toMatchObject({ kind: "error", state: "state" });
  });

  it.each([
    "code=a&code=b&state=state", "code=a&state=state&state=other",
    "code=a&state=state&iss=one&iss=two", "code=a&state=state&error=access_denied",
    "error=&state=state", "error=access_denied&error=other&state=state",
  ])("rejects ambiguous callback %s", (query) => {
    expect(() => parseCubidAuthorizationCallback(`cubidexample://auth/callback?${query}`)).toThrow(expect.objectContaining({ code: "invalid_callback" }));
  });
});

describe("runtime-agnostic auth compatibility", () => {
  it("uses portable base64 at every byte boundary and decodes Unicode claims without host encoders", () => {
    const nativeCrypto = globalThis.crypto;
    const nodeBuffer = Buffer;
    const tokens = ["a", "ab", "abc", "José 東京 🌍"].map((name) => ({
      name, token: `${nodeBuffer.from('{"alg":"none"}').toString("base64url")}.${nodeBuffer.from(JSON.stringify({ sub: "pairwise", name })).toString("base64url")}.signature`,
    }));
    let verifiers: string[] = [];
    let decodedNames: unknown[] = [];
    try {
      for (const key of ["Buffer", "btoa", "atob", "TextEncoder", "TextDecoder", "crypto"]) vi.stubGlobal(key, undefined);
      verifiers = [32, 33, 34, 64].map((length) => createCubidPkceCodeVerifier(length, nativeCrypto));
      decodedNames = tokens.map(({ token }) => decodeCubidIdTokenClaims(token).name);
    } finally {
      // Vitest RPC itself uses Buffer. Never yield while host globals are masked.
      vi.unstubAllGlobals();
    }
    for (const [index, verifier] of verifiers.entries()) expect(nodeBuffer.from(verifier, "base64url")).toHaveLength([32, 33, 34, 64][index]!);
    expect(decodedNames).toEqual(tokens.map(({ name }) => name));
  });

  it("completes native Cubid protocol and rejects invalid binding in an isolated host", () => {
    const output = execFileSync(process.execPath, ["--experimental-strip-types", fileURLToPath(new URL("../../../scripts/check-auth-native-compat.mjs", import.meta.url))], { encoding: "utf8", stdio: "pipe" });
    expect(output).toContain("PASS: synthetic native Cubid federation");
  });
});

it("preserves older/other issuer optional email verification booleans", () => {
  const claims = { sub: "pairwise", email: "legacy@example.invalid", email_verified: false };
  const session = createCubidAuthSession({ clientId: "legacy-client", issuer: "https://legacy.example", idTokenClaims: claims,
    userInfo: claims, tokenResponse: { accessToken: "synthetic", tokenType: "Bearer", expiresAt: null, expiresIn: null, issuedAt: Date.now(), idToken: null, refreshToken: null, scope: ["openid", "email"], raw: {} },
  });
  expect(session.idTokenClaims?.email_verified).toBe(false);
  expect(session.userInfo?.email_verified).toBe(false);
});
