# Native OIDC integration with Cubid

This SDK integration sketch uses contract v1 from [Federated SIWC](./federated-siwc.md).
It is not a complete Expo application or a production-device smoke result.
A full app belongs in a separately coordinated Starter change; do not edit the
existing dirty Starter checkout to try this sketch.

## Register a native public client

Register the native application with Cubid using authorization code + S256 PKCE,
`token_endpoint_auth_method=none`, no client secret, and an exact callback such as
`cubidexample://auth/callback`. Use a uniquely owned scheme or verified app/universal
link in a real app. Register development, staging and production callbacks explicitly;
do not assume Expo Go's callback matches a standalone build's callback. Use the
configured Cubid issuer's discovery document and exact issuer validation.

Client provisioning and live Google primary-login readiness are Identity work.
Do not enter credentials or register new persistent access just to run this example.

Registration is an operator/provisioning step, not something to repeat at every
login or independently on every installed device. An authorized operator uses the
issuer's advertised `registration_endpoint`. A representative native request is:

```json
{
  "client_name": "Example native application",
  "client_type": "native",
  "redirect_uris": ["cubidexample://auth/callback"],
  "grant_types": ["authorization_code"],
  "token_endpoint_auth_method": "none",
  "default_scopes": ["openid", "profile", "email"],
  "allowed_scopes": ["openid", "profile", "email"]
}
```

The current registration contract returns `client_id`, `client_type: "native"`,
the registered URI and scope arrays, `token_endpoint_auth_method: "none"`,
`registration_client_uri`, `registration_access_token`, and issuer metadata.
It omits `client_secret` for native clients. Keep the registration access token in
the operator's private credential store; it grants client-management authority
and must never be bundled into the app, logged, or used as an end-user session.
Only the nonsecret client ID and registered callback belong in app configuration.

Provision separate client IDs in production (`https://id.cubid.me`) and staging
(`https://staging-id.cubid.me`); never treat staging as an automatic fallback.
Confirm live registration availability and the operator policy with Identity before
making registration requests. This session made no registrations or access changes.

## Prefer server-mediated login when the app already has a backend

The app's own backend creates a short-lived, one-use login transaction containing
client ID, issuer, exact registered native redirect URI, PKCE verifier, state and
nonce. Bind the transaction to the initiating app session and return only an opaque
transaction handle and the Cubid authorization URL to the device. A provider hint
can be included through `buildCubidAuthorizationUrl({ ..., provider: "google" })`.

The device opens that URL in the system browser. A typical Expo host integration is:

```ts
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

const redirectUri = "cubidexample://auth/callback"; // exactly registered URI
const pending = await appApi.startCubidLogin({ provider: "google" });
const result = await WebBrowser.openAuthSessionAsync(pending.authorizationUrl, redirectUri);
if (result.type === "success") {
  await completeLogin(pending.handle, result.url);
}

// For a callback delivered after a cold launch, restore only the pending opaque
// transaction handle from host-controlled storage and use the same completion path.
const initialUrl = await Linking.getInitialURL();
if (initialUrl && restoredPendingHandle) {
  await completeLogin(restoredPendingHandle, initialUrl);
}

async function completeLogin(handle: string, callbackUrl: string) {
  const callback = new URL(callbackUrl);
  const expected = new URL(redirectUri);
  if (callback.protocol !== expected.protocol || callback.host !== expected.host ||
      callback.pathname !== expected.pathname || callback.hash) {
    throw new Error("Unexpected callback destination");
  }
  // The backend checks state/issuer, exact destination, one-use transaction,
  // Cubid signature/audience/expiry/nonce, and matching UserInfo subject.
  const appSession = await appApi.finishCubidLogin({ handle, callbackUrl });
  await hostSessionStore.save(appSession); // app session, not Cubid/provider tokens
}
```

`appApi` and the stores above are interfaces implemented by the host, not Cubid
endpoints. Do not put backend credentials in the device bundle. The server uses
`parseCubidAuthorizationCallback`, `assertCubidAuthorizationState`,
`exchangeCubidAuthorizationCode`, `validateCubidIdToken`, and
`createCubidAuthSession`. It must also check nonce against the transaction, compare
any returned `iss`, and atomically consume the transaction. Return only the app
session and authorized app-specific claims required by the device. Never log a
callback URL, code, nonce, verifier, token or private profile data.

Both browser-success delivery and deep-link delivery can report the same callback.
Use one backend completion result per transaction; cancellation never creates a
session. Handle missing/expired transactions by starting a fresh Cubid login.

## On-device public-client foundations

For hosts that deliberately perform the public-client exchange on-device,
`@cubid/auth` accepts an explicit Web Crypto adapter without patching globals:

```ts
import { createCubidAuthNonce, createCubidAuthState, createCubidPkcePair,
  validateCubidIdToken, type CubidAuthCrypto } from "@cubid/auth";

// Host-supplied native adapter implementing secure getRandomValues and Web Crypto
// SHA-256 digest, JWK import and signature verification, with correctly bound methods.
const crypto: CubidAuthCrypto = nativeWebCryptoAdapter;
const pkce = await createCubidPkcePair({ crypto });
const state = createCubidAuthState(32, crypto);
const nonce = createCubidAuthNonce(32, crypto);
const claims = await validateCubidIdToken({
  crypto, clientId, discoveryDocument, idToken, expectedNonce: nonce, fetch: hostFetch,
});
// expectedNonce binds this request; then match UserInfo sub before using claims.
```

