import { describe, expect, it, vi } from "vitest";
import { createCubidApiClient } from "@cubid/core";
import { createCubidAuthSession, fetchCubidOidcDiscoveryDocument, fetchCubidUserInfo } from "@cubid/auth";
import type { CubidIdTokenClaims, CubidTokenResponse, CubidUserInfo } from "@cubid/auth";

// Deliberately all UUID-shaped: syntax cannot establish an identifier namespace.
const projectUuid = "11111111-1111-4111-8111-111111111111";
const dappUuid = "22222222-2222-4222-8222-222222222222";
const oidcSubject = "33333333-3333-4333-8333-333333333333";
const issuer = "https://identity.example.invalid";
const tokenResponse: CubidTokenResponse = {
  accessToken: "synthetic-access", tokenType: "Bearer", scope: ["openid", "email"],
  idToken: null, refreshToken: null, expiresAt: null, expiresIn: null, issuedAt: 1_800_000_000_000, raw: {},
};

function session(claims: CubidIdTokenClaims, userInfo?: CubidUserInfo) {
  // Assembly only. Real consumers must validate signature/issuer/audience/nonce first.
  return createCubidAuthSession({ clientId: "synthetic-rp", issuer, tokenResponse, idTokenClaims: claims, userInfo });
}

describe("public SDK consumers keep identity namespaces separate", () => {
  it("preserves the existing create_user app UUID separately from the OIDC subject", async () => {
    const fetch = vi.fn(async () => Response.json({ user_id: dappUuid, is_new_app_user: false }));
    const client = createCubidApiClient({ apiKey: "synthetic-key", dappId: "synthetic-dapp", baseUrl: "https://api.example.invalid", fetch });
    // Explicit onboarding API fixture; never a missing-allocator-mapping fallback.
    const existingAppUser = await client.createUser({ email: "fixture@example.invalid" });
    const signedIn = session({ sub: oidcSubject });
    expect(existingAppUser.userId).toBe(dappUuid);
    expect(signedIn.subject).toBe(oidcSubject);
    expect(new Set([projectUuid, existingAppUser.userId, signedIn.subject]).size).toBe(3);
    expect(existingAppUser.isNewAppUser).toBe(false);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("sends the already known dapp UUID to the existing score reader and preserves a real zero score", async () => {
    const calls: Array<{ path: string; body: Record<string, unknown> }> = [];
    const fetch = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      calls.push({ path: new URL(String(input)).pathname, body: JSON.parse(String(init?.body)) });
      return Response.json({ cubid_score: 0, scoring_schema: "synthetic-schema" });
    });
    const client = createCubidApiClient({ apiKey: "synthetic-key", baseUrl: "https://api.example.invalid", fetch });
    const score = await client.fetchScore({ userId: dappUuid });
    expect(score.cubidScore).toBe(0);
    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({ path: "/api/v2/score/fetch_score", body: { user_id: dappUuid } });
    expect(JSON.stringify(calls)).not.toContain(projectUuid);
    expect(JSON.stringify(calls)).not.toContain(oidcSubject);
  });

  it.each([404, 429, 503])("does not turn a %s read failure into create_user or email lookup", async (status) => {
    const paths: string[] = [];
    const fetch = vi.fn(async (input: string | URL | Request) => {
      paths.push(new URL(String(input)).pathname);
      return Response.json({ error: "synthetic_read_failure" }, { status });
    });
    const client = createCubidApiClient({ apiKey: "synthetic-key", baseUrl: "https://api.example.invalid", fetch });
    await expect(client.fetchScore({ userId: dappUuid })).rejects.toMatchObject({ status });
    expect(paths).toEqual(["/api/v2/score/fetch_score"]);
  });

  it("requires a caller-supplied ID instead of filling one from a session or email", () => {
    const fetch = vi.fn();
    const client = createCubidApiClient({ apiKey: "synthetic-key", baseUrl: "https://api.example.invalid", fetch });
    expect(() => client.fetchScore({ userId: " " })).toThrow();
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("email disclosure keeps the established subject and issuer profile", () => {
  it("assembles a subject-only authenticated result without fabricating an email or verification flag", () => {
    const result = session({ sub: oidcSubject });
    expect(result.subject).toBe(oidcSubject);
    expect(result.idTokenClaims).not.toHaveProperty("email");
    expect(result.idTokenClaims).not.toHaveProperty("email_verified");
    expect(result.userInfo).toBeNull();
  });

  it.each([true, false, undefined])("preserves legacy verification value %s without promoting false/absence", (verified) => {
    const email = { email: "fixture@example.invalid", ...(verified === undefined ? {} : { email_verified: verified }) };
    const result = session({ sub: oidcSubject, ...email }, { sub: oidcSubject, ...email });
    expect(result.subject).toBe(oidcSubject);
    expect(result.idTokenClaims?.email_verified).toBe(verified);
    expect(result.userInfo?.email_verified).toBe(verified);
    if (verified === undefined) {
      expect(result.idTokenClaims).not.toHaveProperty("email_verified");
      expect(result.userInfo).not.toHaveProperty("email_verified");
    }
  });

  it("keeps email-free passkey and consented-email results on the same OIDC subject", () => {
    const before = session({ sub: oidcSubject, amr: ["webauthn"] });
    const after = session({ sub: oidcSubject, amr: ["webauthn"], email: "fixture@example.invalid" });
    expect(before.subject).toBe(after.subject);
    expect(after.subject).not.toBe(dappUuid);
  });

  it("rejects a different UserInfo subject even when both results contain the same email", () => {
    expect(() => session({ sub: oidcSubject, email: "fixture@example.invalid" }, {
      sub: dappUuid, email: "fixture@example.invalid", email_verified: true,
    })).toThrow(expect.objectContaining({ code: "invalid_userinfo_subject" }));
  });

  it("uses a discovered UserInfo endpoint with the access token and preserves omitted email", async () => {
    const endpoint = `${issuer}/oidc/userinfo`;
    const calls: Array<{ url: string; method: string | undefined; headers: Headers }> = [];
    const fetch = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, method: init?.method, headers: new Headers(init?.headers) });
      return url.endsWith("openid-configuration")
        ? Response.json({ issuer, authorization_endpoint: `${issuer}/authorize`, token_endpoint: `${issuer}/token`, userinfo_endpoint: endpoint })
        : Response.json({ sub: oidcSubject });
    });
    const discovery = await fetchCubidOidcDiscoveryDocument({ issuer, fetch });
    const userInfo = await fetchCubidUserInfo({ accessToken: tokenResponse.accessToken, userInfoEndpoint: discovery.userinfo_endpoint!, fetch });
    expect(calls).toHaveLength(2);
    expect(calls[1]?.url).toBe(endpoint);
    expect(calls[1]?.method).toBe("GET");
    expect(calls[1]?.headers.get("authorization")).toBe("Bearer synthetic-access");
    expect(userInfo).toEqual({ sub: oidcSubject });
    expect(session({ sub: oidcSubject }, userInfo).subject).toBe(oidcSubject);
  });

  it.each([
    { email: "fixture@example.invalid", email_verified: true },
    { sub: "", email: "fixture@example.invalid", email_verified: true },
  ])("rejects UserInfo missing a subject even when an email is marked verified", async (payload) => {
    await expect(fetchCubidUserInfo({
      accessToken: tokenResponse.accessToken, userInfoEndpoint: `${issuer}/userinfo`,
      fetch: async () => Response.json(payload),
    })).rejects.toThrow();
  });

  it("does not synthesize an OIDC verification boolean from an unrelated UI marker", async () => {
    const userInfo = await fetchCubidUserInfo({
      accessToken: tokenResponse.accessToken, userInfoEndpoint: `${issuer}/userinfo`,
      fetch: async () => Response.json({ sub: oidcSubject, email: "fixture@example.invalid", isVerified: true }),
    });
    const result = session({ sub: oidcSubject }, userInfo);
    expect(result.userInfo).not.toHaveProperty("email_verified");
    expect(result.idTokenClaims).not.toHaveProperty("email_verified");
    expect(result.idTokenClaims).not.toHaveProperty("email");
    expect(result.subject).toBe(oidcSubject);
  });
});
