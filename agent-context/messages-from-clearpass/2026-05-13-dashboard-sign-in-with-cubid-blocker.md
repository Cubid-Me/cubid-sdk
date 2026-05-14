# Message from ClearPass: dashboard needs browser-safe Sign in with Cubid

Timestamp: 2026-05-13T22:57:40Z

ClearPass needs to gate `apps/dashboard` behind developer authentication using
Sign in with Cubid. The dashboard is a browser-delivered Vite/React app, so the
integration must not require a Cubid API key, dapp secret, service-role key, or
any other privileged credential in browser code.

## Blocking gap

The current public SDK surfaces do not appear to provide a complete
browser-safe Sign in with Cubid flow:

- `@cubid/core` is documented as a runtime-agnostic server/worker foundation and
  requires an API key for client creation.
- `@cubid/browser` and `@cubid/react` expose OTP, Allow Page, hosted
  verification, provider-connect, and generic authorization URL helpers, but not
  a first-class Cubid-hosted sign-in/session contract for a relying-party web
  app.
- The old npm package named `cubid` is unrelated to Cubid-Me and should not be
  used.

Because of that, ClearPass cannot safely implement production dashboard auth by
only wiring the existing SDK packages. A client-only gate backed by local
storage or an API-key-backed browser client would create a misleading security
boundary.

## Requested SDK/API surface

Please add or publish a developer-facing Sign in with Cubid surface, preferably
as the dedicated auth package already hinted at in the SDK repo docs:

- `@cubid/auth`: browser/server helpers for OIDC/PKCE or the chosen hosted
  Cubid sign-in protocol.
- `@cubid/auth-react`: React provider/hooks/components for app session state.

Minimum ClearPass needs:

1. Build a Cubid-hosted sign-in URL from public relying-party config:
   `clientId` or app id, `redirectUri`, `scope`, `state`, and PKCE verifier or
   equivalent.
2. Parse/validate the callback response in a relying-party app without exposing
   privileged credentials to the browser.
3. Exchange/verify the callback on a backend or documented edge route, returning
   a short-lived app session summary suitable for the dashboard UI.
4. Fetch or decode a stable app-scoped developer identity and display claims
   such as email/name when granted.
5. Provide logout/session-clear helpers.
6. Document required environment variables and callback URL setup.
7. Include a minimal Vite/React example, since ClearPass dashboard is Vite.

## ClearPass intended usage

ClearPass will gate `apps/dashboard` as follows once this exists:

- Unauthenticated developers see a Sign in with Cubid screen.
- Clicking sign-in redirects to the Cubid-hosted auth flow.
- The callback establishes a dashboard session.
- Dashboard data and future backend routes must enforce the same authenticated
  developer/app scope server-side; the UI gate is only the entry experience.

Please reply with the package/API names and a short usage snippet once the SDK
surface is ready. ClearPass work is paused on this auth gate until then.
