import {
  assertCubidAuthorizationCallbackDestination, buildCubidAuthorizationUrl,
  completeCubidReauthentication, createCubidAuthNonce, createCubidAuthState,
  createCubidPkceCodeChallenge, createCubidPkcePair, createCubidReauthenticationRequest,
  exchangeCubidAuthorizationCode, fetchCubidOidcDiscoveryDocument,
  getCubidAuthAssurance, parseCubidAuthorizationCallback, validateCubidIdToken,
} from "./sdk";
import type { CubidAuthCrypto, CubidAuthFetch } from "./sdk";
import type { AppSession, ReferenceStore } from "./model";
import { ReferenceError } from "./model";

interface Options {
  issuer: string;
  clientId: string;
  redirectUri: string;
  store: ReferenceStore;
  /** Explicit transport: synthetic in this slice. Never defaults to global fetch. */
  fetch: CubidAuthFetch;
  crypto?: CubidAuthCrypto;
}
interface Completion { transactionId: string; deviceVerifier: string; callbackUrl: string }
const TRANSACTION_SECONDS = 300;
const DEVELOPMENT_SESSION_SECONDS = 900; // Example policy only, not SDK49's production decision.
const opaque = (value: string) => {
  if (typeof value !== "string" || !/^[A-Za-z0-9_-]{43}$/u.test(value)) throw new ReferenceError("invalid_request");
  return value;
};

