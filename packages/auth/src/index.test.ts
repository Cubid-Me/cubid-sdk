import { describe, expect, it, vi } from "vitest";

import {
  assertCubidAuthorizationState,
  buildCubidAuthorizationUrl,
  buildCubidLogoutUrl,
  buildCubidTokenExchangeRequest,
  buildCubidUserInfoRequest,
  clearCubidAuthSession,
  CUBID_AUTH_SESSION_STORAGE_KEY,
  createCubidAuthNonce,
  createCubidAuthSession,
  createCubidAuthState,
  createCubidPkceCodeChallenge,
  createCubidPkcePair,
  createCubidPkceCodeVerifier,
  CubidAuthError,
  decodeCubidIdTokenClaims,
  exchangeCubidAuthorizationCode,
  fetchCubidOidcDiscoveryDocument,
  fetchCubidUserInfo,
  isCubidAuthSessionExpired,
  isCubidIdTokenExpired,
  loadCubidAuthSession,
  parseCubidAuthSession,
  parseCubidAuthorizationCallback,
  persistCubidAuthSession,
} from "./index";

function createIdToken(payload: Record<string, unknown>) {
  return [
    "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0",
    Buffer.from(JSON.stringify(payload), "utf8")
      .toString("base64url")
      .replaceAll("=", ""),
    "signature",
  ].join(".");
}

