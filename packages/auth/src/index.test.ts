import { describe, expect, it, vi } from "vitest";

import {
  assertCubidAuthorizationState,
  buildCubidAuthorizationUrl,
  buildCubidCrossAppResource,
  buildCubidIdentityAssertionRequest,
  buildCubidJwtBearerGrantRequest,
  buildCubidLogoutUrl,
  buildCubidTokenExchangeRequest,
  buildCubidUserInfoRequest,
  checkCubidIdentityIssuerReadiness,
  clearCubidAuthSession,
  CUBID_ACCESS_TOKEN_TOKEN_TYPE,
  CUBID_AUTH_SESSION_STORAGE_KEY,
  CUBID_FRIENDR_OIDC_CLAIM_NAMES,
  CUBID_ID_JAG_JWT_TYPE,
  CUBID_ID_JAG_TOKEN_TYPE,
  CUBID_ID_TOKEN_TOKEN_TYPE,
  CUBID_JWT_BEARER_GRANT_TYPE,
  CUBID_PRODUCTION_ISSUER,
  CUBID_SECURITY_EVENT_JWT_TYPE,
  CUBID_SECURITY_EVENT_TYPES,
  CUBID_STAGING_ISSUER,
  CUBID_TOKEN_EXCHANGE_GRANT_TYPE,
  decodeCubidIdentityAssertionClaims,
  decodeCubidSecurityEventToken,
  getCubidCrossAppConsentResource,
  isCubidCrossAppConsentRequired,
  isCubidSecurityEventType,
  requestCubidIdentityAssertion,
  supportsCubidCrossAppAccess,
  validateCubidIdentityAssertion,
  validateCubidSecurityEventToken,
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
  getCubidAuthAssurance,
  getCubidFriendrOidcClaim,
  hasCubidPasskeyAssurance,
  isCubidFriendrIdTokenClaim,
  isCubidFriendrRedirectParameter,
  isCubidAuthSessionExpired,
  isCubidIdTokenExpired,
  loadCubidAuthSession,
  parseCubidAuthSession,
  parseCubidAuthorizationCallback,
  persistCubidAuthSession,
  validateCubidIdToken,
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

async function createSignedIdToken(payload: Record<string, unknown>) {
  const keyPair = await crypto.subtle.generateKey(
    {
      hash: "SHA-256",
      modulusLength: 2048,
      name: "RSASSA-PKCS1-v1_5",
      publicExponent: new Uint8Array([1, 0, 1]),
    },
    true,
    ["sign", "verify"]
  );
  const publicKey = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const header = {
    alg: "RS256",
    kid: "cubid-test-key",
    typ: "JWT",
  };
  const encodedHeader = Buffer.from(JSON.stringify(header), "utf8").toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    keyPair.privateKey,
    new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
  );

  return {
    idToken: `${encodedHeader}.${encodedPayload}.${Buffer.from(signature).toString("base64url")}`,
    jwks: {
      keys: [
        {
          ...publicKey,
          alg: "RS256",
          kid: "cubid-test-key",
          use: "sig",
        },
      ],
    },
  };
}

function createDiscoveryDocument(
  issuer = CUBID_PRODUCTION_ISSUER,
  overrides: Record<string, unknown> = {}
) {
  return {
    authorization_endpoint: `${issuer}/oauth2/authorize`,
    code_challenge_methods_supported: ["S256"],
    issuer,
    jwks_uri: `${issuer}/.well-known/jwks.json`,
    response_types_supported: ["code"],
    subject_types_supported: ["pairwise"],
    token_endpoint: `${issuer}/oauth2/token`,
    userinfo_endpoint: `${issuer}/oauth2/userinfo`,
    ...overrides,
  };
}

