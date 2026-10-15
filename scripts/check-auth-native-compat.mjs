import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { Buffer as NodeBuffer } from "node:buffer";

// Dependency-free synthetic SDK smoke (Node 24+). No network or user credentials.
// Import production source only after removing browser/Node convenience globals.
const issuer = "https://id.cubid.me";
const clientId = "synthetic-native-client";
const redirectUri = "cubidexample://auth/callback";
const transactionNonce = NodeBuffer.from(webcrypto.getRandomValues(new Uint8Array(32))).toString("base64url");
const claims = { iss: issuer, aud: clientId, sub: "synthetic-pairwise-subject", nonce: transactionNonce, exp: Math.floor(Date.now() / 1000) + 300 };
const keys = await webcrypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", hash: "SHA-256", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) }, true, ["sign", "verify"]);
const jwk = await webcrypto.subtle.exportKey("jwk", keys.publicKey);
const encoded = `${NodeBuffer.from(JSON.stringify({ alg: "RS256", kid: "synthetic" })).toString("base64url")}.${NodeBuffer.from(JSON.stringify(claims)).toString("base64url")}`;
const signature = await webcrypto.subtle.sign("RSASSA-PKCS1-v1_5", keys.privateKey, NodeBuffer.from(encoded));
const idToken = `${encoded}.${NodeBuffer.from(signature).toString("base64url")}`;
const invalidSignature = new Uint8Array(signature.slice(0));
invalidSignature[0] ^= 1;
const invalidIdToken = `${encoded}.${NodeBuffer.from(invalidSignature).toString("base64url")}`;
const discovery = { issuer, authorization_endpoint: `${issuer}/authorize`, token_endpoint: `${issuer}/token`, jwks_uri: `${issuer}/jwks`, userinfo_endpoint: `${issuer}/userinfo`, cubid_federation_contract_version: "1", cubid_provider_hint_parameter: "cubid_provider", cubid_provider_hint_values_supported: ["google", "github", "apple", "passkey"] };
let exchanges = 0;
const fetch = async (input, init) => {
  const url = String(input);
  let payload;
  if (url.endsWith("openid-configuration")) payload = discovery;
  else if (url.endsWith("/jwks")) payload = { keys: [{ ...jwk, kid: "synthetic", alg: "RS256", use: "sig" }] };
  else if (url.endsWith("/userinfo")) payload = { sub: claims.sub };
  else if (url.endsWith("/token")) {
    exchanges += 1;
    const body = new URLSearchParams(init.body);
    assert.equal(body.get("redirect_uri"), redirectUri);
    assert.equal(body.get("client_id"), clientId);
    assert.equal(body.get("grant_type"), "authorization_code");
    assert.equal(body.has("client_secret"), false);
    payload = { access_token: "synthetic-access", token_type: "Bearer", expires_in: 300, id_token: idToken, scope: "openid email profile" };
  } else throw new Error("Unexpected synthetic endpoint");
  // A host Fetch adapter; avoid depending on Node Fetch's internal encoders.
  return { ok: true, status: 200, json: async () => payload };
};
const masked = ["crypto", "Buffer", "btoa", "atob", "TextEncoder", "TextDecoder", "window", "document", "localStorage"];
const descriptors = new Map(masked.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
try {
  for (const key of masked) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value: undefined });
  const auth = await import(process.argv.includes("--built") ? "../packages/auth/dist/index.mjs" : "../packages/auth/src/index.ts");
  const metadata = await auth.fetchCubidOidcDiscoveryDocument({ issuer, fetch });
  const pkce = await auth.createCubidPkcePair({ crypto: webcrypto });
  const state = auth.createCubidAuthState(32, webcrypto);
  const nonce = transactionNonce;
  assert.notEqual(state, auth.createCubidAuthNonce(32, webcrypto));
  const base = { authorizationEndpoint: metadata.authorization_endpoint, clientId, redirectUri, state, nonce, codeChallenge: pkce.codeChallenge };
  assert.equal(new URL(auth.buildCubidAuthorizationUrl(base)).searchParams.has("cubid_provider"), false);
  for (const provider of auth.CUBID_AUTH_PROVIDERS) {
    const url = new URL(auth.buildCubidAuthorizationUrl({ ...base, provider, requirePasskey: true, prompt: "login", maxAge: 0 }));
    assert.equal(url.origin, issuer);
    assert.deepEqual(url.searchParams.getAll("cubid_provider"), [provider]);
    assert.equal(url.searchParams.get("acr_values"), "urn:cubid:acr:passkey");
    assert.equal(url.searchParams.get("prompt"), "login");
    assert.equal(url.searchParams.get("max_age"), "0");
    assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  }
  for (const provider of ["", "other", " google", "google github", ["google", "apple"]]) assert.throws(() => auth.buildCubidAuthorizationUrl({ ...base, provider }), { code: "invalid_provider" });
  assert.throws(() => auth.buildCubidAuthorizationUrl({ ...base, provider: "google", extraParams: { cubid_provider: "google" } }), { code: "invalid_provider" });
  assert.equal(await auth.createCubidPkceCodeChallenge("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk", webcrypto), "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM");
  const callback = auth.parseCubidAuthorizationCallback(`${redirectUri}?code=synthetic-code&state=${state}`);
  assert.equal(callback.kind, "success");
  auth.assertCubidAuthorizationState(state, callback);
  assert.throws(() => auth.parseCubidAuthorizationCallback(`${redirectUri}?code=a&state=x&state=y`), { code: "invalid_callback" });
  const tokenResponse = await auth.exchangeCubidAuthorizationCode({ clientId, redirectUri, tokenEndpoint: metadata.token_endpoint, code: callback.code, codeVerifier: pkce.codeVerifier, fetch });
  const idTokenClaims = await auth.validateCubidIdToken({ clientId, discoveryDocument: metadata, idToken, expectedNonce: nonce, crypto: webcrypto, fetch });
  assert.equal(idTokenClaims.nonce, nonce);
  await assert.rejects(auth.validateCubidIdToken({ clientId, discoveryDocument: metadata, idToken, expectedNonce: "mismatched-transaction", crypto: webcrypto, fetch }), { code: "invalid_nonce" });
  await assert.rejects(auth.validateCubidIdToken({ clientId, discoveryDocument: metadata, idToken: invalidIdToken, crypto: webcrypto, fetch }), { code: "invalid_id_token_signature" });
  const userInfo = await auth.fetchCubidUserInfo({ accessToken: tokenResponse.accessToken, userInfoEndpoint: metadata.userinfo_endpoint, fetch });
  const session = auth.createCubidAuthSession({ clientId, issuer, tokenResponse, idTokenClaims, userInfo });
  assert.equal(session.subject, claims.sub);
  assert.equal(session.userInfo.email, undefined);
  assert.equal(session.userInfo.email_verified, undefined);
  assert.throws(() => auth.createCubidAuthSession({ clientId, issuer, tokenResponse, idTokenClaims, userInfo: { sub: "mismatched" } }), { code: "invalid_userinfo_subject" });
  assert.equal(exchanges, 1);
  // Run fresh step-up through the same source/emitted package with all convenience
  // globals still masked. Only synthetic issuer responses and locally signed keys.
  const stepUpSession = Object.freeze({ issuer, clientId, subject: claims.sub });
  const stepUpEpoch = Math.floor(Date.now() / 1000);
  let stepUpNonce;
  const stepUpFetch = async (input) => {
    if (String(input).endsWith("/jwks")) return { ok: true, status: 200, json: async () => ({ keys: [{ ...jwk, kid: "synthetic", alg: "RS256", use: "sig" }] }) };
    assert.equal(String(input), discovery.token_endpoint);
    const stepUpClaims = { ...claims, iat: stepUpEpoch, auth_time: stepUpEpoch, nonce: stepUpNonce, acr: "urn:cubid:acr:passkey", amr: ["passkey"] };
    const data = `${NodeBuffer.from(JSON.stringify({ alg: "RS256", kid: "synthetic" })).toString("base64url")}.${NodeBuffer.from(JSON.stringify(stepUpClaims)).toString("base64url")}`;
    const proof = await webcrypto.subtle.sign("RSASSA-PKCS1-v1_5", keys.privateKey, NodeBuffer.from(data));
    return { ok: true, status: 200, json: async () => ({ access_token: "synthetic-unused", token_type: "Bearer", id_token: `${data}.${NodeBuffer.from(proof).toString("base64url")}` }) };
  };
  const fresh = await auth.reauthenticateCubidSession({
    session: stepUpSession, discoveryDocument: discovery, redirectUri, crypto: webcrypto,
    nowSeconds: stepUpEpoch, fetch: stepUpFetch,
    openAuthorizationSession: async (url) => {
      const params = new URL(url).searchParams;
      assert.equal(params.get("prompt"), "login");
      assert.equal(params.get("scope"), "openid");
      stepUpNonce = params.get("nonce");
      return `${redirectUri}?code=synthetic-step-up&state=${params.get("state")}`;
    },
  });
  assert.equal(fresh.status, "authenticated");
  assert.equal(fresh.subject, claims.sub);
  assert.equal(Object.hasOwn(fresh, "accessToken"), false);
  assert.deepEqual(await auth.reauthenticateCubidSession({ session: stepUpSession, discoveryDocument: discovery, redirectUri, crypto: webcrypto, openAuthorizationSession: async () => null }), { status: "cancelled" });
} finally {
  for (const [key, descriptor] of descriptors) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
}
console.log("PASS: synthetic native Cubid federation, PKCE/signature binding, omitted claims, provider-hint compatibility and fresh step-up. No hosted login was exercised.");
