# Message from cubid-passport: ClearPass Dashboard OIDC auth contract

Timestamp: 2026-05-14T00:09:05Z

ClearPass Dashboard is the first concrete consumer for a browser-safe Sign in
with Cubid SDK surface. The dashboard is a Vite/React app and must authenticate
developers without placing a Cubid dapp API key, OIDC signing key, service-role
credential, Passport internal token, or any other privileged material in browser
code.

## Backend Contract

Use the standard Login with Cubid OIDC flow:

- Issuer discovery:
  - Production: `https://id.cubid.me/.well-known/openid-configuration`
  - Staging: `https://staging-id.cubid.me/.well-known/openid-configuration`
- Client type: `public_web`
- Grant type: `authorization_code`
- PKCE: required, `S256`
- Token endpoint auth method: `none`
- Initial scopes: `openid email profile`
- Hosted login and consent UX: Passport
- Public subject: pairwise OIDC `sub`, scoped to the ClearPass Dashboard client
- Browser credentials: none beyond public client metadata and transient
  PKCE/state/nonce values

The browser should build an authorization URL, redirect to Cubid, receive the
OIDC callback, and then exchange or verify the callback through the SDK's
documented browser/server pattern. ClearPass protected dashboard data and future
backend routes must still enforce the authenticated developer/app scope
server-side; a UI gate alone is not sufficient authorization.

## Expected Callback And Token Behavior

The callback should use normal OIDC Authorization Code semantics:

- Success query params include `code` and the original `state`.
- Error query params may include `error` and `error_description`.
- The SDK must validate `state` before exchange.
- The token exchange sends `client_id`, `code`, `redirect_uri`,
  `code_verifier`, and `grant_type=authorization_code`.
- ID token and userinfo claims may include `sub`, `email`, `email_verified`,
  `name`, and profile claims only when granted by consent and policy.
- `sub` is app-scoped and must not be treated as a raw Cubid user id.

## SDK Request

Please split and implement the existing `S04` auth-package roadmap around:

- `@cubid/auth`: runtime-agnostic PKCE/state helpers, authorization URL builder,
  callback parsing, token exchange/userinfo helpers, logout/session helpers, and
  structured auth errors.
- `@cubid/auth-react`: React provider/hooks/components for sign-in launch,
  callback handling, session state, logout, and user-safe error states.
- A minimal Vite/React example for ClearPass Dashboard.

Do not put this auth surface in `@cubid/core`, `@cubid/browser`, or the generic
`@cubid/react` package unless a very small shared helper is genuinely reused.

## Passport-Side Follow-Up

`cubid-passport` is tracking `B02.6` to register and smoke ClearPass Dashboard
as an OIDC relying party. That task will confirm the exact staging and
production redirect/logout URIs, seed or register the client without secrets,
and run a hosted OIDC smoke pass through authorize, Passport login/consent,
token, userinfo, and logout.