`expo-crypto` random/hash helpers alone are not a complete JWK signature-verification
adapter. Do not replace signature verification with decoding or a success stub.
The SDK has portable base64 and UTF-8 fallbacks and accepts custom-scheme callback
URLs; the host must still provide working `URL`, `URLSearchParams` and Fetch APIs.
Existing browser/Node defaults remain unchanged. `CubidAuthProvider` also accepts
`crypto` for PKCE, state/nonce and validation. Its provider storage accepts synchronous
or asynchronous adapters; await the hook's persistence operations.

Async provider persistence (#45) supplies cold-start restoration. The hook handoff contract (#46) is documented below. A bounded runnable
[Expo reference integration and device acceptance (#47)](./expo-siwc-reference-scope.md),
and refresh/re-auth policy (#49) remain follow-ups. The [step-up helper (#50)](./step-up-siwc.md)
is available against the merged issuer #134 contract; hosted/device acceptance
remains separate. The auth source boundary guard (#51)
runs within existing unit CI; a real Hermes/device smoke remains outstanding. Persist app
sessions in host-controlled appropriate storage and await persistence/removal
errors; see [async provider storage](../../packages/auth-react/README.md#asynchronous-native-storage).
Never assume a refresh token is issued. The [native session measurement kit](./native-session-measurement.md)
prepares the device observations required by #49 without assuming silent login or adding refresh tokens.
At expiry, start fresh Cubid authentication until an issuer-backed refresh policy is
implemented. For sensitive identity actions, use the [step-up flow](./step-up-siwc.md) with
signed authentication-time, same-subject and passkey checks on the trusted backend.

## React hook overrides for native hosts

For a host with synchronous or asynchronous storage and an injected crypto adapter, the hook's
browser touch points are explicit overrides:

- Supply `storage` to `CubidAuthProvider` to replace the localStorage default.
- Call `signIn({ performRedirect: false })` and open the returned URL yourself,
  or supply `navigate` with `performRedirect: true` to replace window navigation.
- Pass `callbackUrl` to `handleCallback` instead of reading window.location.
- Supply `navigate`/`performRedirect: false` for logout for the same reason.

Configure both exact callbacks and the stable host adapters before mounting native
controls. `registeredLogoutUri` must also be registered for this client if the issuer
supports hosted logout; this SDK session does not register it automatically.

```tsx
<CubidAuthProvider
  clientId={registeredNativeClientId}
  issuer={configuredCubidIssuer}
  redirectUri={redirectUri}
  postLogoutRedirectUri={registeredLogoutUri}
  storage={nativeStore}
  crypto={nativeCryptoAdapter}
  scope={["openid"]}
>
  <NativeAuthControls />
</CubidAuthProvider>
```

Choose one handoff style. `performRedirect: false` suppresses **all** SDK
navigation, including an injected `navigate`. It returns the URL after the private
transaction is persisted; the host then opens it and explicitly completes the callback:

```tsx
const auth = useCubidAuth(); // inside a native host component using the provider

async function signInFromNativeControl() {
  const authorizationUrl = await auth.signIn({ performRedirect: false });
  const result = await WebBrowser.openAuthSessionAsync(authorizationUrl, redirectUri);
  if (result.type !== "success") return null; // dismissal is not authentication
  return auth.handleCallback({ callbackUrl: result.url });
}

async function signOutFromNativeControl() {
  const logoutUrl = await auth.logout({ performRedirect: false });
  if (logoutUrl) await WebBrowser.openAuthSessionAsync(logoutUrl, registeredLogoutUri);
}
```

Alternatively, `signIn({ navigate: hostNavigate })` invokes the host navigator
instead of `window.location.assign`; leave `performRedirect` enabled. The navigator
has a synchronous `void` contract. A host that opens an asynchronous auth session
must own its completion/error handling; the SDK does not await a Promise returned
by that callback. The same rule applies to `logout({ navigate: hostNavigate })`.
For an awaited Expo auth-session flow, prefer the manual style above.

For a cold-launch URL, restore the same stable host storage adapter first and pass
the launch callback explicitly to `handleCallback({ callbackUrl: initialUrl })`.
This uses the persisted state, nonce and PKCE verifier, rather than the unrelated
browser `window.location`. Handle unrelated, invalid, expired or replayed callbacks
as errors; a deep link alone is not authentication. Avoid duplicate live callback
listeners where the platform auth session already delivers its result.

The cohesive `native-redirect.test.tsx` tests both navigation styles with signed
synthetic Cubid tokens and async host storage, a custom-scheme callback after
unmount/remount, verified-session restoration and host-owned logout. They are
hook/contract tests in jsdom, not physical-device or Hermes acceptance.

This on-device variant holds Cubid tokens in the configured store. Prefer the
server-mediated variant when your security/storage model calls for app-session
credentials only. Do not use the exported DOM sign-in/callback components as
native views; call the hook from native host controls.

## Run the SDK compatibility harness

From the SDK checkout with Node 24 or later:

```sh
node --experimental-strip-types scripts/check-auth-native-compat.mjs
# After building @cubid/auth, also check the emitted ESM artifact:
node scripts/check-auth-native-compat.mjs --built
```

This dependency-free, offline synthetic smoke imports the production auth source
after removing DOM globals, global crypto, Buffer and browser/UTF-8 encoders. It
checks injected secure crypto, S256, all provider hints, custom-scheme parsing,
signed Cubid token validation, bad signatures, missing optional email and subject
binding. It does not register clients, use credentials or exercise hosted login.
The focused Vitest suites add React transaction checks and a source boundary guard.