describe("@cubid/auth", () => {
  it("creates the RFC 7636 code challenge from a verifier", async () => {
    const challenge = await createCubidPkceCodeChallenge(
      "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
    );

    expect(challenge).toBe("E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM");
  });

  it("creates PKCE, state, and nonce values using Web Crypto", async () => {
    const pair = await createCubidPkcePair({ verifierByteLength: 32 });
    const state = createCubidAuthState();
    const nonce = createCubidAuthNonce();

    expect(pair.codeVerifier.length).toBeGreaterThanOrEqual(43);
    expect(pair.codeChallengeMethod).toBe("S256");
    expect(pair.codeChallenge).toMatch(/^[A-Za-z0-9_-]+$/u);
    expect(state).not.toBe(nonce);
    expect(createCubidPkceCodeVerifier(32)).toMatch(/^[A-Za-z0-9_-]+$/u);
  });

  it("builds a Cubid authorization URL for public OIDC clients", () => {
    const url = buildCubidAuthorizationUrl({
      authorizationEndpoint: "https://id.cubid.me/oauth2/authorize",
      clientId: "clearpass-dashboard",
      codeChallenge: "challenge-123",
      extraParams: {
        audience: "developers",
      },
      loginHint: "developer@clearpass.app",
      nonce: "nonce-123",
      redirectUri: "https://dashboard.clearpass.app/callback",
      state: "state-123",
    });

    const parsed = new URL(url);

    expect(parsed.origin).toBe("https://id.cubid.me");
    expect(parsed.searchParams.get("client_id")).toBe("clearpass-dashboard");
    expect(parsed.searchParams.get("redirect_uri")).toBe(
      "https://dashboard.clearpass.app/callback"
    );
    expect(parsed.searchParams.get("response_type")).toBe("code");
    expect(parsed.searchParams.get("scope")).toBe("openid email profile");
    expect(parsed.searchParams.get("state")).toBe("state-123");
    expect(parsed.searchParams.get("nonce")).toBe("nonce-123");
    expect(parsed.searchParams.get("login_hint")).toBe("developer@clearpass.app");
    expect(parsed.searchParams.get("code_challenge")).toBe("challenge-123");
    expect(parsed.searchParams.get("code_challenge_method")).toBe("S256");
    expect(parsed.searchParams.get("audience")).toBe("developers");
  });

  it("parses successful and failed authorization callbacks", () => {
    expect(
      parseCubidAuthorizationCallback(
        "https://dashboard.clearpass.app/callback?code=oidc-code&state=state-123&iss=https%3A%2F%2Fid.cubid.me"
      )
    ).toEqual({
      code: "oidc-code",
      iss: "https://id.cubid.me",
      kind: "success",
      raw: {
        code: ["oidc-code"],
        iss: ["https://id.cubid.me"],
        state: ["state-123"],
      },
      sessionState: null,
      state: "state-123",
    });

    expect(
      parseCubidAuthorizationCallback("?error=access_denied&error_description=Nope&state=state-123")
    ).toEqual({
      error: "access_denied",
      errorDescription: "Nope",
      errorUri: null,
      kind: "error",
      raw: {
        error: ["access_denied"],
        error_description: ["Nope"],
        state: ["state-123"],
      },
      state: "state-123",
    });
  });

  it("rejects malformed callbacks and mismatched state values", () => {
    expect(() => parseCubidAuthorizationCallback("?state=state-123")).toThrow(
      CubidAuthError
    );

    expect(() =>
      assertCubidAuthorizationState("expected-state", "actual-state")
    ).toThrow(/state did not match/u);
  });

  it("fetches and normalizes issuer discovery metadata", async () => {
    const fetchImpl = vi.fn(async (input: string | URL | Request) => {
      expect(String(input)).toBe(
        "https://staging-id.cubid.me/.well-known/openid-configuration"
      );

      return new Response(
        JSON.stringify({
          authorization_endpoint: "https://staging-id.cubid.me/oauth2/authorize",
          code_challenge_methods_supported: ["S256"],
          end_session_endpoint: "https://staging-id.cubid.me/logout",
          issuer: "https://staging-id.cubid.me",
          token_endpoint: "https://staging-id.cubid.me/oauth2/token",
          token_endpoint_auth_methods_supported: ["none"],
          userinfo_endpoint: "https://staging-id.cubid.me/oauth2/userinfo",
        }),
        {
          headers: {
            "content-type": "application/json",
          },
          status: 200,
        }
      );
    });

    const discovery = await fetchCubidOidcDiscoveryDocument({
      fetch: fetchImpl,
      issuer: "https://staging-id.cubid.me",
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(discovery.authorization_endpoint).toContain("/oauth2/authorize");
    expect(discovery.token_endpoint_auth_methods_supported).toEqual(["none"]);
  });

  it("builds and exchanges an authorization code token request", async () => {
    const prepared = buildCubidTokenExchangeRequest({
      clientId: "clearpass-dashboard",
      code: "oidc-code",
      codeVerifier: "verifier-123",
      redirectUri: "https://dashboard.clearpass.app/callback",
      tokenEndpoint: "https://id.cubid.me/oauth2/token",
    });

    expect(prepared.url).toBe("https://id.cubid.me/oauth2/token");
    expect(String(prepared.body)).toContain("grant_type=authorization_code");
    expect(String(prepared.body)).toContain("client_id=clearpass-dashboard");

    const tokenResponse = await exchangeCubidAuthorizationCode({
      clientId: "clearpass-dashboard",
      code: "oidc-code",
      codeVerifier: "verifier-123",
      fetch: vi.fn(async (_input, init) => {
        expect(String(init?.body)).toContain("code_verifier=verifier-123");
        return new Response(
          JSON.stringify({
            access_token: "access-token-123",
            expires_in: 3600,
            id_token: createIdToken({
              email: "developer@clearpass.app",
              exp: Math.floor(Date.now() / 1000) + 3600,
              sub: "pairwise-user-123",
            }),
            refresh_token: "refresh-token-123",
            scope: "openid email profile",
            token_type: "Bearer",
          }),
          {
            headers: {
              "content-type": "application/json",
            },
            status: 200,
          }
        );
      }),
      redirectUri: "https://dashboard.clearpass.app/callback",
      tokenEndpoint: "https://id.cubid.me/oauth2/token",
    });

    expect(tokenResponse.accessToken).toBe("access-token-123");
    expect(tokenResponse.refreshToken).toBe("refresh-token-123");
    expect(tokenResponse.scope).toEqual(["openid", "email", "profile"]);
    expect(tokenResponse.expiresAt).toBeGreaterThan(tokenResponse.issuedAt);
  });

  it("surfaces structured token exchange and userinfo errors", async () => {
    await expect(
      exchangeCubidAuthorizationCode({
        clientId: "clearpass-dashboard",
        code: "oidc-code",
        codeVerifier: "verifier-123",
        fetch: async () =>
          new Response(
            JSON.stringify({
              error: "invalid_grant",
              error_description: "Code expired",
            }),
            {
              headers: {
                "content-type": "application/json",
              },
              status: 400,
            }
          ),
        redirectUri: "https://dashboard.clearpass.app/callback",
        tokenEndpoint: "https://id.cubid.me/oauth2/token",
      })
    ).rejects.toMatchObject({
      category: "protocol",
      code: "invalid_grant",
    });

    await expect(
      fetchCubidUserInfo({
        accessToken: "bad-token",
        fetch: async () =>
          new Response(
            JSON.stringify({
              error: "invalid_token",
              error_description: "Token expired",
            }),
            {
              headers: {
                "content-type": "application/json",
              },
              status: 401,
            }
          ),
        userInfoEndpoint: "https://id.cubid.me/oauth2/userinfo",
      })
    ).rejects.toMatchObject({
      category: "protocol",
      code: "invalid_token",
    });
  });

  it("fetches userinfo and decodes ID token claims", async () => {
    const idToken = createIdToken({
      email: "developer@clearpass.app",
      exp: Math.floor(Date.now() / 1000) + 120,
      name: "ClearPass Dev",
      sub: "pairwise-user-123",
    });

    const userInfo = await fetchCubidUserInfo({
      accessToken: "access-token-123",
      fetch: vi.fn(async (input, init) => {
        expect(String(input)).toBe("https://id.cubid.me/oauth2/userinfo");
        expect((init?.headers as Record<string, string>).authorization).toBe(
          "Bearer access-token-123"
        );

        return new Response(
          JSON.stringify({
            email: "developer@clearpass.app",
            name: "ClearPass Dev",
            sub: "pairwise-user-123",
          }),
          {
            headers: {
              "content-type": "application/json",
            },
            status: 200,
          }
        );
      }),
      userInfoEndpoint: "https://id.cubid.me/oauth2/userinfo",
    });

    expect(buildCubidUserInfoRequest({
      accessToken: "access-token-123",
      userInfoEndpoint: "https://id.cubid.me/oauth2/userinfo",
    }).url).toBe("https://id.cubid.me/oauth2/userinfo");
    expect(userInfo.sub).toBe("pairwise-user-123");
    expect(decodeCubidIdTokenClaims(idToken)).toMatchObject({
      email: "developer@clearpass.app",
      sub: "pairwise-user-123",
    });
    expect(isCubidIdTokenExpired(idToken)).toBe(false);
  });

  it("requires exactly three JWT segments when decoding ID token claims", () => {
    expect(() => decodeCubidIdTokenClaims("header.payload")).toThrow(CubidAuthError);
    expect(() => decodeCubidIdTokenClaims("header.payload.signature.extra")).toThrow(
      CubidAuthError
    );
    expect(() => decodeCubidIdTokenClaims("header..signature")).toThrow(CubidAuthError);
  });

  it("falls back to Buffer when base64 globals are unavailable", async () => {
    vi.stubGlobal("atob", undefined);
    vi.stubGlobal("btoa", undefined);

    try {
      const nonce = createCubidAuthNonce(32);
      const idToken = createIdToken({
        exp: Math.floor(Date.now() / 1000) + 120,
        nonce,
        sub: "pairwise-user-123",
      });

      expect(nonce).toMatch(/^[A-Za-z0-9_-]+$/u);
      expect(decodeCubidIdTokenClaims(idToken)).toMatchObject({
        nonce,
        sub: "pairwise-user-123",
      });
      await expect(
        createCubidPkceCodeChallenge("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk")
      ).resolves.toBe("E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM");
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("builds logout URLs and persists browser session snapshots", () => {
    const logoutUrl = buildCubidLogoutUrl({
      endSessionEndpoint: "https://id.cubid.me/logout",
      postLogoutRedirectUri: "https://dashboard.clearpass.app/signed-out",
      state: "logout-state-123",
    });
    const tokenResponse = {
      accessToken: "access-token-123",
      expiresAt: Date.now() + 3600_000,
      expiresIn: 3600,
      idToken: createIdToken({
        exp: Math.floor(Date.now() / 1000) + 3600,
        sub: "pairwise-user-123",
      }),
      issuedAt: Date.now(),
      raw: {},
      refreshToken: null,
      scope: ["openid", "email", "profile"] as string[],
      tokenType: "Bearer",
    } as const;
    const session = createCubidAuthSession({
      clientId: "clearpass-dashboard",
      issuer: "https://id.cubid.me",
      tokenResponse,
      userInfo: {
        email: "developer@clearpass.app",
        sub: "pairwise-user-123",
      },
    });
    const storage = new Map<string, string>();
    const storageLike = {
      getItem: (key: string) => storage.get(key) ?? null,
      removeItem: (key: string) => {
        storage.delete(key);
      },
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
    };

    expect(logoutUrl).toBe(
      "https://id.cubid.me/logout?post_logout_redirect_uri=https%3A%2F%2Fdashboard.clearpass.app%2Fsigned-out&state=logout-state-123"
    );
    expect(isCubidAuthSessionExpired(session)).toBe(false);

    const serialized = persistCubidAuthSession(storageLike, session);
    expect(storage.get(CUBID_AUTH_SESSION_STORAGE_KEY)).toBe(serialized);
    expect(loadCubidAuthSession(storageLike)).toEqual(session);
    expect(parseCubidAuthSession(serialized).subject).toBe("pairwise-user-123");

    clearCubidAuthSession(storageLike);
    expect(storage.has(CUBID_AUTH_SESSION_STORAGE_KEY)).toBe(false);
  });
});