function createReadinessFetch(
  discovery: Record<string, unknown>,
  jwks: Record<string, unknown> = {
    keys: [{ alg: "RS256", kid: "test-key", kty: "RSA", use: "sig" }],
  }
) {
  return vi.fn(async (input: string | URL | Request) => {
    const url = String(input);
    if (url.endsWith("/.well-known/openid-configuration")) {
      return new Response(JSON.stringify(discovery), {
        headers: { "content-type": "application/json" },
        status: 200,
      });
    }

    if (url.endsWith("/.well-known/jwks.json")) {
      return new Response(JSON.stringify(jwks), {
        headers: { "content-type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "unexpected_url", url }), {
      headers: { "content-type": "application/json" },
      status: 404,
    });
  });
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

  it("can request passkey-backed Cubid assurance with ACR values", () => {
    const url = buildCubidAuthorizationUrl({
      authorizationEndpoint: "https://id.cubid.me/authorize",
      clientId: "consumer-app",
      codeChallenge: "challenge-123",
      nonce: "nonce-123",
      redirectUri: "https://app.example.com/auth/callback",
      requirePasskey: true,
      state: "state-123",
    });

    const parsed = new URL(url);
    expect(parsed.searchParams.get("acr_values")).toBe(
      "urn:cubid:acr:passkey"
    );
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

  it("classifies FriendR claims as UserInfo-only public contract fields", () => {
    expect([...CUBID_FRIENDR_OIDC_CLAIM_NAMES]).toEqual([
      "self_account_type_claim_v1",
      "cubid_kyc_presence_v1",
      "friendr_unique_human_confidence",
    ]);

    expect(getCubidFriendrOidcClaim("self_account_type_claim_v1")).toEqual({
      canonicalName: "cubid_actor_type",
      claimName: "self_account_type_claim_v1",
      idTokenEligible: false,
      redirectParameterEligible: false,
      scope: "cubid:profile",
      userInfoEligible: true,
    });

    expect(getCubidFriendrOidcClaim("friendr_unique_human_confidence")).toEqual({
      canonicalName: "friendr_unique_human_confidence",
      claimName: "friendr_unique_human_confidence",
      idTokenEligible: false,
      redirectParameterEligible: false,
      scope: "cubid:stamps",
      userInfoEligible: true,
    });

    expect(isCubidFriendrIdTokenClaim("friendr_unique_human_confidence")).toBe(false);
    expect(isCubidFriendrRedirectParameter("friendr_unique_human_confidence")).toBe(false);
    expect(getCubidFriendrOidcClaim("friendr_graph_payload")).toBeNull();
  });

  it("does not promote FriendR callback query fields into parsed OIDC helpers", () => {
    const parsed = parseCubidAuthorizationCallback(
      "https://dashboard.clearpass.app/callback?code=oidc-code&state=state-123&friendr_unique_human_confidence=0.99"
    );

    expect(parsed.kind).toBe("success");
    expect("friendr_unique_human_confidence" in parsed).toBe(false);
    expect(parsed.raw.friendr_unique_human_confidence).toEqual(["0.99"]);
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

  it("checks production identity issuer readiness from metadata only", async () => {
    const fetchImpl = createReadinessFetch(createDiscoveryDocument());

    const report = await checkCubidIdentityIssuerReadiness({ fetch: fetchImpl });

    expect(report).toMatchObject({
      authorizationEndpoint: "https://id.cubid.me/oauth2/authorize",
      environment: "production",
      expectedIssuer: CUBID_PRODUCTION_ISSUER,
      issuer: CUBID_PRODUCTION_ISSUER,
      jwksKeyCount: 1,
      jwksUri: "https://id.cubid.me/.well-known/jwks.json",
      supportsAuthorizationCode: true,
      supportsPairwiseSubjects: true,
      supportsPkceS256: true,
      tokenEndpoint: "https://id.cubid.me/oauth2/token",
      userInfoEndpoint: "https://id.cubid.me/oauth2/userinfo",
    });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("checks staging readiness only when staging is explicitly selected", async () => {
    await expect(
      checkCubidIdentityIssuerReadiness({
        environment: "prod" as never,
        fetch: createReadinessFetch(createDiscoveryDocument(CUBID_STAGING_ISSUER)),
      })
    ).rejects.toMatchObject({
      code: "invalid_environment",
    });

    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: createReadinessFetch(createDiscoveryDocument(CUBID_STAGING_ISSUER)),
        issuer: CUBID_STAGING_ISSUER,
      })
    ).rejects.toMatchObject({
      code: "issuer_environment_mismatch",
    });

    await expect(
      checkCubidIdentityIssuerReadiness({
        environment: "staging",
        fetch: createReadinessFetch(createDiscoveryDocument(CUBID_STAGING_ISSUER)),
        issuer: CUBID_STAGING_ISSUER,
      })
    ).resolves.toMatchObject({
      environment: "staging",
      expectedIssuer: CUBID_STAGING_ISSUER,
      issuer: CUBID_STAGING_ISSUER,
    });
  });

  it("fails readiness when discovery advertises the wrong issuer", async () => {
    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: createReadinessFetch(
          createDiscoveryDocument(CUBID_PRODUCTION_ISSUER, {
            issuer: CUBID_STAGING_ISSUER,
          })
        ),
      })
    ).rejects.toMatchObject({
      code: "discovery_issuer_mismatch",
    });
  });

  it("fails readiness for missing production metadata capabilities", async () => {
    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: createReadinessFetch(
          createDiscoveryDocument(CUBID_PRODUCTION_ISSUER, {
            code_challenge_methods_supported: ["plain"],
          })
        ),
      })
    ).rejects.toMatchObject({ code: "missing_pkce_s256" });

    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: createReadinessFetch(
          createDiscoveryDocument(CUBID_PRODUCTION_ISSUER, {
            response_types_supported: ["id_token"],
          })
        ),
      })
    ).rejects.toMatchObject({ code: "missing_authorization_code_flow" });

    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: createReadinessFetch(
          createDiscoveryDocument(CUBID_PRODUCTION_ISSUER, {
            subject_types_supported: ["public"],
          })
        ),
      })
    ).rejects.toMatchObject({ code: "missing_pairwise_subjects" });
  });

  it("fails readiness for missing or empty JWKS", async () => {
    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: createReadinessFetch(
          createDiscoveryDocument(CUBID_PRODUCTION_ISSUER, {
            jwks_uri: undefined,
          })
        ),
      })
    ).rejects.toMatchObject({ code: "missing_jwks_uri" });

    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: createReadinessFetch(createDiscoveryDocument(), { keys: [] }),
      })
    ).rejects.toMatchObject({ code: "empty_jwks" });

    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: createReadinessFetch(createDiscoveryDocument(), {
          keys: [
            {},
            { alg: "RS256", kty: "RSA", use: "enc" },
            { alg: "HS256", kty: "oct", use: "sig" },
            { alg: "ES256", crv: "P-256", key_ops: ["sign"], kty: "EC" },
          ],
        }),
      })
    ).rejects.toMatchObject({ code: "empty_jwks" });

    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: createReadinessFetch(createDiscoveryDocument(), {
          keys: [
            {},
            { alg: "RS256", kid: "usable-rsa", kty: "RSA", use: "sig" },
            { alg: "ES256", crv: "P-256", key_ops: ["verify"], kty: "EC" },
            { alg: "HS256", kty: "oct", use: "sig" },
          ],
        }),
      })
    ).resolves.toMatchObject({ jwksKeyCount: 2 });
  });

  it("fails readiness when discovery cannot be reached", async () => {
    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: vi.fn(async () => {
          throw new Error("offline");
        }),
      })
    ).rejects.toMatchObject({
      code: "discovery_fetch_failed",
    });
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

  it("preserves typed ID token ACR and AMR assurance claims", () => {
    const idToken = createIdToken({
      acr: "urn:cubid:acr:passkey",
      amr: ["passkey"],
      iss: "https://id.cubid.me",
      sub: "pairwise-user-123",
    });
    const claims = decodeCubidIdTokenClaims(idToken);

    expect(claims.acr).toBe("urn:cubid:acr:passkey");
    expect(claims.amr).toEqual(["passkey"]);
  });

  it("normalizes passkey assurance from claims, ID tokens, and auth sessions", () => {
    const idToken = createIdToken({
      amr: ["passkey"],
      iss: "https://id.cubid.me",
      sub: "pairwise-user-123",
    });
    const tokenResponse = {
      accessToken: "access-token",
      expiresAt: null,
      expiresIn: null,
      idToken,
      issuedAt: Date.now(),
      raw: {},
      refreshToken: null,
      scope: ["openid"],
      tokenType: "Bearer",
    };
    const session = createCubidAuthSession({
      clientId: "client-123",
      issuer: "https://id.cubid.me",
      tokenResponse,
    });

    expect(hasCubidPasskeyAssurance({
      acr: "urn:cubid:acr:passkey",
      sub: "pairwise-user-123",
    })).toBe(true);
    expect(hasCubidPasskeyAssurance(idToken)).toBe(true);
    expect(getCubidAuthAssurance(session)).toEqual({
      acr: null,
      amr: ["passkey"],
      hasPasskeyAssurance: true,
    });
    expect(hasCubidPasskeyAssurance({ amr: ["email_otp"] })).toBe(false);
  });

  it("requires exactly three JWT segments when decoding ID token claims", () => {
    expect(() => decodeCubidIdTokenClaims("header.payload")).toThrow(CubidAuthError);
    expect(() => decodeCubidIdTokenClaims("header.payload.signature.extra")).toThrow(
      CubidAuthError
    );
    expect(() => decodeCubidIdTokenClaims("header..signature")).toThrow(CubidAuthError);
  });

  it("validates ID token issuer, audience, expiration, and signature", async () => {
    const nowSeconds = Math.floor(Date.now() / 1000);
    const { idToken, jwks } = await createSignedIdToken({
      aud: "clearpass-dashboard",
      email: "developer@clearpass.app",
      exp: nowSeconds + 3600,
      iss: "https://staging-id.cubid.me",
      nonce: "nonce-123",
      sub: "pairwise-user-123",
    });
    const fetchImpl = vi.fn(async () =>
      new Response(JSON.stringify(jwks), {
        headers: { "content-type": "application/json" },
        status: 200,
      })
    );

    await expect(
      validateCubidIdToken({
        clientId: "clearpass-dashboard",
        discoveryDocument: {
          authorization_endpoint: "https://staging-id.cubid.me/oauth2/authorize",
          issuer: "https://staging-id.cubid.me",
          jwks_uri: "https://staging-id.cubid.me/.well-known/jwks.json",
          token_endpoint: "https://staging-id.cubid.me/oauth2/token",
        },
        fetch: fetchImpl,
        idToken,
        nowSeconds,
      })
    ).resolves.toMatchObject({
      aud: "clearpass-dashboard",
      iss: "https://staging-id.cubid.me",
      sub: "pairwise-user-123",
    });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://staging-id.cubid.me/.well-known/jwks.json",
      expect.objectContaining({
        method: "GET",
      })
    );
  });

  it("rejects unsigned ID tokens during validation", async () => {
    await expect(
      validateCubidIdToken({
        clientId: "clearpass-dashboard",
        discoveryDocument: {
          authorization_endpoint: "https://staging-id.cubid.me/oauth2/authorize",
          issuer: "https://staging-id.cubid.me",
          jwks_uri: "https://staging-id.cubid.me/.well-known/jwks.json",
          token_endpoint: "https://staging-id.cubid.me/oauth2/token",
        },
        fetch: vi.fn(),
        idToken: createIdToken({
          aud: "clearpass-dashboard",
          exp: Math.floor(Date.now() / 1000) + 3600,
          iss: "https://staging-id.cubid.me",
          sub: "pairwise-user-123",
        }),
      })
    ).rejects.toMatchObject({
      code: "unsupported_id_token_alg",
    });
  });

  it("rejects stored sessions with non-finite timestamps", () => {
    const serialized =
      '{"accessToken":"access-token-123","clientId":"clearpass-dashboard",' +
      '"expiresAt":1e999,"issuedAt":1e999,"issuer":"https://id.cubid.me",' +
      '"scope":["openid","email","profile"],"tokenType":"Bearer"}';

    expect(() => parseCubidAuthSession(serialized)).toThrow(CubidAuthError);
  });

  it("rejects stored sessions with array-shaped nested objects", () => {
    const serialized =
      '{"accessToken":"access-token-123","clientId":"clearpass-dashboard",' +
      '"expiresAt":null,"idTokenClaims":[],"issuedAt":123,' +
      '"issuer":"https://id.cubid.me","scope":["openid","email","profile"],' +
      '"tokenType":"Bearer","userInfo":[]}';

    expect(() => parseCubidAuthSession(serialized)).toThrow(CubidAuthError);
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

describe("@cubid/auth cross-app access", () => {
  const issuer = "https://staging-id.cubid.me";
  const discoveryDocument = {
    authorization_endpoint: `${issuer}/authorize`,
    cross_app_access_consent_parameter: "resource",
    cross_app_access_issued_token_types_supported: [CUBID_ID_JAG_TOKEN_TYPE],
    cross_app_access_supported: true,
    grant_types_supported: ["authorization_code", CUBID_TOKEN_EXCHANGE_GRANT_TYPE],
    issuer,
    jwks_uri: `${issuer}/jwks`,
    token_endpoint: `${issuer}/token`,
  };

  async function createSignedJwt(header: Record<string, unknown>, payload: Record<string, unknown>) {
    const keyPair = await crypto.subtle.generateKey(
      {
        hash: "SHA-256",
        modulusLength: 2048,
        name: "RSASSA-PKCS1-v1_5",
        publicExponent: new Uint8Array([1, 0, 1]),
      },
      true,
      ["sign", "verify"]
    );
    const publicKey = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
    const encodedHeader = Buffer.from(JSON.stringify({ alg: "RS256", kid: "cubid-test-key", ...header }), "utf8").toString("base64url");
    const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      keyPair.privateKey,
      new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
    );
    const jwks = { keys: [{ ...publicKey, alg: "RS256", kid: "cubid-test-key", use: "sig" }] };
    const fetchJwks = vi.fn(async () =>
      new Response(JSON.stringify(jwks), { headers: { "content-type": "application/json" }, status: 200 })
    );

    return {
      fetchJwks,
      token: `${encodedHeader}.${encodedPayload}.${Buffer.from(signature).toString("base64url")}`,
    };
  }

  it("names paired apps for the resource parameter and adds them to the authorization request", () => {
    expect(buildCubidCrossAppResource("cubid_chaincrew")).toBe("urn:cubid:client:cubid_chaincrew");
    expect(buildCubidCrossAppResource("urn:cubid:client:cubid_chaincrew")).toBe("urn:cubid:client:cubid_chaincrew");
    expect(() => buildCubidCrossAppResource("has space")).toThrow(CubidAuthError);

    const url = new URL(
      buildCubidAuthorizationUrl({
        authorizationEndpoint: discoveryDocument.authorization_endpoint,
        clientId: "cubid_wondrbot",
        codeChallenge: "challenge",
        redirectUri: "https://wondrbot.example/callback",
        resources: [buildCubidCrossAppResource("cubid_chaincrew"), "https://auth.friendr.example", "urn:cubid:client:cubid_chaincrew"],
        state: "state-1",
      })
    );

    expect(url.searchParams.getAll("resource")).toEqual([
      "urn:cubid:client:cubid_chaincrew",
      "https://auth.friendr.example",
    ]);
    expect(supportsCubidCrossAppAccess(discoveryDocument)).toBe(true);
    expect(
      supportsCubidCrossAppAccess({
        authorization_endpoint: `${issuer}/authorize`,
        issuer,
        token_endpoint: `${issuer}/token`,
      })
    ).toBe(false);
  });

  it("builds a client-authenticated token exchange for an identity assertion", () => {
    const prepared = buildCubidIdentityAssertionRequest({
      audience: "https://auth.chaincrew.example",
      clientId: "cubid_wondrbot",
      clientSecret: "s3cret:value",
      scope: ["accounts:read", "accounts:read"],
      subjectToken: "id-token",
      tokenEndpoint: discoveryDocument.token_endpoint,
    });
    const body = new URLSearchParams(String(prepared.body));
    const headers = prepared.init.headers as Record<string, string>;

    expect(prepared.url).toBe(`${issuer}/token`);
    expect(body.get("grant_type")).toBe(CUBID_TOKEN_EXCHANGE_GRANT_TYPE);
    expect(body.get("requested_token_type")).toBe(CUBID_ID_JAG_TOKEN_TYPE);
    expect(body.get("subject_token_type")).toBe(CUBID_ID_TOKEN_TOKEN_TYPE);
    expect(body.get("subject_token")).toBe("id-token");
    expect(body.get("audience")).toBe("https://auth.chaincrew.example");
    expect(body.get("scope")).toBe("accounts:read");
    expect(body.get("client_id")).toBe("cubid_wondrbot");
    expect(body.has("client_secret")).toBe(false);
    expect(headers.authorization).toBe(
      `Basic ${Buffer.from("cubid_wondrbot:s3cret%3Avalue").toString("base64")}`
    );

    const posted = new URLSearchParams(
      String(
        buildCubidIdentityAssertionRequest({
          audience: "cubid_chaincrew",
          clientAuthenticationMethod: "client_secret_post",
          clientId: "cubid_wondrbot",
          clientSecret: "secret",
          subjectToken: "access-token",
          subjectTokenType: CUBID_ACCESS_TOKEN_TOKEN_TYPE,
          tokenEndpoint: discoveryDocument.token_endpoint,
        }).body
      )
    );
    expect(posted.get("client_secret")).toBe("secret");
    expect(posted.get("subject_token_type")).toBe(CUBID_ACCESS_TOKEN_TOKEN_TYPE);

    expect(() =>
      buildCubidIdentityAssertionRequest({
        audience: "cubid_chaincrew",
        clientId: "cubid_wondrbot",
        clientSecret: "secret",
        subjectToken: "token",
        subjectTokenType: "urn:ietf:params:oauth:token-type:saml2" as never,
        tokenEndpoint: discoveryDocument.token_endpoint,
      })
    ).toThrow(CubidAuthError);
  });

  it("requests an identity assertion and surfaces the consent_required resource", async () => {
    const response = await requestCubidIdentityAssertion({
      audience: "cubid_chaincrew",
      clientId: "cubid_wondrbot",
      clientSecret: "secret",
      fetch: vi.fn(async () =>
        new Response(
          JSON.stringify({
            access_token: "assertion-jwt",
            expires_in: 300,
            issued_token_type: CUBID_ID_JAG_TOKEN_TYPE,
            scope: "accounts:read",
            token_type: "N_A",
          }),
          { headers: { "content-type": "application/json" }, status: 200 }
        )
      ),
      subjectToken: "id-token",
      tokenEndpoint: discoveryDocument.token_endpoint,
    });

    expect(response.assertion).toBe("assertion-jwt");
    expect(response.issuedTokenType).toBe(CUBID_ID_JAG_TOKEN_TYPE);
    expect(response.tokenType).toBe("N_A");
    expect(response.expiresIn).toBe(300);
    expect(response.scope).toEqual(["accounts:read"]);

    const consentError = await requestCubidIdentityAssertion({
      audience: "cubid_chaincrew",
      clientId: "cubid_wondrbot",
      clientSecret: "secret",
      fetch: vi.fn(async () =>
        new Response(
          JSON.stringify({
            error: "consent_required",
            error_description:
              "The person has not authorized WondrBot to act in ChainCrew. Send them through the authorization endpoint with resource=urn:cubid:client:cubid_chaincrew.",
          }),
          { headers: { "content-type": "application/json" }, status: 403 }
        )
      ),
      subjectToken: "id-token",
      tokenEndpoint: discoveryDocument.token_endpoint,
    }).catch((error: unknown) => error);

    expect(isCubidCrossAppConsentRequired(consentError)).toBe(true);
    expect((consentError as CubidAuthError).status).toBe(403);
    expect(getCubidCrossAppConsentResource(consentError)).toBe("urn:cubid:client:cubid_chaincrew");
    expect(getCubidCrossAppConsentResource(new Error("other"))).toBeNull();

    await expect(
      requestCubidIdentityAssertion({
        audience: "cubid_chaincrew",
        clientId: "cubid_wondrbot",
        clientSecret: "secret",
        fetch: vi.fn(async () =>
          new Response(
            JSON.stringify({ access_token: "x", issued_token_type: CUBID_ACCESS_TOKEN_TOKEN_TYPE, token_type: "Bearer" }),
            { headers: { "content-type": "application/json" }, status: 200 }
          )
        ),
        subjectToken: "id-token",
        tokenEndpoint: discoveryDocument.token_endpoint,
      })
    ).rejects.toMatchObject({ code: "unexpected_issued_token_type" });
  });

  it("builds the JWT bearer grant that redeems an assertion at the resource app", () => {
    const prepared = buildCubidJwtBearerGrantRequest({
      assertion: "assertion-jwt",
      clientId: "wondrbot-at-chaincrew",
      clientSecret: "chaincrew-secret",
      scope: "accounts:read",
      tokenEndpoint: "https://auth.chaincrew.example/token",
    });
    const body = new URLSearchParams(String(prepared.body));

    expect(prepared.url).toBe("https://auth.chaincrew.example/token");
    expect(body.get("grant_type")).toBe(CUBID_JWT_BEARER_GRANT_TYPE);
    expect(body.get("assertion")).toBe("assertion-jwt");
    expect(body.get("scope")).toBe("accounts:read");
    expect((prepared.init.headers as Record<string, string>).authorization).toMatch(/^Basic /u);

    const publicBody = new URLSearchParams(
      String(buildCubidJwtBearerGrantRequest({ assertion: "a", clientId: "c", tokenEndpoint: "https://auth.chaincrew.example/token" }).body)
    );
    expect(publicBody.get("client_id")).toBe("c");
    expect(publicBody.has("client_secret")).toBe(false);
  });

  it("validates an identity assertion for the resource app it is addressed to", async () => {
    const nowSeconds = Math.floor(Date.now() / 1000);
    const claims = {
      acr: "urn:cubid:acr:passkey",
      amr: ["passkey"],
      aud: "https://auth.chaincrew.example",
      auth_time: nowSeconds - 30,
      client_id: "cubid_wondrbot",
      exp: nowSeconds + 300,
      iat: nowSeconds,
      iss: issuer,
      jti: "idjag_1",
      scope: "accounts:read",
      sub: "chaincrew-alice",
    };
    const { fetchJwks, token } = await createSignedJwt({ typ: CUBID_ID_JAG_JWT_TYPE }, claims);

    expect(decodeCubidIdentityAssertionClaims(token).sub).toBe("chaincrew-alice");

    await expect(
      validateCubidIdentityAssertion({
        acceptedClientIds: ["cubid_wondrbot"],
        assertion: token,
        audience: "https://auth.chaincrew.example",
        discoveryDocument,
        fetch: fetchJwks,
        nowSeconds,
      })
    ).resolves.toMatchObject({ client_id: "cubid_wondrbot", sub: "chaincrew-alice" });
    expect(fetchJwks).toHaveBeenCalledWith(`${issuer}/jwks`, expect.objectContaining({ method: "GET" }));

    await expect(
      validateCubidIdentityAssertion({ assertion: token, audience: "https://auth.friendr.example", discoveryDocument, fetch: fetchJwks, nowSeconds })
    ).rejects.toMatchObject({ code: "invalid_audience" });
    await expect(
      validateCubidIdentityAssertion({ acceptedClientIds: ["cubid_other"], assertion: token, audience: claims.aud, discoveryDocument, fetch: fetchJwks, nowSeconds })
    ).rejects.toMatchObject({ code: "unaccepted_client_id" });
    await expect(
      validateCubidIdentityAssertion({ assertion: token, audience: claims.aud, discoveryDocument, fetch: fetchJwks, nowSeconds: nowSeconds + 600 })
    ).rejects.toMatchObject({ code: "expired_identity_assertion" });

    const idTokenLookalike = await createSignedJwt({ typ: "JWT" }, claims);
    await expect(
      validateCubidIdentityAssertion({ assertion: idTokenLookalike.token, audience: claims.aud, discoveryDocument, fetch: idTokenLookalike.fetchJwks, nowSeconds })
    ).rejects.toMatchObject({ code: "invalid_identity_assertion_type" });

    const tampered = `${token.slice(0, -4)}AAAA`;
    await expect(
      validateCubidIdentityAssertion({ assertion: tampered, audience: claims.aud, discoveryDocument, fetch: fetchJwks, nowSeconds })
    ).rejects.toMatchObject({ code: "invalid_identity_assertion_signature" });
  });

  it("validates Security Event Tokens addressed to this client", async () => {
    const nowSeconds = Math.floor(Date.now() / 1000);
    const subject = { format: "iss_sub", iss: issuer, sub: "chaincrew-alice" };
    const claims = {
      aud: "cubid_chaincrew",
      events: {
        [CUBID_SECURITY_EVENT_TYPES.crossAppConsentRevoked]: {
          reason: "user_withdrew_consent",
          requesting_client_id: "cubid_wondrbot",
          subject,
        },
      },
      iat: nowSeconds - 5,
      iss: issuer,
      jti: "evt_1",
      sub_id: subject,
    };
    const { fetchJwks, token } = await createSignedJwt({ typ: CUBID_SECURITY_EVENT_JWT_TYPE }, claims);

    const decoded = decodeCubidSecurityEventToken(token);
    expect(decoded.eventType).toBe(CUBID_SECURITY_EVENT_TYPES.crossAppConsentRevoked);
    expect(isCubidSecurityEventType(decoded.eventType)).toBe(true);

    const event = await validateCubidSecurityEventToken({
      clientId: "cubid_chaincrew",
      discoveryDocument,
      fetch: fetchJwks,
      maxAgeSeconds: 600,
      nowSeconds,
      token,
    });
    expect(event.subject).toEqual(subject);
    expect(event.payload).toEqual({ reason: "user_withdrew_consent", requesting_client_id: "cubid_wondrbot" });
    expect(event.jti).toBe("evt_1");
    expect(event.audience).toBe("cubid_chaincrew");

    await expect(
      validateCubidSecurityEventToken({ clientId: "cubid_wondrbot", discoveryDocument, fetch: fetchJwks, nowSeconds, token })
    ).rejects.toMatchObject({ code: "invalid_audience" });
    await expect(
      validateCubidSecurityEventToken({ clientId: "cubid_chaincrew", discoveryDocument, fetch: fetchJwks, maxAgeSeconds: 1, nowSeconds, token })
    ).rejects.toMatchObject({ code: "stale_security_event_token" });

    const assertionAsEvent = await createSignedJwt({ typ: CUBID_ID_JAG_JWT_TYPE }, claims);
    await expect(
      validateCubidSecurityEventToken({ clientId: "cubid_chaincrew", discoveryDocument, fetch: assertionAsEvent.fetchJwks, nowSeconds, token: assertionAsEvent.token })
    ).rejects.toMatchObject({ code: "invalid_security_event_token_type" });

    const twoEvents = await createSignedJwt(
      { typ: CUBID_SECURITY_EVENT_JWT_TYPE },
      { ...claims, events: { ...claims.events, [CUBID_SECURITY_EVENT_TYPES.accountPurged]: {} } }
    );
    await expect(
      validateCubidSecurityEventToken({ clientId: "cubid_chaincrew", discoveryDocument, fetch: twoEvents.fetchJwks, nowSeconds, token: twoEvents.token })
    ).rejects.toMatchObject({ code: "invalid_security_event" });
  });
});