/** Transport-neutral server controller. No HTTP listener, cookies, client registration or deployment. */
export async function createReferenceBackend(options: Options) {
  const { issuer, clientId, redirectUri, store, fetch, crypto } = options;
  const now = () => {
    const value = Math.floor(Date.now() / 1000);
    if (!Number.isSafeInteger(value) || value < 0 || value > Number.MAX_SAFE_INTEGER - DEVELOPMENT_SESSION_SECONDS) throw new ReferenceError("invalid_request");
    return value;
  };
  const issuerUrl = new URL(issuer);
  const callback = new URL(redirectUri);
  if (issuerUrl.protocol !== "https:" || issuerUrl.username || issuerUrl.password || issuerUrl.search || issuerUrl.hash ||
      !clientId.trim() || ["http:", "https:", "javascript:", "data:", "file:"].includes(callback.protocol) ||
      callback.username || callback.password || callback.search || callback.hash) throw new ReferenceError("invalid_request");
  assertCubidAuthorizationCallbackDestination(redirectUri, redirectUri);
  const discovery = await fetchCubidOidcDiscoveryDocument({ issuer, fetch });
  if (discovery.issuer !== issuer || !discovery.jwks_uri ||
      !discovery.response_types_supported?.includes("code") || !discovery.code_challenge_methods_supported?.includes("S256") ||
      !discovery.subject_types_supported?.includes("pairwise") || !discovery.token_endpoint_auth_methods_supported?.includes("none")) throw new ReferenceError("invalid_request");
  for (const endpoint of [discovery.authorization_endpoint, discovery.token_endpoint, discovery.jwks_uri]) {
    const url = new URL(endpoint);
    if (url.origin !== issuerUrl.origin || url.protocol !== "https:" || url.username || url.password || url.hash || url.search) throw new ReferenceError("invalid_request");
  }
  const random = () => createCubidAuthState(32, crypto);
  const hash = (value: string) => createCubidPkceCodeChallenge(opaque(value), crypto);
  const configuredBinding = { issuer, clientId, redirectUri };
  const authenticate = async (credential: string): Promise<AppSession> => {
    const session = await store.getSession(await hash(credential), now());
    if (!session || session.issuer !== issuer || session.clientId !== clientId) throw new ReferenceError("unauthorized");
    return session;
  };
  const assertActive = async (session: AppSession) => {
    const current = await store.getSession(session.key, now());
    if (!current || current.subject !== session.subject || current.issuer !== issuer || current.clientId !== clientId) throw new ReferenceError("unauthorized");
  };
  const binding = async (input: Completion) => {
    opaque(input.transactionId);
    if (typeof input.callbackUrl !== "string" || input.callbackUrl.length > 8192) throw new ReferenceError("invalid_request");
    return hash(input.deviceVerifier);
  };
  // Never export CubidAuthError.raw/cause (may include tokens/claims/callbacks) across a future API boundary.
  const protectedCompletion = async <T>(run: () => Promise<T>): Promise<T> => {
    try { return await run(); } catch (error) {
      if (error instanceof ReferenceError) throw error;
      throw new ReferenceError("authentication_failed");
    }
  };
  return {
    async startLogin(deviceChallenge: string) {
      opaque(deviceChallenge);
      const requestedAt = now();
      const pkce = await createCubidPkcePair({ crypto });
      const transaction = {
        ...configuredBinding, kind: "login" as const, sessionKey: null, id: random(), deviceChallenge,
        nonce: createCubidAuthNonce(32, crypto), codeVerifier: pkce.codeVerifier,
        requestedAt, expiresAt: requestedAt + TRANSACTION_SECONDS,
      };
      const authorizationUrl = buildCubidAuthorizationUrl({
        authorizationEndpoint: discovery.authorization_endpoint, clientId, redirectUri,
        state: transaction.id, nonce: transaction.nonce, ...pkce, scope: ["openid"], requirePasskey: true,
      });
      await store.putTransaction(transaction, now());
      return { transactionId: transaction.id, authorizationUrl, expiresAt: transaction.expiresAt };
    },
    completeLogin(input: Completion) {
      return protectedCompletion(async () => {
        const deviceChallenge = await binding(input);
        assertCubidAuthorizationCallbackDestination(input.callbackUrl, redirectUri);
        const callback = parseCubidAuthorizationCallback(input.callbackUrl);
        if (callback.state !== input.transactionId || (callback.raw.iss && callback.raw.iss[0] !== issuer)) throw new ReferenceError("invalid_transaction");
        const transaction = await store.takeTransaction(input.transactionId, { ...configuredBinding, kind: "login", sessionKey: null, deviceChallenge }, now());
        if (!transaction || transaction.kind !== "login") throw new ReferenceError("invalid_transaction");
        if (callback.kind === "error") return { status: "denied" as const };
        const response = await exchangeCubidAuthorizationCode({
          clientId, redirectUri, tokenEndpoint: discovery.token_endpoint, code: callback.code, codeVerifier: transaction.codeVerifier, fetch,
        });
        if (!response.idToken) throw new ReferenceError("authentication_failed");
        const claims = await validateCubidIdToken({ clientId, discoveryDocument: discovery, idToken: response.idToken, expectedNonce: transaction.nonce, fetch, crypto, nowSeconds: now() });
        const completedAt = now();
        const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
        if (completedAt < transaction.requestedAt || completedAt >= transaction.expiresAt || claims.iss !== issuer ||
            audiences.length !== 1 || audiences[0] !== clientId || (claims.azp !== undefined && claims.azp !== clientId) || typeof claims.exp !== "number" || claims.exp <= completedAt ||
            !Number.isSafeInteger(claims.iat) || (claims.iat as number) < transaction.requestedAt - 5 || (claims.iat as number) > completedAt + 5 ||
            !getCubidAuthAssurance(claims).hasPasskeyAssurance) throw new ReferenceError("authentication_failed");
        const credential = random();
        const expiresAt = completedAt + DEVELOPMENT_SESSION_SECONDS;
        await store.putSession({ key: await hash(credential), issuer, clientId, subject: claims.sub as string, expiresAt }, completedAt);
        // Whitelist only the app credential and local policy; no Cubid/provider token or claim object.
        return { status: "authenticated" as const, credential, expiresAt };
      });
    },
    async session(credential: string) {
      const session = await authenticate(credential);
      return { status: "authenticated" as const, expiresAt: session.expiresAt };
    },
    async logout(credential: string) {
      const session = await authenticate(credential);
      await store.deleteSession(session.key);
    },
    async cancelLogin(transactionId: string, deviceVerifier: string) {
      await store.takeTransaction(opaque(transactionId), { ...configuredBinding, kind: "login", sessionKey: null, deviceChallenge: await hash(deviceVerifier) }, now());
    },
    async startDemoAction(credential: string, deviceChallenge: string) {
      opaque(deviceChallenge);
      const session = await authenticate(credential);
      const request = await createCubidReauthenticationRequest({ session, discoveryDocument: discovery, redirectUri, crypto, nowSeconds: now(), requirePasskey: true, maxAge: 60 });
      await assertActive(session);
      const transactionId = request.transaction.state;
      await store.putTransaction({ ...configuredBinding, kind: "step_up", id: transactionId, sessionKey: session.key, deviceChallenge, reauthentication: request.transaction, expiresAt: request.transaction.expiresAtSeconds }, now());
      return { transactionId, authorizationUrl: request.authorizationUrl, expiresAt: request.transaction.expiresAtSeconds };
    },
    async cancelDemoAction(credential: string, transactionId: string, deviceVerifier: string) {
      const session = await authenticate(credential);
      await store.takeTransaction(opaque(transactionId), { ...configuredBinding, kind: "step_up", sessionKey: session.key, deviceChallenge: await hash(deviceVerifier) }, now());
    },
    completeDemoAction(credential: string, input: Completion) {
      return protectedCompletion(async () => {
        const session = await authenticate(credential);
        const deviceChallenge = await binding(input);
        const result = await completeCubidReauthentication({
          session, discoveryDocument: discovery, redirectUri, callbackUrl: input.callbackUrl, fetch, crypto,
          // Omit fixed nowSeconds so the SDK checks its real clock after asynchronous verification.
          consumeTransaction: async (state) => {
            if (state !== input.transactionId) return null;
            const transaction = await store.takeTransaction(state, { ...configuredBinding, kind: "step_up", sessionKey: session.key, deviceChallenge }, now());
            return transaction?.kind === "step_up" ? transaction.reauthentication : null;
          },
        });
        await assertActive(session);
        return result.status === "authenticated" ? { status: "confirmed" as const, action: "no_op" as const } : { status: "denied" as const };
      });
    },
  };
}
