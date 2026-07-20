# `@cubid/auth`

Runtime-agnostic OIDC and PKCE helpers for browser-safe Sign in with Cubid.

## When To Choose This Package

Use `@cubid/auth` when you need Sign in with Cubid in a public browser or
hybrid web app and want the protocol foundation without a React dependency. Choose
`@cubid/auth-react` later when you want React-specific session bindings on top
of this package.

## Install

```sh
npm install @cubid/auth
```

## Registry Availability

- npm: planned public package
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/auth.json`
- Package matrix: `../../README.md`
- Passkey-first SIWC guide:
  `../../docs/examples/passkey-first-siwc.md`

## Basic Usage

```ts
import {
  buildCubidAuthorizationUrl,
  createCubidAuthNonce,
  createCubidAuthState,
  createCubidPkcePair,
} from "@cubid/auth"

const pkce = await createCubidPkcePair()
const state = createCubidAuthState()
const nonce = createCubidAuthNonce()

const signInUrl = buildCubidAuthorizationUrl({
  authorizationEndpoint: "https://id.cubid.me/authorize",
  clientId: "clearpass-dashboard",
  codeChallenge: pkce.codeChallenge,
  nonce,
  requirePasskey: true,
  redirectUri: "https://dashboard.clearpass.app/callback",
  state,
})
```

`requirePasskey: true` adds `acr_values=urn:cubid:acr:passkey`, which asks the
Cubid-hosted Identity surface to satisfy the request with Cubid-owned passkey
assurance before consent and callback.

Decoded `CubidIdTokenClaims` include typed optional `acr` and `amr` fields so
apps can inspect returned authentication assurance without treating the whole
token payload as an untyped record.

Use `getCubidAuthAssurance(...)` or `hasCubidPasskeyAssurance(...)` with an ID
token, decoded claims, or `CubidAuthSession` when app UI or backend handoff
logic needs to confirm the returned session was passkey-backed:

```ts
import { hasCubidPasskeyAssurance } from "@cubid/auth"

if (!hasCubidPasskeyAssurance(session)) {
  throw new Error("Expected a passkey-backed Cubid session")
}
```

## FriendR Claim Boundary

FriendR unique-human-confidence fields are UserInfo/disclosure contract fields,
not redirect parameters or default ID-token claims. Use
`getCubidFriendrOidcClaim(...)`, `isCubidFriendrIdTokenClaim(...)`, and
`isCubidFriendrRedirectParameter(...)` to classify the public FriendR claim
names before deciding where to read them.

`self_account_type_claim_v1` is a compatibility alias for Cubid-owned
`cubid_actor_type`. `cubid_kyc_presence_v1` is a coarse boolean UserInfo claim.
`friendr_unique_human_confidence` is a redacted `cubid:stamps` UserInfo and
disclosure claim. FriendR score effects are visible only through existing
consented `cubid:score` outputs such as `cubid_score`, `cubid_score_band`, and
`cubid_personhood_level`.

Do not read FriendR-derived score, actor type, KYC presence, stamp summaries,
or raw aggregate payload details from authorization callback URLs or ID tokens.
The SDK also does not model raw FriendR graph data, relationship labels,
classifier or target identities, attestations, duplicate reports, contacts, XP,
KYC provider details, or internal Cubid identifiers.

This package is intentionally browser-safe. It does not require a Cubid dapp
API key, a client secret, or any other privileged credential in frontend code.

Consuming apps should not implement Cubid passkey creation, returning-user
passkey authentication, or lost-passkey recovery locally. Those flows are owned
by the Identity issuer at `https://id.cubid.me`; apps only start the OIDC
request, handle the callback, and create their own app session from consented
app-scoped claims.

Use OIDC discovery from `https://id.cubid.me/.well-known/openid-configuration`
for production authorization, token, UserInfo, JWKS, logout, revoke, and
registration endpoints. Do not call Passport, Verify, Admin, or internal OIDC
interaction routes directly from SDK integrations.

## Identity Issuer Readiness

`@cubid/auth` includes `checkCubidIdentityIssuerReadiness(...)` for
metadata-only release checks. The helper verifies exact issuer equality,
discovery shape, required endpoints, JWKS availability, authorization-code
support, PKCE S256, and pairwise subject metadata without exchanging user
credentials.

Production is the default and must be `https://id.cubid.me`:

```ts
import { checkCubidIdentityIssuerReadiness } from "@cubid/auth"

await checkCubidIdentityIssuerReadiness()
```

Staging is explicit. Passing the staging issuer without
`environment: "staging"` fails closed instead of silently treating staging as a
production fallback:

```ts
await checkCubidIdentityIssuerReadiness({
  environment: "staging",
  issuer: "https://staging-id.cubid.me",
})
```

The repository CLI gate uses the same helper:

```sh
pnpm auth:issuer:check
pnpm auth:issuer:check -- --environment staging --issuer https://staging-id.cubid.me
```
