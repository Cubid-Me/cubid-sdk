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
