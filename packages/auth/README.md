# `@cubid/auth`

Runtime-agnostic OIDC and PKCE helpers for browser-safe Sign in with Cubid.

## When To Choose This Package

Use `@cubid/auth` when you need Login with Cubid in a public browser or hybrid
web app and want the protocol foundation without a React dependency. Choose
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
  authorizationEndpoint: "https://id.cubid.me/oauth2/authorize",
  clientId: "clearpass-dashboard",
  codeChallenge: pkce.codeChallenge,
  nonce,
  redirectUri: "https://dashboard.clearpass.app/callback",
  state,
})
```

This package is intentionally browser-safe. It does not require a Cubid dapp
API key, a client secret, or any other privileged credential in frontend code.
