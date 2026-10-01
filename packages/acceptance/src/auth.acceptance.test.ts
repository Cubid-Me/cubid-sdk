import { describe, expect, it } from "vitest";

import {
  buildCubidAuthorizationUrl,
  buildCubidCrossAppResource,
  buildCubidIdentityAssertionRequest,
  checkCubidIdentityIssuerReadiness,
  createCubidAuthNonce,
  createCubidAuthState,
  CUBID_TOKEN_EXCHANGE_GRANT_TYPE,
} from "@cubid/auth";

describe("@cubid/acceptance auth consumer flow", () => {
  it("builds a browser-safe Sign in with Cubid URL from the public auth entrypoint", () => {
    const url = buildCubidAuthorizationUrl({
      authorizationEndpoint: "https://id.cubid.me/oauth2/authorize",
      clientId: "clearpass-dashboard",
      codeChallenge: "challenge-123",
      nonce: createCubidAuthNonce(16),
      redirectUri: "https://dashboard.clearpass.app/callback",
      state: createCubidAuthState(16),
    });

    const parsed = new URL(url);

    expect(parsed.origin).toBe("https://id.cubid.me");
    expect(parsed.searchParams.get("client_id")).toBe("clearpass-dashboard");
    expect(parsed.searchParams.get("response_type")).toBe("code");
    expect(parsed.searchParams.get("scope")).toBe("openid email profile");
  });

  it("checks issuer readiness from the public auth entrypoint without staging fallback", async () => {
    const fetchImpl = async (input: string | URL | Request) => {
      const url = String(input);

      if (url.endsWith("/.well-known/openid-configuration")) {
        return new Response(
          JSON.stringify({
            authorization_endpoint: "https://id.cubid.me/oauth2/authorize",
            code_challenge_methods_supported: ["S256"],
            issuer: "https://id.cubid.me",
            jwks_uri: "https://id.cubid.me/.well-known/jwks.json",
            response_types_supported: ["code"],
            subject_types_supported: ["pairwise"],
            token_endpoint: "https://id.cubid.me/oauth2/token",
          }),
          {
            headers: { "content-type": "application/json" },
            status: 200,
          }
        );
      }

      return new Response(
        JSON.stringify({
          keys: [{ alg: "RS256", kid: "acceptance-key", kty: "RSA", use: "sig" }],
        }),
        {
          headers: { "content-type": "application/json" },
          status: 200,
        }
      );
    };

    await expect(
      checkCubidIdentityIssuerReadiness({ fetch: fetchImpl })
    ).resolves.toMatchObject({
      environment: "production",
      issuer: "https://id.cubid.me",
      supportsPkceS256: true,
    });

    await expect(
      checkCubidIdentityIssuerReadiness({
        fetch: fetchImpl,
        issuer: "https://staging-id.cubid.me",
      })
    ).rejects.toMatchObject({
      code: "issuer_environment_mismatch",
    });
  });

  it("requests cross-app access from the public auth entrypoint", () => {
    const url = new URL(
      buildCubidAuthorizationUrl({
        authorizationEndpoint: "https://id.cubid.me/authorize",
        clientId: "cubid_wondrbot",
        codeChallenge: "challenge-123",
        redirectUri: "https://wondrbot.example/callback",
        resources: [buildCubidCrossAppResource("cubid_chaincrew")],
        state: createCubidAuthState(16),
      })
    );
    expect(url.searchParams.getAll("resource")).toEqual(["urn:cubid:client:cubid_chaincrew"]);

    const prepared = buildCubidIdentityAssertionRequest({
      audience: "urn:cubid:client:cubid_chaincrew",
      clientId: "cubid_wondrbot",
      clientSecret: "secret",
      subjectToken: "id-token",
      tokenEndpoint: "https://id.cubid.me/token",
    });
    expect(new URLSearchParams(String(prepared.body)).get("grant_type")).toBe(CUBID_TOKEN_EXCHANGE_GRANT_TYPE);
  });
});
