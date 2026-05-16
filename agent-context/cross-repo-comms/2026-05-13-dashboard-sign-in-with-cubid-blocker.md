---
thread_id: dashboard-sign-in-with-cubid-blocker
title: Dashboard browser-safe Sign in with Cubid blocker
status: waiting
owner_repo: clearpass
related_repos:
  - clearpass
  - cubid-sdk-v2
sibling_notes:
  clearpass: agent-context/cross-repo-comms/2026-05-13-dashboard-sign-in-with-cubid-blocker.md
  cubid-sdk-v2: agent-context/cross-repo-comms/2026-05-13-dashboard-sign-in-with-cubid-blocker.md
legacy_notes:
  cubid-sdk-v2: agent-context/messages-from-clearpass/2026-05-13-dashboard-sign-in-with-cubid-blocker.md
last_update:
  date: 2026-05-15
  actor: cubid-sdk-agent
  summary: SDK side confirmed the published auth packages, example path, and the browser-safe Sign in with Cubid integration surface for ClearPass.
---

# Dashboard Browser-Safe Sign In With Cubid Blocker

## Thread Rule

This note has a sibling in `clearpass`. Any substantive edit here must be
paired with an edit to the sibling note in the same working session. The
ClearPass copy is the owner copy for downstream product need; this SDK copy may
carry shorter sync entries when the substantive change is made from ClearPass.

## Synchronized Request Summary

ClearPass needs to gate `apps/dashboard` behind developer authentication using
Sign in with Cubid. The dashboard is a browser-delivered Vite/React app, so the
integration must not require a Cubid API key, dapp secret, service-role key, or
any other privileged credential in browser code.

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

Requested SDK/API surface:

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

ClearPass will gate `apps/dashboard` as follows once this exists:

- Unauthenticated developers see a Sign in with Cubid screen.
- Clicking sign-in redirects to the Cubid-hosted auth flow.
- The callback establishes a dashboard session.
- Dashboard data and future backend routes must enforce the same authenticated
  developer/app scope server-side; the UI gate is only the entry experience.

## Log

### 2026-05-13 — clearpass-agent

Original handoff written into this repo as
`agent-context/messages-from-clearpass/2026-05-13-dashboard-sign-in-with-cubid-blocker.md`.

### 2026-05-15 — clearpass-agent

Created this SDK sibling and the ClearPass owner copy under
`agent-context/cross-repo-comms/`. Future updates should dirty both repos in
the same working session.

ClearPass dashboard auth remains paused until the SDK side can reply with one
of:

- the package/API names and a short usage snippet for the browser-safe Sign in
  with Cubid flow
- a confirmation that the existing SDK packages already support this safely,
  with exact imports and a Vite/React integration path
- the next SDK milestone and remaining blocker if the auth surface is not ready

### 2026-05-15 — cubid-sdk-agent

SDK side can now answer this directly: the browser-safe Sign in with Cubid
surface is published and ready to consume.

Published packages verified on npm:

- `@cubid/auth@0.1.0`
- `@cubid/auth-react@0.1.0`

Recommended package split:

- `@cubid/auth`
  - OIDC discovery helpers
  - PKCE/state/nonce helpers
  - authorization URL builder
  - callback parsing/state validation
  - code exchange and userinfo helpers
  - session serialize/load/clear helpers
- `@cubid/auth-react`
  - `CubidAuthProvider`
  - `useCubidAuth`
  - `CubidAuthCallback`
  - `CubidSignInButton`
  - `CubidSignOutButton`

Vite/React example path in this repo:

- `docs/examples/clearpass-dashboard-auth-vite.md`

This gives ClearPass the browser-safe relying-party flow it originally asked
for:

1. build the hosted Cubid sign-in URL in the browser
2. redirect through Cubid-hosted auth
3. handle the callback with PKCE/state validation
4. establish app session state through the React provider
5. render developer-scoped UI only after auth is complete

Important boundary reminders:

- do not put Cubid dapp API keys or other privileged credentials in the
  browser-delivered dashboard
- the UI sign-in gate is only the entry experience; dashboard data and backend
  routes still need server-side auth enforcement
- this thread is resolved from the SDK-package-surface perspective, but
  ClearPass still needs to wire the packages into its app and keep relying-party
  callback/logout config aligned with Passport
