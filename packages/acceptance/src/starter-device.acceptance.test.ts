import { describe, expect, it } from "vitest";
import { buildCubidAuthorizationUrl, createCubidAuthNonce, createCubidAuthState, createCubidPkcePair } from "@cubid/auth";
import { checkStarterDeviceReadiness } from "../../../examples/starter-device/preflight.mjs";

const config = {
  origin: "https://starter.dev.example",
  issuer: "https://identity.dev.example/oidc",
  clientId: "synthetic-public-client",
};
const authorizationEndpoint = `${config.issuer}/oauth/authorize`;
type Mutation = (url: URL, response: Response) => Response;

function fixture(mutate: Mutation = (_url, response) => response, endpoint = authorizationEndpoint) {
  const calls: Array<{ url: URL; init?: RequestInit }> = [];
  const fetchImpl = async (input: string | URL, init?: RequestInit) => {
    const url = new URL(String(input));
    calls.push({ url, init });
    let response: Response;
    if (url.pathname.endsWith("openid-configuration")) {
      response = Response.json({ issuer: config.issuer, authorization_endpoint: endpoint });
    } else if (url.pathname.endsWith("/session")) {
      response = Response.json({ authenticated: false, status: "not_signed_in", trace: [] });
    } else {
      // Exercise the reviewed SDK builder, including the existing passkey ACR.
      const pkce = await createCubidPkcePair();
      const authorization = buildCubidAuthorizationUrl({
        authorizationEndpoint: endpoint, clientId: config.clientId, scope: ["openid"],
        redirectUri: `${config.origin}/api/cubid/siwc/callback`,
        codeChallenge: pkce.codeChallenge, codeChallengeMethod: pkce.codeChallengeMethod,
        nonce: createCubidAuthNonce(), state: createCubidAuthState(), requirePasskey: true,
        prompt: url.searchParams.get("prompt") ?? undefined,
        maxAge: url.searchParams.has("max_age") ? 0 : undefined,
      });
      const headers = new Headers({ location: authorization });
      for (const name of ["cubid_siwc_txn", "cubid_siwc_return_to", "cubid_siwc_trace"]) {
        headers.append("set-cookie", `${name}=synthetic-${calls.length}; HttpOnly; Secure; SameSite=Lax; Path=/`);
      }
      response = new Response(null, { status: 307, headers });
    }
    return mutate(url, response);
  };
  return { calls, fetchImpl };
}

function changeAuthorization(change: (url: URL) => void): Mutation {
  return (url, response) => {
    if (url.pathname.endsWith("/start")) {
      const target = new URL(response.headers.get("location")!);
      change(target);
      response.headers.set("location", target.href);
    }
    return response;
  };
}

