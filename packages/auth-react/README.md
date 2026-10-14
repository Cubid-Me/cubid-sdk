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

## Production And Staging Configuration

Production apps should configure the provider with the stable Identity issuer:

```tsx
<CubidAuthProvider
  clientId="your-production-client-id"
  issuer="https://id.cubid.me"
  redirectUri="https://app.example.com/auth/callback"
>
  <App />
</CubidAuthProvider>
```

Preview or staging apps may use `https://staging-id.cubid.me`, but only when the
OIDC client registration, callback URLs, and logout URLs are also registered in
that staging environment:

```tsx
<CubidAuthProvider
  clientId="your-staging-client-id"
  issuer="https://staging-id.cubid.me"
  redirectUri="https://preview.example.com/auth/callback"
>
  <App />
</CubidAuthProvider>
```

Do not use staging as an implicit production fallback. Discovery metadata
chooses the concrete authorization, token, UserInfo, JWKS, and logout endpoints
for the selected issuer, but ID tokens still must validate against that exact
issuer. `https://login.cubid.me` is a compatibility UI host during cutover, not
the issuer value new React integrations should configure.

## Federated Login And Native Compatibility

See [Federated SIWC contract v1](../../docs/examples/federated-siwc.md) and
[Native OIDC integration](../../docs/examples/native-siwc.md). Optional provider
hints select a Cubid-hosted UI choice; they never establish assurance or bypass
consent. Native crypto adapters can be scoped to the SDK. Existing browser
behavior and omitted-hint requests are preserved.

Under the current Cubid verified-email profile, email is optional and is disclosed
only when verified and authorized. Do not require `email_verified` or email for
Cubid authentication. Its optional deprecated typing is retained for legacy or
other OIDC issuers, whose verification semantics still apply.

## Asynchronous Native Storage

`CubidAuthProvider.storage` accepts `CubidAuthProviderStorage`: `getItem` may return
`string | null` or a promise; `setItem` and `removeItem` may return `void` or a
promise. Existing synchronous browser `localStorage` adapters still work. Core
`@cubid/auth` storage interfaces and session helpers remain synchronous.

Supply a stable host-owned adapter, for example an existing native store:

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";

<CubidAuthProvider
  clientId="your-registered-native-client"
  issuer="https://id.cubid.me"
  redirectUri="yourapp://auth/callback"
  storage={AsyncStorage}
  crypto={hostCrypto}
>
  <App />
</CubidAuthProvider>
```

The host chooses storage appropriate for its token/session security model; this
example does not add a native storage dependency to the SDK. For server-mediated
OIDC, keep Cubid tokens on the app server and use host session persistence instead.
See the [native guide](../../docs/examples/native-siwc.md) for registration, system
browser and callback handling. The bundled DOM buttons/callback UI are browser
components; native screens use the hook and host navigation adapters.

Hydration reports `loading` until storage resolves and ignores old loads after a
new auth action or storage/client/issuer/redirect change. Sessions from a different
client or issuer are not restored. Transaction writes finish before navigation;
callback session writes finish before transaction removal and authenticated state.
Writes and removals share a transient queue for the same stable storage adapter,
including provider remounts, so hydration waits for commit/rollback and logout
cannot be undone by an in-flight callback write. Keep the adapter identity stable;
separate adapters/processes accessing the same underlying store require host
coordination. Duplicate delivery of the same in-flight callback shares one code exchange.
Superseded actions reject with `operation_superseded`. Only committed provider
configuration changes supersede active work.

`await auth.clearSession()` now waits for session and transaction removal; memory
is cleared immediately. Also await `logout`, `signIn`, `handleCallback` and
`refreshUserInfo`, and handle rejected storage operations. Removal failures leave
memory signed out with `status: "error"`; fix/retry the failing store before
assuming persistent logout across restart. A failed callback commit rolls back to the prior stored session and retains the
transaction for diagnosis. If rollback also fails, `session_rollback_failed`
requires repairing or clearing the store before restarting auth; an authorization code may already have been consumed, so start a new sign-in
rather than assuming replay.
