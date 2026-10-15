# Federated Sign in with Cubid: client contract v1

This guide consumes Identity's [federation contract v1](https://github.com/Cubid-Me/cubid-monorepo/blob/a8bcc3a/docs/engineering/federated-login-contract-v1.md)
for [SDK acceptance #191](https://github.com/Cubid-Me/cubid-monorepo/issues/191). It describes SDK client
compatibility, not a production provider enablement or release. Identity owns
provider binding/provisioning, consent, redirects, account linking and recovery.
The entry/verification slice is [Identity PR #193](https://github.com/Cubid-Me/cubid-monorepo/pull/193);
it does not enable primary Google login.

## Route every entry through Cubid

An RP uses Cubid discovery, authorization code, PKCE S256, state and nonce.
An optional `provider` selects a preferred hosted choice:

```ts
import {
  buildCubidAuthorizationUrl, createCubidAuthNonce, createCubidAuthState,
  createCubidPkcePair, fetchCubidOidcDiscoveryDocument,
} from "@cubid/auth";

const issuer = "https://id.cubid.me";
const discovery = await fetchCubidOidcDiscoveryDocument({ issuer });
const pkce = await createCubidPkcePair();
const state = createCubidAuthState();
const nonce = createCubidAuthNonce();
// Persist state, nonce, verifier, exact redirect URI, issuer and client ID
// in the host's private, expiring, one-use login transaction before navigation.
const authorizationUrl = buildCubidAuthorizationUrl({
  authorizationEndpoint: discovery.authorization_endpoint,
  clientId: "registered-rp-client",
  redirectUri: "https://app.example/auth/callback",
  codeChallenge: pkce.codeChallenge,
  state, nonce,
  provider: "google",
  // Request passkey assurance only when the application's policy requires it.
  requirePasskey: false,
});
```

`provider` accepts `google`, `github`, `apple`, or `passkey`. It emits one
`cubid_provider` parameter. Unsupported, empty, or conflicting hints fail with
`invalid_provider` before navigation. A valid legacy `extraParams.cubid_provider`
is accepted, but using both sources is an error, even when their values match.
`loginHint` retains its existing account/recovery meaning; do not set it to a
provider name. Omitting `provider` preserves existing requests.

The hint never proves authentication, overrides `prompt`, `maxAge` or passkey
ACR, skips consent, or changes linking rules. Old issuers may ignore the hint.
An unavailable provider remains a hosted unavailable choice or standard OIDC
error. Google ordinary login depends on Identity's backend binding/provisioning;
Apple primary-login readiness is not established. Do not advertise a working
factor based only on a supported hint value.

Discovery may advertise:

```json
{
  "cubid_federation_contract_version": "1",
  "cubid_provider_hint_parameter": "cubid_provider",
  "cubid_provider_hint_values_supported": ["google", "github", "apple", "passkey"]
}
```

These fields describe selection syntax, not enabled authentication factors.
The RP receives Cubid's code/state, Cubid tokens and an app-specific pairwise
`sub`. Provider tokens, provider subject IDs and provider email matches are not
RP credentials. Link an account only through Cubid's fresh owner-proof flow.

Direct Cubid login follows the same protocol with a registered first-party OIDC
client and its exact registered callback. Do not add arbitrary return URLs or
navigate directly to Google's authorization endpoint. Provider selection belongs
to Cubid's hosted UI.

## React integration

```tsx
const auth = useCubidAuth();
await auth.signIn({ provider: "google", requirePasskey: false });
// For ordinary login, the existing session hook handles the callback.
```

`CubidAuthProvider` retains its existing `requirePasskey: true` default. Selecting
Google alone does not turn it off. For a sensitive identity operation, use the [step-up helper](./step-up-siwc.md)
to verify signed freshness, same-subject binding and requested assurance; the hint
and an existing authenticated session are not evidence of a fresh ceremony. `CubidSignInButton` forwards
`signInOptions.provider`. Use custom native host controls rather than DOM buttons
in a React Native app.

Callbacks require the exact registered destination (including fixed query values),
then bind success and error state to the stored transaction before token exchange. A returned `iss` must match the configured issuer. Duplicate protocol
parameters, mixed success/error responses, stale client transactions and mismatched
UserInfo subjects fail closed. Missing legacy callback `iss` remains supported;
ID-token issuer, signature and nonempty subject validation still apply. Pass
`expectedNonce` to `validateCubidIdToken` in headless integrations; the React hook
binds it automatically to the stored transaction. Store transaction state
privately, consume it once, and validate nonce before establishing an app session.

## Cubid verified-email profile migration

This is the current **Cubid issuer profile**, not a universal OIDC rule. For Cubid,
a consented, verified email string is disclosed only when authorized and available;
otherwise `email` is absent. An authenticated user may legitimately disclose only
`sub`. Collection for recovery/contact and disclosure to an RP are separate choices.
Do not reject authentication when optional email, name, phone or other claims are
missing, and do not widen scopes to work around omitted claims.

```ts
const subject = session.subject; // use Cubid's app-specific subject for identity
const email = session.userInfo?.email ?? session.idTokenClaims?.email;
if (email) {
  // Optional app contact/display use under the configured Cubid issuer profile.
} else {
  // Continue the authenticated flow without email-based identity matching.
}
```

`email_verified` remains an optional deprecated compatibility property on the
public types. Older Cubid and other standards-based issuers may return it. Generic
OIDC integrations must follow their issuer's verification semantics; this SDK
change does not erase their boolean or reinterpret `false` as verified. Migrate
Cubid-specific checks that require `email_verified === true` to the documented
Cubid verified-email profile only after confirming the configured runtime version.
Phone verification fields are unchanged. Generic parsing preserves legacy fields.

This additive minor SDK change retains existing generic claim types. Selective
consent completion and hosted omission smoke remain dependent on Identity's
runtime predecessors (including #192 before optional-selection #74); this guide
and synthetic tests do not close that deployment gate.

## Native consumers and remaining example work

See [Native OIDC integration](./native-siwc.md) for system-browser/deep-link usage,
scoped crypto, server-mediated exchange, storage boundaries and registration.
`@cubid/react-native` profile/OTP components remain separate from hosted OIDC
login. The merged Native feature branch is preserved in this SDK baseline.