describe("Starter physical-browser preflight", () => {
  it("checks discovery and the existing SDK passkey launches without following authorization or forwarding cookies", async () => {
    const { calls, fetchImpl } = fixture();
    const result = await checkStarterDeviceReadiness({ ...config, fetchImpl });
    expect(result.checks).toHaveLength(5);
    expect(result.authenticatedAcceptance).toBe("pending operator device pass");
    expect(calls).toHaveLength(5);
    expect(calls[0]!.url.href).toBe(`${config.issuer}/.well-known/openid-configuration`);
    for (const { init } of calls) {
      expect(init).toMatchObject({ redirect: "manual", credentials: "omit", cache: "no-store" });
      expect(init?.headers).not.toHaveProperty("cookie");
      expect(init?.method).toBeUndefined();
    }
    expect(JSON.stringify(result)).not.toContain(config.clientId);
    expect(JSON.stringify(result)).not.toContain("synthetic");
  });

  it.each([
    { origin: undefined }, { origin: "http://starter.dev.example" },
    { origin: "https://user:password@starter.dev.example" },
    { origin: `${config.origin}/path` }, { issuer: undefined },
    { issuer: "http://identity.dev.example" }, { clientId: "" },
    { scope: ["email"] }, { scope: ["openid", "openid"] },
  ])("rejects incomplete/unsafe candidate configuration before any network call: %j", async (override) => {
    const { calls, fetchImpl } = fixture();
    await expect(checkStarterDeviceReadiness({ ...config, ...override, fetchImpl })).rejects.toThrow();
    expect(calls).toHaveLength(0);
  });

  it.each([
    ["wrong client", (u: URL) => u.searchParams.set("client_id", "other")],
    ["wrong callback", (u: URL) => u.searchParams.set("redirect_uri", "https://other.example/callback")],
    ["duplicate state", (u: URL) => u.searchParams.append("state", "x".repeat(43))],
    ["weak challenge", (u: URL) => u.searchParams.set("code_challenge", "present")],
    ["passkey removed", (u: URL) => u.searchParams.delete("acr_values")],
    ["provider hint", (u: URL) => u.searchParams.set("cubid_provider", "google")],
    ["implicit consent expansion", (u: URL) => u.searchParams.set("scope", "openid email")],
    ["force login ignored", (u: URL) => u.searchParams.delete("prompt")],
    ["wrong endpoint", (u: URL) => { u.pathname = "/other"; }],
  ] as const)("fails a mismatched launch: %s", async (_name, change) => {
    const { fetchImpl } = fixture(changeAuthorization(change));
    await expect(checkStarterDeviceReadiness({ ...config, fetchImpl })).rejects.toThrow("Starter preflight failed:");
  });

  it("checks each transaction cookie rather than accepting attributes on an unrelated cookie", async () => {
    const { fetchImpl } = fixture((url, response) => {
      if (url.pathname.endsWith("/start")) {
        response.headers.delete("set-cookie");
        response.headers.append("set-cookie", "cubid_siwc_txn=synthetic; Path=/");
        response.headers.append("set-cookie", "cubid_siwc_return_to=/; HttpOnly; Secure; SameSite=Lax; Path=/");
        response.headers.append("set-cookie", "cubid_siwc_trace=synthetic; HttpOnly; Secure; SameSite=Lax; Path=/");
      }
      return response;
    });
    await expect(checkStarterDeviceReadiness({ ...config, fetchImpl })).rejects.toThrow("secure cookie attributes");
  });

  it.each(["state", "nonce", "code_challenge"])("rejects reused %s across independent launches", async (key) => {
    let first: string | null = null;
    const { fetchImpl } = fixture(changeAuthorization((url) => {
      first ??= url.searchParams.get(key);
      url.searchParams.set(key, first!);
    }));
    await expect(checkStarterDeviceReadiness({ ...config, fetchImpl })).rejects.toThrow(`fresh ${key}`);
  });

  it("rejects a reused transaction cookie even when URL parameters are fresh", async () => {
    let first: string | undefined;
    const { fetchImpl } = fixture((url, response) => {
      if (url.pathname.endsWith("/start")) {
        const cookies = response.headers.getSetCookie();
        first ??= cookies.find((cookie) => cookie.startsWith("cubid_siwc_txn="));
        response.headers.delete("set-cookie");
        for (const cookie of cookies) response.headers.append("set-cookie",
          cookie.startsWith("cubid_siwc_txn=") ? first! : cookie);
      }
      return response;
    });
    await expect(checkStarterDeviceReadiness({ ...config, fetchImpl })).rejects.toThrow("fresh transaction");
  });

  it.each([32, 42, 44, 64])("rejects an S256 challenge of length %s", async (length) => {
    const { fetchImpl } = fixture(changeAuthorization((url) => url.searchParams.set("code_challenge", "c".repeat(length))));
    await expect(checkStarterDeviceReadiness({ ...config, fetchImpl })).rejects.toThrow("code_challenge presence");
  });

  const fixedQueryEndpoint = `${authorizationEndpoint}?tenant=synthetic&route=one&route=two`;
  it("retains discovered fixed query parameters, including repeated values", async () => {
    const { fetchImpl } = fixture(undefined, fixedQueryEndpoint);
    await expect(checkStarterDeviceReadiness({ ...config, fetchImpl })).resolves.toHaveProperty("checks");
  });

  it.each([
    (url: URL) => url.searchParams.delete("tenant"),
    (url: URL) => url.searchParams.set("tenant", "other"),
    (url: URL) => url.searchParams.set("route", "one"),
    (url: URL) => url.searchParams.append("tenant", "synthetic"),
  ])("rejects dropped, changed or duplicated fixed endpoint query parameters", async (change) => {
    const { fetchImpl } = fixture(changeAuthorization(change), fixedQueryEndpoint);
    await expect(checkStarterDeviceReadiness({ ...config, fetchImpl })).rejects.toThrow("fixed endpoint query");
  });

  it("rejects a different discovered issuer before making app requests", async () => {
    const { calls, fetchImpl } = fixture((_url, response) => response.status === 200
      ? Response.json({ issuer: "https://other.example", authorization_endpoint: authorizationEndpoint }) : response);
    await expect(checkStarterDeviceReadiness({ ...config, fetchImpl })).rejects.toThrow("discovery issuer");
    expect(calls).toHaveLength(1);
  });

  it("reports a fixed network failure without including remote exception content", async () => {
    await expect(checkStarterDeviceReadiness({ ...config, fetchImpl: async () => {
      throw new Error("private protocol material");
    } })).rejects.toThrow(/^Starter preflight failed: request unavailable$/u);
  });
});
