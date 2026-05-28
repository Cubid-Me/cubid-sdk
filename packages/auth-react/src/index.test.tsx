import { StrictMode } from "react";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  CUBID_AUTH_SESSION_STORAGE_KEY,
  serializeCubidAuthSession,
  type CubidAuthStorageLike,
} from "@cubid/auth";

import {
  CUBID_AUTH_TRANSACTION_STORAGE_KEY,
  CubidAuthCallback,
  CubidAuthProvider,
  CubidSignInButton,
  CubidSignOutButton,
  useCubidAuth,
} from "./index";

class MemoryStorage implements CubidAuthStorageLike {
  private readonly map = new Map<string, string>();

  getItem(key: string) {
    return this.map.get(key) ?? null;
  }

  removeItem(key: string) {
    this.map.delete(key);
  }

  setItem(key: string, value: string) {
    this.map.set(key, value);
  }
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

function SessionViewer() {
  const auth = useCubidAuth();

  return (
    <div>
      <span data-testid="status">{auth.status}</span>
      <span data-testid="subject">{auth.session?.subject ?? "none"}</span>
      <span data-testid="email">{auth.session?.userInfo?.email ?? "none"}</span>
    </div>
  );
}

describe("@cubid/auth-react", () => {
  it("launches sign-in from the React provider and stores the PKCE transaction", async () => {
    const storage = new MemoryStorage();
    const navigate = vi.fn();
    const user = userEvent.setup();

    const view = render(
      <CubidAuthProvider
        clientId="clearpass-dashboard"
        fetch={vi.fn(async (input: string | URL | Request) => {
          expect(String(input)).toBe(
            "https://staging-id.cubid.me/.well-known/openid-configuration"
          );

          return new Response(
            JSON.stringify({
              authorization_endpoint: "https://staging-id.cubid.me/oauth2/authorize",
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
        })}
        issuer="https://staging-id.cubid.me"
        redirectUri="https://dashboard.clearpass.app/auth/callback"
        storage={storage}
      >
        <CubidSignInButton
          onLaunched={navigate}
          signInOptions={{ navigate, nonce: "nonce-123", performRedirect: false }}
        />
      </CubidAuthProvider>
    );

    await user.click(
      within(view.container).getByRole("button", { name: "Sign in with Cubid" })
    );

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledTimes(1);
    });
    const launchedUrl = navigate.mock.calls[0]?.[0];
    expect(typeof launchedUrl).toBe("string");
    const parsed = new URL(String(launchedUrl));
    expect(parsed.searchParams.get("client_id")).toBe("clearpass-dashboard");
    expect(parsed.searchParams.get("nonce")).toBe("nonce-123");
    expect(parsed.searchParams.get("acr_values")).toBe(
      "urn:cubid:acr:passkey"
    );

    const storedTransaction = storage.getItem(CUBID_AUTH_TRANSACTION_STORAGE_KEY);
    expect(storedTransaction).toBeTruthy();
    expect(JSON.parse(storedTransaction ?? "{}")).toMatchObject({
      clientId: "clearpass-dashboard",
      issuer: "https://staging-id.cubid.me",
      redirectUri: "https://dashboard.clearpass.app/auth/callback",
    });
  });

  it("handles an authorization callback and creates an authenticated session", async () => {
    const storage = new MemoryStorage();
    const { idToken, jwks } = await createSignedIdToken({
      aud: "clearpass-dashboard",
      email: "developer@clearpass.app",
      exp: Math.floor(Date.now() / 1000) + 3600,
      iss: "https://staging-id.cubid.me",
      name: "ClearPass Dev",
      nonce: "nonce-123",
      sub: "pairwise-user-123",
    });
    storage.setItem(
      CUBID_AUTH_TRANSACTION_STORAGE_KEY,
      JSON.stringify({
        clientId: "clearpass-dashboard",
        codeVerifier: "verifier-123",
        issuer: "https://staging-id.cubid.me",
        nonce: "nonce-123",
        redirectUri: "https://dashboard.clearpass.app/auth/callback",
        scope: ["openid", "email", "profile"],
        state: "state-123",
      })
    );

    const fetchImpl = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      if (String(input).endsWith("/.well-known/openid-configuration")) {
        return new Response(
          JSON.stringify({
            authorization_endpoint: "https://staging-id.cubid.me/oauth2/authorize",
            end_session_endpoint: "https://staging-id.cubid.me/logout",
            issuer: "https://staging-id.cubid.me",
            jwks_uri: "https://staging-id.cubid.me/.well-known/jwks.json",
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
      }

      if (String(input).endsWith("/oauth2/token")) {
        expect(String(init?.body)).toContain("code_verifier=verifier-123");

        return new Response(
          JSON.stringify({
            access_token: "access-token-123",
            expires_in: 3600,
            id_token: idToken,
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
      }

      if (String(input).endsWith("/.well-known/jwks.json")) {
        return new Response(JSON.stringify(jwks), {
          headers: { "content-type": "application/json" },
          status: 200,
        });
      }

      return new Response(
        JSON.stringify({
          email: "developer@clearpass.app",
          email_verified: true,
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
    });

    const view = render(
      <CubidAuthProvider
        clientId="clearpass-dashboard"
        fetch={fetchImpl}
        issuer="https://staging-id.cubid.me"
        redirectUri="https://dashboard.clearpass.app/auth/callback"
        storage={storage}
      >
        <CubidAuthCallback callbackUrl="https://dashboard.clearpass.app/auth/callback?code=oidc-code&state=state-123" />
        <SessionViewer />
      </CubidAuthProvider>
    );

    await waitFor(() => {
      expect(within(view.container).getByTestId("status").textContent).toBe("authenticated");
    });

    expect(within(view.container).getByTestId("subject").textContent).toBe("pairwise-user-123");
    expect(within(view.container).getByTestId("email").textContent).toBe("developer@clearpass.app");
    expect(storage.getItem(CUBID_AUTH_TRANSACTION_STORAGE_KEY)).toBeNull();
    expect(storage.getItem(CUBID_AUTH_SESSION_STORAGE_KEY)).toBeTruthy();
  });

  it("handles the authorization callback only once under React StrictMode", async () => {
    const storage = new MemoryStorage();
    const { idToken, jwks } = await createSignedIdToken({
      aud: "clearpass-dashboard",
      exp: Math.floor(Date.now() / 1000) + 3600,
      iss: "https://staging-id.cubid.me",
      nonce: "nonce-123",
      sub: "pairwise-user-123",
    });
    storage.setItem(
      CUBID_AUTH_TRANSACTION_STORAGE_KEY,
      JSON.stringify({
        clientId: "clearpass-dashboard",
        codeVerifier: "verifier-123",
        issuer: "https://staging-id.cubid.me",
        nonce: "nonce-123",
        redirectUri: "https://dashboard.clearpass.app/auth/callback",
        scope: ["openid", "email", "profile"],
        state: "state-123",
      })
    );

    const fetchImpl = vi.fn(async (input: string | URL | Request) => {
      if (String(input).endsWith("/.well-known/openid-configuration")) {
        return new Response(
          JSON.stringify({
            authorization_endpoint: "https://staging-id.cubid.me/oauth2/authorize",
            issuer: "https://staging-id.cubid.me",
            jwks_uri: "https://staging-id.cubid.me/.well-known/jwks.json",
            token_endpoint: "https://staging-id.cubid.me/oauth2/token",
            token_endpoint_auth_methods_supported: ["none"],
          }),
          {
            headers: { "content-type": "application/json" },
            status: 200,
          }
        );
      }

      if (String(input).endsWith("/.well-known/jwks.json")) {
        return new Response(JSON.stringify(jwks), {
          headers: { "content-type": "application/json" },
          status: 200,
        });
      }

      return new Response(
        JSON.stringify({
          access_token: "access-token-123",
          expires_in: 3600,
          id_token: idToken,
          scope: "openid email profile",
          token_type: "Bearer",
        }),
        {
          headers: { "content-type": "application/json" },
          status: 200,
        }
      );
    });

    render(
      <StrictMode>
        <CubidAuthProvider
          clientId="clearpass-dashboard"
          fetch={fetchImpl}
          issuer="https://staging-id.cubid.me"
          redirectUri="https://dashboard.clearpass.app/auth/callback"
          storage={storage}
        >
          <CubidAuthCallback callbackUrl="https://dashboard.clearpass.app/auth/callback?code=oidc-code&state=state-123" />
          <SessionViewer />
        </CubidAuthProvider>
      </StrictMode>
    );

    await waitFor(() => {
      expect(fetchImpl).toHaveBeenCalledWith(
        "https://staging-id.cubid.me/oauth2/token",
        expect.any(Object)
      );
    });

    const tokenCalls = fetchImpl.mock.calls.filter(([input]) =>
      String(input).endsWith("/oauth2/token")
    );

    expect(tokenCalls).toHaveLength(1);
  });

  it("rejects callback token responses that omit the nonce claim", async () => {
    const storage = new MemoryStorage();
    const { idToken, jwks } = await createSignedIdToken({
      aud: "clearpass-dashboard",
      exp: Math.floor(Date.now() / 1000) + 3600,
      iss: "https://staging-id.cubid.me",
      sub: "pairwise-user-123",
    });
    storage.setItem(
      CUBID_AUTH_TRANSACTION_STORAGE_KEY,
      JSON.stringify({
        clientId: "clearpass-dashboard",
        codeVerifier: "verifier-123",
        issuer: "https://staging-id.cubid.me",
        nonce: "nonce-123",
        redirectUri: "https://dashboard.clearpass.app/auth/callback",
        scope: ["openid", "email", "profile"],
        state: "state-123",
      })
    );

    const onError = vi.fn();

    render(
      <CubidAuthProvider
        clientId="clearpass-dashboard"
        fetch={vi.fn(async (input: string | URL | Request) => {
          if (String(input).endsWith("/.well-known/openid-configuration")) {
            return new Response(
              JSON.stringify({
                authorization_endpoint: "https://staging-id.cubid.me/oauth2/authorize",
                issuer: "https://staging-id.cubid.me",
                jwks_uri: "https://staging-id.cubid.me/.well-known/jwks.json",
                token_endpoint: "https://staging-id.cubid.me/oauth2/token",
                token_endpoint_auth_methods_supported: ["none"],
              }),
              {
                headers: { "content-type": "application/json" },
                status: 200,
              }
            );
          }

          if (String(input).endsWith("/.well-known/jwks.json")) {
            return new Response(JSON.stringify(jwks), {
              headers: { "content-type": "application/json" },
              status: 200,
            });
          }

          return new Response(
            JSON.stringify({
              access_token: "access-token-123",
              expires_in: 3600,
              id_token: idToken,
              scope: "openid email profile",
              token_type: "Bearer",
            }),
            {
              headers: { "content-type": "application/json" },
              status: 200,
            }
          );
        })}
        issuer="https://staging-id.cubid.me"
        redirectUri="https://dashboard.clearpass.app/auth/callback"
        storage={storage}
      >
        <CubidAuthCallback
          callbackUrl="https://dashboard.clearpass.app/auth/callback?code=oidc-code&state=state-123"
          onError={onError}
        />
      </CubidAuthProvider>
    );

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: "missing_nonce",
        })
      );
    });
  });

  it("restores persisted sessions and clears them through the sign-out button", async () => {
    const storage = new MemoryStorage();
    storage.setItem(
      CUBID_AUTH_SESSION_STORAGE_KEY,
      serializeCubidAuthSession({
        accessToken: "access-token-123",
        clientId: "clearpass-dashboard",
        expiresAt: Date.now() + 60_000,
        idToken: "id-token-123",
        idTokenClaims: {
          exp: Math.floor(Date.now() / 1000) + 60,
          sub: "pairwise-user-123",
        },
        issuedAt: Date.now(),
        issuer: "https://staging-id.cubid.me",
        refreshToken: null,
        scope: ["openid", "email", "profile"],
        subject: "pairwise-user-123",
        tokenType: "Bearer",
        userInfo: {
          email: "developer@clearpass.app",
          sub: "pairwise-user-123",
        },
      })
    );

    const navigate = vi.fn();
    const user = userEvent.setup();

    const view = render(
      <CubidAuthProvider
        clientId="clearpass-dashboard"
        discoveryDocument={{
          authorization_endpoint: "https://staging-id.cubid.me/oauth2/authorize",
          end_session_endpoint: "https://staging-id.cubid.me/logout",
          issuer: "https://staging-id.cubid.me",
          token_endpoint: "https://staging-id.cubid.me/oauth2/token",
        }}
        issuer="https://staging-id.cubid.me"
        postLogoutRedirectUri="https://dashboard.clearpass.app/"
        redirectUri="https://dashboard.clearpass.app/auth/callback"
        storage={storage}
      >
        <SessionViewer />
        <CubidSignOutButton
          logoutOptions={{ navigate, performRedirect: false }}
          onLoggedOut={navigate}
        />
      </CubidAuthProvider>
    );

    await waitFor(() => {
      expect(within(view.container).getByTestId("status").textContent).toBe("authenticated");
    });

    await user.click(within(view.container).getByRole("button", { name: "Sign out" }));

    expect(navigate).toHaveBeenCalledWith(
      "https://staging-id.cubid.me/logout?id_token_hint=id-token-123&post_logout_redirect_uri=https%3A%2F%2Fdashboard.clearpass.app%2F"
    );
    expect(within(view.container).getByTestId("status").textContent).toBe("signed_out");
    expect(storage.getItem(CUBID_AUTH_SESSION_STORAGE_KEY)).toBeNull();
  });

  it("sets an error state when logout discovery fails", async () => {
    const storage = new MemoryStorage();
    storage.setItem(
      CUBID_AUTH_SESSION_STORAGE_KEY,
      serializeCubidAuthSession({
        accessToken: "access-token-123",
        clientId: "clearpass-dashboard",
        expiresAt: Date.now() + 60_000,
        idToken: "id-token-123",
        idTokenClaims: {
          exp: Math.floor(Date.now() / 1000) + 60,
          sub: "pairwise-user-123",
        },
        issuedAt: Date.now(),
        issuer: "https://staging-id.cubid.me",
        refreshToken: null,
        scope: ["openid", "email", "profile"],
        subject: "pairwise-user-123",
        tokenType: "Bearer",
        userInfo: null,
      })
    );
    const onError = vi.fn();
    const user = userEvent.setup();

    const view = render(
      <CubidAuthProvider
        clientId="clearpass-dashboard"
        fetch={vi.fn(async () => {
          throw new Error("discovery unavailable");
        })}
        issuer="https://staging-id.cubid.me"
        redirectUri="https://dashboard.clearpass.app/auth/callback"
        storage={storage}
      >
        <SessionViewer />
        <CubidSignOutButton onError={onError} />
      </CubidAuthProvider>
    );

    await waitFor(() => {
      expect(within(view.container).getByTestId("status").textContent).toBe("authenticated");
    });

    await user.click(within(view.container).getByRole("button", { name: "Sign out" }));

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
      expect(within(view.container).getByTestId("status").textContent).toBe("error");
    });
    expect(storage.getItem(CUBID_AUTH_SESSION_STORAGE_KEY)).toBeNull();
  });
});
