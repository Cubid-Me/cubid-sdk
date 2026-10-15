import { expect, vi } from "vitest";
import { createReferenceBackend } from "../../../../examples/expo-siwc/backend";
import { MemoryReferenceStore } from "../../../../examples/expo-siwc/memory-store";
import { createCubidAuthState, createCubidPkceCodeChallenge } from "../../../../examples/expo-siwc/sdk";

export const issuer = "https://issuer.example.invalid";
export const clientId = "synthetic-native-public-client";
export const redirectUri = "cubidexample://auth/callback";
export const epoch = 2_000_000_000;
const metadata = {
  issuer, authorization_endpoint: `${issuer}/authorize`, token_endpoint: `${issuer}/token`, jwks_uri: `${issuer}/jwks`,
  response_types_supported: ["code"], code_challenge_methods_supported: ["S256"], subject_types_supported: ["pairwise"], token_endpoint_auth_methods_supported: ["none"],
};
let signingKey: CryptoKey;
let jwks: { keys: JsonWebKey[] };
export async function prepareSigningKey() {
  const pair = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
  signingKey = pair.privateKey;
  jwks = { keys: [{ ...await crypto.subtle.exportKey("jwk", pair.publicKey), kid: "synthetic-example-key", alg: "RS256", use: "sig" } as JsonWebKey] };
}
export const advance = (seconds: number) => vi.mocked(Date.now).mockReturnValue((epoch + seconds) * 1000);

export async function fixture(store = new MemoryReferenceStore()) {
  const codes = new Map<string, { request: URL; claims: Record<string, unknown> }>();
  let onToken = async () => {};
  let onJwks = async () => {};
  let discoveryOverrides: Record<string, unknown> = {};
  let alterToken = (value: string) => value;
  const fetch = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    if (String(url) === `${issuer}/.well-known/openid-configuration`) return Response.json({ ...metadata, ...discoveryOverrides });
    if (String(url) === metadata.jwks_uri) { await onJwks(); return Response.json(jwks); }
    if (String(url) !== metadata.token_endpoint) throw new Error("Unexpected synthetic request");
    const body = new URLSearchParams(String(init?.body));
    const code = codes.get(body.get("code") ?? "");
    if (!code) throw new Error("Unknown synthetic code");
    expect(body.get("redirect_uri")).toBe(redirectUri);
    expect(body.get("client_id")).toBe(clientId);
    expect(body.has("client_secret")).toBe(false);
    expect(await createCubidPkceCodeChallenge(body.get("code_verifier")!)).toBe(code.request.searchParams.get("code_challenge"));
    await onToken();
    const header = Buffer.from(JSON.stringify({ alg: "RS256", kid: "synthetic-example-key" })).toString("base64url");
    const payload = Buffer.from(JSON.stringify({ iss: issuer, aud: clientId, sub: "synthetic-pairwise-sub", nonce: code.request.searchParams.get("nonce"), iat: epoch, auth_time: epoch, exp: epoch + 600, acr: "urn:cubid:acr:passkey", amr: ["passkey"], ...code.claims })).toString("base64url");
    const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", signingKey, new TextEncoder().encode(`${header}.${payload}`));
    return Response.json({ access_token: "synthetic-private-access", refresh_token: "synthetic-private-refresh", token_type: "Bearer", expires_in: 600, id_token: alterToken(`${header}.${payload}.${Buffer.from(signature).toString("base64url")}`) });
  });
  const create = (config: Partial<{ clientId: string; redirectUri: string }> = {}) => createReferenceBackend({ issuer, clientId, redirectUri, store, fetch, ...config });
  const backend = await create();
  const deviceVerifier = createCubidAuthState();
  const deviceChallenge = await createCubidPkceCodeChallenge(deviceVerifier);
  const callbackFor = (authorizationUrl: string, claims: Record<string, unknown> = {}) => {
    const request = new URL(authorizationUrl);
    const code = `synthetic-code-${codes.size}`;
    codes.set(code, { request, claims });
    return `${redirectUri}?code=${code}&state=${request.searchParams.get("state")}&iss=${encodeURIComponent(issuer)}`;
  };
  const login = async (claims: Record<string, unknown> = {}) => {
    const request = await backend.startLogin(deviceChallenge);
    const completion = { transactionId: request.transactionId, deviceVerifier, callbackUrl: callbackFor(request.authorizationUrl, claims) };
    const result = await backend.completeLogin(completion);
    if (result.status !== "authenticated") throw new Error("Synthetic login failed");
    return { request, completion, result, credential: result.credential };
  };
  const tokenCalls = () => fetch.mock.calls.filter(([url]) => String(url) === metadata.token_endpoint).length;
  return { backend, create, store, fetch, deviceVerifier, deviceChallenge, callbackFor, login, tokenCalls,
    tokenHook: (hook: () => Promise<void>) => { onToken = hook; }, jwksHook: (hook: () => Promise<void>) => { onJwks = hook; },
    discovery: (overrides: Record<string, unknown>) => { discoveryOverrides = overrides; },
    alterToken: (alter: (value: string) => string) => { alterToken = alter; },
  };
}
