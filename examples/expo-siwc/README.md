# Expo SIWC reference source

This is the first **source-only** slice of [SDK47](https://github.com/Cubid-Me/cubid-sdk/issues/47).
It supplies a transport-neutral reference RP controller and a bounded in-memory
store, tested against a synthetic issuer. It does not yet contain an Expo binary,
HTTP server or hosted service. Nothing here registers a client, publishes a package
or proves physical-device, Hermes, hosted login or provider readiness.

The [native shell source](./native/README.md) adds an isolated private Expo example,
system-browser/secure-storage adapters, explicit local RPC transport, cancellation
and cold-launch delivery. Its single screen has sign-in/status, app-only sign-out
and a harmless confirmation action. Synthetic integration tests exercise the
shell's lifecycle against this backend without opening a socket or device.
The [scope assessment](../../docs/examples/expo-siwc-reference-scope.md) and native
README retain the concrete real-acceptance inputs; no device readiness is claimed.

## Run the synthetic checks

From this SDK checkout, using its existing locked dependencies:

```sh
pnpm --filter @cubid/auth build
pnpm exec tsc --noEmit -p examples/expo-siwc/tsconfig.json
pnpm --filter @cubid/acceptance exec vitest run --config vitest.config.ts src/expo-reference-backend.acceptance.test.ts
pnpm exec eslint examples/expo-siwc packages/acceptance/src/expo-reference-backend.acceptance.test.ts
```

`sdk.ts` is the only checkout adapter: it imports the **public built artifact**
from `packages/auth/dist/index.mjs`. There is no published-version compatibility
claim. A later separately approved packaged example can change that adapter to
`@cubid/auth`; this slice adds no dependencies, workspace package or lock changes.
The canonical acceptance suite builds the SDK before loading the example.

Tests inject `fetch` and use `https://issuer.example.invalid`, synthetic client ID
`synthetic-native-public-client`, and `cubidexample://auth/callback`. They generate
an ephemeral signing key in process. There are no credentials or live issuer calls.
`createReferenceBackend` requires an explicit fetch implementation and never
defaults to global network access. The controller has no listener or CLI launcher.

## Host/backend handoff

The future native host creates a fresh **32-byte cryptographically random device
verifier** per ceremony and SHA-256/base64url challenge. It persists the verifier
securely before opening the browser. This is a separate app-to-reference-backend
binding; it does not replace the issuer's independent PKCE verifier/state/nonce.
Send the challenge at start and the verifier only during completion/cancellation.
This proves possession of a ceremony secret, not hardware/app attestation. A
custom scheme can be intercepted; possession binding prevents an intercepted
callback alone from redeeming an app session and does not promise availability.
Never put the verifier or app credential into a callback URL, query parameter,
browser URL, log or analytics event. Use the system auth session, not a WebView.

| Controller method | Host responsibility and result |
| --- | --- |
| `startLogin(deviceChallenge)` | Persist device verifier; receive transaction ID, authorization URL and expiry; open system browser |
| `completeLogin({transactionId, deviceVerifier, callbackUrl})` | Submit the exact browser/deep-link callback; receive only a new opaque app credential and app-session expiry, or a closed denial |
| `cancelLogin(transactionId, deviceVerifier)` | Discard a dismissed ceremony with its originating proof; a wrong proof cannot consume another device's transaction |
| `session(credential)` | Restore status after app cold start; no ID token, access token or identity-claim object returned |
| `logout(credential)` | Revoke this example's app session and clear device storage; does not claim global Cubid/provider logout |
| `startDemoAction(credential, deviceChallenge)` | Require the existing app session; create fresh passkey step-up using public SDK50 helper |
| `completeDemoAction(credential, completion)` | Verify same subject, signed freshness and passkey assurance; consume once and confirm only the `no_op` action |
| `cancelDemoAction(credential, transactionId, deviceVerifier)` | Cancel only the app/session/device-bound step-up |

These are **reference controller methods**, not new Cubid endpoints. Future
transport must allowlist these operations, enforce body limits and content types,
use authenticated TLS, and return only documented closed outputs. Error mapping
must expose `ReferenceError.code` only, never serialize errors, stack/cause/raw
objects, callbacks, authorization URLs, transactions, bearer credentials or tokens.
An HTTP adapter will need its own origin/rate/concurrency controls before hosting.
This slice is not authorized for hosting or production use.

## Validation and storage boundaries

- Configuration fixes issuer, client and exact custom-scheme callback once. No
  request can choose a return destination, issuer, client, scope or assurance policy.
  This example requires HTTPS discovery/endpoints on the configured issuer origin,
  public-client `none`, code/S256 and pairwise-subject metadata. That conservative
  example policy is not an extension to the generic SDK or a universal OIDC rule.
- The backend owns the independent issuer PKCE verifier, state and nonce. Only
  the system-browser URL leaves it. The device proof and transaction kind/session
  binding and configured issuer/client/callback must match **atomically before
  transaction removal**. App-session reads/revocation also match issuer/client
  even when controller instances share a store. Replays and
  concurrent completions cannot trigger a second code exchange.
- Completion checks exact callback/state/optional callback issuer, signed ID-token
  signature/issuer/exclusive client audience/authorized party/nonce/nonempty
  subject/time/passkey assurance. Transaction and ID-token expiry are rechecked
  after asynchronous exchange/key verification. Scope is `openid` only. Optional
  email is unnecessary; no provider token or provider hint is authentication proof.
- Cubid token responses are discarded after validation. The device receives an
  opaque **app-session** bearer credential, not Cubid tokens. Only its SHA-256 hash
  and server-side issuer/client/pairwise subject/expiry are stored in the app session.
  Secure native storage of that credential remains the next slice's responsibility.
- Demo step-up uses the existing public SDK reauthentication transaction and
  completion helpers, requires the original app identity and rechecks app-session
  revocation/expiry after network work. It never replaces the original session or
  authorizes linking, recovery, money movement or other business operations.
- The store snapshots values, bounds live records and prunes expired entries.
  Its synchronous Map match/remove is atomic only in this one process. Restarting
  the **backend** loses every record; restoring the app against the same store is
  a different case. A future durable/distributed store must preserve atomic match
  and consume, expiry, uniqueness and revocation semantics. Do not add a database
  or persistent access merely to run these source tests.
- Transactions last five minutes; app sessions last fifteen minutes for this
  development example. Those are explicit local bounds, not SDK49's production
  session-policy decision. No refresh tokens are retained or used.

## Remaining acceptance inputs

The next source-only shell can use synthetic/local configuration. Real device
acceptance later needs an approved existing native client/environment, exact
callback(s) and device/build access. A hosted backend or published SDK package
requires its own authorization; neither is provisioned or assumed here.

This controller deliberately does not copy Starter's browser-cookie routes.
System-browser and native API requests must not be assumed to share cookies.
The device verifier and separate app credential make that boundary explicit.
All evidence here is synthetic and local; SDK47 remains open for the native shell
and real acceptance matrix.
