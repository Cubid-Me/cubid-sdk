# @cubid/auth-react

React bindings for Sign in with Cubid on top of `@cubid/auth`.

Use this package when a browser app wants provider-managed sign-in launch,
callback handling, session state, and logout helpers without placing privileged
credentials in the browser.

## Install

```sh
npm install @cubid/auth-react @cubid/auth
```

## Registry availability

- npm: planned public package
- JSR: not published by policy

## API reference

- Machine-readable API JSON:
  [`docs/reference/api/auth-react.json`](../../docs/reference/api/auth-react.json)
- Root package matrix: [`README.md`](../../README.md)
- Passkey-first SIWC guide:
  [`docs/examples/passkey-first-siwc.md`](../../docs/examples/passkey-first-siwc.md)
- ClearPass-oriented Vite example:
  [`docs/examples/clearpass-dashboard-auth-vite.md`](../../docs/examples/clearpass-dashboard-auth-vite.md)

## Basic usage

```tsx
import {
  CubidAuthProvider,
  CubidAuthCallback,
  CubidSignInButton,
  useCubidAuth,
} from "@cubid/auth-react";

function DashboardGate() {
  const auth = useCubidAuth();

  if (auth.isAuthenticated) {
    return (
      <p>
        Signed in as {auth.session?.userInfo?.email ?? auth.session?.subject}
        {auth.hasPasskeyAssurance ? " with a Cubid passkey" : ""}
      </p>
    );
  }

  return <CubidSignInButton>Sign in with Cubid</CubidSignInButton>;
}

export function App() {
  const isCallbackRoute = window.location.pathname === "/auth/callback";

  return (
    <CubidAuthProvider
      clientId="clearpass-dashboard"
      issuer="https://id.cubid.me"
      redirectUri="https://dashboard.clearpass.app/auth/callback"
    >
      {isCallbackRoute ? <CubidAuthCallback /> : <DashboardGate />}
    </CubidAuthProvider>
  );
}
```

`CubidAuthProvider` requests Cubid passkey assurance by default using
`acr_values=urn:cubid:acr:passkey`. Set `requirePasskey={false}` only for a
compatibility flow that intentionally does not require passkey-backed Cubid
authentication.

`useCubidAuth()` exposes `assurance` and `hasPasskeyAssurance` so React apps can
render passkey-backed state without manually decoding `acr` or `amr` claims.

`@cubid/auth-react` helps with the browser session experience only. Apps still
need to enforce protected dashboard access and server-side authorization using
the authenticated session on their own backend or edge routes.

Passkey creation, returning-user authentication, recovery proof collection, and
fresh passkey enrollment after lost-passkey recovery remain Cubid-hosted at
the Identity issuer, `https://id.cubid.me`. React apps should surface "Sign in
with Cubid" and callback state, not embed Cubid passkey or recovery ceremonies
locally.

Use OIDC discovery from `https://id.cubid.me/.well-known/openid-configuration`
for production endpoint metadata. Passport, Verify, Admin, and internal OIDC
interaction routes are not public SDK integration targets.
