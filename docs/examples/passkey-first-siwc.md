# Passkey-First SIWC Integration Guide

This guide is the current SDK-facing contract for consuming apps such as
SmarTrust, i-am-human, ChainCrew, and starter/demo apps that want to show Sign
in with Cubid.

The important boundary is simple:

- Cubid owns passkey creation, returning-user passkey authentication, lost
  passkey recovery, recovery proof collection, and consent at `login.cubid.me`.
- The consuming app owns its OIDC client registration, redirect callback,
  local app session, and app-specific authorization.
- The consuming app must not implement Cubid passkeys locally and must not put
  Cubid dapp API keys, OIDC client secrets, service-role keys, provider tokens,
  or recovery material in browser code.

## User Flows

### New Cubid User

1. The app sends the user to the Cubid issuer authorization endpoint with PKCE,
   `openid profile email`, and `acr_values=urn:cubid:acr:passkey`.
2. `login.cubid.me` creates the Cubid passkey and account, including the
   duplicate-account acknowledgement when account creation is required.
3. The user approves the minimum identity information requested by the app.
4. Cubid redirects back to the app callback with an authorization code.
5. The app exchanges the code, reads the ID token and `/userinfo`, and creates
   its own app session.

### Returning User With A Passkey

1. The app starts the same OIDC request with passkey assurance required.
2. `login.cubid.me` prompts for the existing passkey, including platform,
   phone/tablet, security-key, or password-manager options supported by the
   browser.
3. Consent is shown when the app, scopes, or disclosed claims require it.
4. Cubid redirects back to the app callback.

### Returning User With A Lost Passkey

1. The user enters the Login recovery path from `login.cubid.me`.
2. Cubid collects recovery proofs such as email, phone, Google, GitHub, or EVM
   proofs. Provider tokens and authorization codes stay server-side in Cubid.
3. If the proof set satisfies the recovery policy, Cubid asks the user to enroll
   a fresh passkey and completes a passkey-backed session.
4. The original OIDC/SIWC request can continue through consent and callback.

The app should treat recovery as Cubid-owned. It can explain that Cubid recovery
will return the user to the app after sign-in, but it should not collect Cubid
recovery proofs itself.

## Public Browser Configuration

Use public relying-party metadata in browser code:

```env
VITE_CUBID_ISSUER=https://staging-id.cubid.me
VITE_CUBID_CLIENT_ID=your-client-id
VITE_CUBID_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_CUBID_POST_LOGOUT_REDIRECT_URI=http://localhost:5173/
```

Use `NEXT_PUBLIC_` names instead of `VITE_` in Next.js apps. Production should
use `https://id.cubid.me` after the production client and callback URLs are
registered. Staging and demo apps should use `https://staging-id.cubid.me`
until their production relying-party records are ready.

Keep these values server-only:

- OIDC client secrets for confidential clients;
- Cubid dapp API keys;
- Supabase service-role keys;
- OAuth provider client secrets;
- webhook signing secrets;
- recovery material, wallet shares, private keys, or recovery bundles.

## Headless OIDC With `@cubid/auth`

```ts
import {
  buildCubidAuthorizationUrl,
  createCubidAuthNonce,
  createCubidAuthState,
  createCubidPkcePair,
} from "@cubid/auth";

const pkce = await createCubidPkcePair();
const state = createCubidAuthState();
const nonce = createCubidAuthNonce();

sessionStorage.setItem(
  "cubid:pkce",
  JSON.stringify({
    codeVerifier: pkce.codeVerifier,
    nonce,
    state,
  })
);

const signInUrl = buildCubidAuthorizationUrl({
  authorizationEndpoint: "https://staging-id.cubid.me/authorize",
  clientId: "your-client-id",
  codeChallenge: pkce.codeChallenge,
  nonce,
  redirectUri: "http://localhost:5173/auth/callback",
  requirePasskey: true,
  scopes: ["openid", "profile", "email"],
  state,
});

window.location.assign(signInUrl);
```

The app callback must verify `state`, exchange the code with the saved PKCE
verifier, validate issuer/audience/nonce, and then fetch `/userinfo` when the app
needs consented profile claims.

## React With `@cubid/auth-react`

```tsx
import {
  CubidAuthCallback,
  CubidAuthProvider,
  CubidSignInButton,
  CubidSignOutButton,
  useCubidAuth,
} from "@cubid/auth-react";

function SiwcPanel() {
  const auth = useCubidAuth();

  if (window.location.pathname === "/auth/callback") {
    return <CubidAuthCallback />;
  }

  if (!auth.isAuthenticated) {
    return <CubidSignInButton>Sign in with Cubid</CubidSignInButton>;
  }

  return (
    <section>
      <p>
        Signed in as {auth.session?.userInfo?.email ?? auth.session?.subject}
      </p>
      <CubidSignOutButton />
    </section>
  );
}

export function App() {
  return (
    <CubidAuthProvider
      clientId="your-client-id"
      issuer="https://staging-id.cubid.me"
      postLogoutRedirectUri="http://localhost:5173/"
      redirectUri="http://localhost:5173/auth/callback"
    >
      <SiwcPanel />
    </CubidAuthProvider>
  );
}
```

`CubidAuthProvider` requires passkey assurance by default. Only set
`requirePasskey={false}` for an explicitly scoped compatibility test.

## App-Specific Setup Checklist

For SmarTrust, i-am-human, ChainCrew, and starter/demo apps:

1. Register the app as an OIDC relying party in the Cubid environment it will
   use.
2. Register exact callback and post-logout redirect URIs for local, preview,
   staging, and production domains.
3. Request only the minimum scopes needed. Start with `openid profile email`.
4. Ensure sign-in launches include `acr_values=urn:cubid:acr:passkey`.
5. Confirm the app stores only app-scoped OIDC identifiers, such as the pairwise
   `sub`, and does not depend on global Cubid user IDs.
6. Keep the callback route able to resume the original app flow after Cubid
   passkey login, account creation, or recovery.
7. Test three paths: new user creates passkey, returning user authenticates with
   passkey, and lost-passkey user recovers at Cubid and returns to the app.

Starter/demo apps can show the OIDC calls and responses in a panel to teach
developers what is happening, but that panel should still use the real hosted
Cubid flow. Do not mock passkey or recovery behavior in the consuming app.

## Validation Checklist

Before calling a consuming app integration ready:

- Discovery returns the expected issuer metadata from
  `/.well-known/openid-configuration`.
- Authorization URL includes PKCE, `openid`, and passkey ACR.
- The user lands at `login.cubid.me` for passkey login, creation, consent, and
  recovery.
- The callback verifies `state`, token issuer, audience, expiry, and nonce.
- `/userinfo` succeeds with the returned access token.
- The app creates its own session from app-scoped claims.
- Logout clears the app session and routes through Cubid logout when needed.
- Lost-passkey recovery returns to the original app flow after Cubid enrolls a
  fresh passkey.

Current hosted recovery provider validation depends on the Login deployment
having OAuth state and provider credentials configured. Missing Google or GitHub
provider configuration is a Cubid-hosted recovery blocker, not a consuming-app
SDK responsibility.
