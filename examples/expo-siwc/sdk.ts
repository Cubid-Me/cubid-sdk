// Source-only checkout adapter. Uses the public build, never private issuer code.
// A separately approved packaged example can replace this with @cubid/auth.
export {
  assertCubidAuthorizationCallbackDestination, buildCubidAuthorizationUrl,
  completeCubidReauthentication, createCubidAuthNonce, createCubidAuthState,
  createCubidPkceCodeChallenge, createCubidPkcePair,
  createCubidReauthenticationRequest, exchangeCubidAuthorizationCode,
  fetchCubidOidcDiscoveryDocument, getCubidAuthAssurance,
  parseCubidAuthorizationCallback, validateCubidIdToken,
} from "../../packages/auth/dist/index.mjs";
export type {
  CubidAuthCrypto, CubidAuthFetch, CubidReauthenticationTransaction,
} from "../../packages/auth/dist/index.mjs";
