# ClearPass Dashboard Vite Auth Example

This example shows the intended browser-safe Sign in with Cubid shape for a
Vite/React dashboard such as ClearPass.

It uses:

- `@cubid/auth` for the runtime-agnostic OIDC and PKCE contract
- `@cubid/auth-react` for the React provider, callback handling, and session UI

It does **not** put a Cubid API key, dapp secret, service-role key, OIDC
signing key, or Passport internal token in browser code.

## Public Environment Variables

These values are safe for the browser because they are public relying-party
metadata rather than privileged credentials:

```env
VITE_CUBID_ISSUER=https://staging-id.cubid.me
VITE_CUBID_CLIENT_ID=clearpass-dashboard
VITE_CUBID_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_CUBID_POST_LOGOUT_REDIRECT_URI=http://localhost:5173/
```

Production should switch the issuer to `https://id.cubid.me` and use the real
hosted callback/logout URLs registered in Passport.

## `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import { CubidAuthProvider } from "@cubid/auth-react";

import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CubidAuthProvider
      clientId={import.meta.env.VITE_CUBID_CLIENT_ID}
      issuer={import.meta.env.VITE_CUBID_ISSUER}
      postLogoutRedirectUri={import.meta.env.VITE_CUBID_POST_LOGOUT_REDIRECT_URI}
      redirectUri={import.meta.env.VITE_CUBID_REDIRECT_URI}
    >
      <App />
    </CubidAuthProvider>
  </React.StrictMode>
);
```

## `src/App.tsx`

```tsx
import { CubidAuthCallback, CubidSignInButton, CubidSignOutButton, useCubidAuth } from "@cubid/auth-react";

function DashboardGate() {
  const auth = useCubidAuth();

  if (auth.status === "loading") {
    return <p>Loading Sign in with Cubid…</p>;
  }

  if (auth.error) {
    return (
      <div>
        <h1>Sign in failed</h1>
        <p>{auth.error.message}</p>
        <button onClick={auth.clearError}>Try again</button>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <section>
        <h1>ClearPass Dashboard</h1>
        <p>Sign in with Cubid to access developer-scoped dashboard tools.</p>
        <CubidSignInButton />
      </section>
    );
  }

  return (
    <section>
      <header>
        <h1>ClearPass Dashboard</h1>
        <p>
          Signed in as {auth.session?.userInfo?.email ?? auth.session?.subject}
        </p>
        <CubidSignOutButton />
      </header>

      <main>
        <p>Protected dashboard content goes here.</p>
      </main>
    </section>
  );
}

function CallbackRoute() {
  return (
    <CubidAuthCallback
      errorFallback={<p>Unable to complete the Cubid callback.</p>}
      loadingFallback={<p>Completing Sign in with Cubid…</p>}
      successFallback={<p>Sign-in complete. Redirecting…</p>}
    />
  );
}

export function App() {
  const pathname = window.location.pathname;

  if (pathname === "/auth/callback") {
    return <CallbackRoute />;
  }

  return <DashboardGate />;
}
```

## Server-Side Expectations

This browser example only establishes the developer session UX. It does **not**
replace backend authorization.

ClearPass server or edge routes still need to:

- validate the authenticated developer session on every protected request
- enforce the same app and developer scope server-side
- avoid trusting local storage or the UI gate as authorization

## Notes

- `sub` is a pairwise OIDC subject scoped to the ClearPass client. Do not treat
  it as a raw Cubid internal user id.
- Keep staging and production callback/logout URLs aligned with the relying
  party registered in Passport.
- If ClearPass later wants a backend-assisted token or cookie exchange, document
  which values remain public browser config and which values stay server-only.
