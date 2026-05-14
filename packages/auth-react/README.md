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
    return <p>Signed in as {auth.session?.userInfo?.email ?? auth.session?.subject}</p>;
  }

  return <CubidSignInButton>Sign in with Cubid</CubidSignInButton>;
}

export function App() {
  const isCallbackRoute = window.location.pathname === "/auth/callback";

  return (
    <CubidAuthProvider
      clientId="clearpass-dashboard"
      issuer="https://staging-id.cubid.me"
      redirectUri="https://dashboard.clearpass.app/auth/callback"
    >
      {isCallbackRoute ? <CubidAuthCallback /> : <DashboardGate />}
    </CubidAuthProvider>
  );
}
```

`@cubid/auth-react` helps with the browser session experience only. Apps still
need to enforce protected dashboard access and server-side authorization using
the authenticated session on their own backend or edge routes.
