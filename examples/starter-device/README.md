# Starter: first physical-device browser test

The user selected the existing [Cubid Starter](https://github.com/Cubid-Me/cubid-starter-v3)
as the first real-device Cubid login client. It is a Next.js web application.
The first selected device is the user's **iPhone, using Safari** and the existing
**SIWC / SSO protocol demo** panel. This selection does not require an Expo app, native build,
custom scheme, universal link or app-store signing.

This SDK-owned slice supplies a credential-free preflight and an acceptance
runbook. It does not start or deploy a server. The separate
[Expo reference](../expo-siwc/README.md) remains source preparation for
[SDK #47](https://github.com/Cubid-Me/cubid-sdk/issues/47); a mobile web pass
does not satisfy that issue's native production-client/device acceptance.

## Inspected baseline and preserved work

Read-only inspection on **2026-10-17**:

| Surface | Evidence / implication |
| --- | --- |
| Migrated canonical checkout | `/Volumes/IomegaAPFS/src/cubid/cubid-starter-v3` |
| Local branch and HEAD | `codex/starter-production-deploy`, `3aeb602d0671b0278f3cfca5debfb4567cb0ad9c` |
| Remote main | `6791ec0888f34ad64eec9b9c053f2ec10d57e20e`, merged [PR #5](https://github.com/Cubid-Me/cubid-starter-v3/pull/5); no open Starter PR found |
| Existing dirty work | Four modified files (`README.md`, `package.json`, SIWC helper and its tests); untracked workflow, evidence directory and two smoke files. Preserved; no second Starter checkout created. |
| App/build | Next 16.2.6, React 19.2.4; `next dev/build/start`; Vitest, ESLint and TypeScript. No native manifest, binary, scheme or device build setup. |
| Existing backend | Next API routes under `/api/cubid/siwc/{start,callback,session,logout}`. Same-origin browser cookies; no separate native RPC server. |
| Local SDK resolution | Workspace and dependency links still use `../cubid-sdk-v2/packages/*`; the external-volume compatibility symlink resolves, but this follows the canonical SDK feature checkout rather than this stream's reviewed dev source. |
| Hosted package source | Existing Vercel installer pins SDK `f4da898446618ae1b3615784cc963a78509687cc`; it does not consume the newer dev compatibility work. Do not run this disposable-build installer in the shared source tree: it replaces a sibling SDK directory. |
| Migration leftovers | README and app-project UI metadata still name `/Users/botmaster/src/...`; the old Starter path currently resolves through a compatibility symlink to the external volume. That alias does not reconfigure a hosted client or update documentation. |

The existing `.env.local` was inspected for **key names only**. It contains
legacy browser/API variable names; no dedicated `CUBID_SIWC_*` keys were present.
Their presence does not prove values or registration. The server helper falls
back to public issuer/client values and derives its callback from the request
origin when a dedicated redirect is absent. For device acceptance use explicit
server configuration and an independently confirmed exact callback.

Historical local deployment evidence records `https://starter.cubid.me` and
`https://id.cubid.me`, a public-web client, exact server callback and Vercel
Next/Node 24 hosting. This is **historical production evidence**, not a fresh
health check or an approved isolated dev environment. No hosted request,
deployment, registration, credential entry or domain mutation was performed.

## Smallest compatible integration

Reuse the existing server-mediated panel. Start discovers endpoints, creates
S256/state/nonce and sets ten-minute HttpOnly/Secure-on-HTTPS/SameSite=Lax
transaction cookies. Callback exchanges the code on the server, validates the
ID token and nonce, obtains UserInfo and returns to a same-origin path. The
panel already supports normal SSO, force login (`prompt=login&max_age=0`), force
consent and Starter-only logout.

The current start route **always requests passkey ACR**. Keep that baseline for
this first pass. A Google hint must not weaken passkey assurance; the current
Starter route has no provider-hint integration. Ordinary Google entry and
optional-consent acceptance remain separate Identity-owned work under the
[federation v1 contract](https://github.com/Cubid-Me/cubid-monorepo/blob/dev/docs/engineering/federated-login-contract-v1.md).
Do not use a Google SDK, substitute provider tokens, overload `login_hint` or
infer live provider readiness from discovery syntax.

The selected flow is an **educational demo**, not an app authorization boundary:
the redacted demo-session cookie is JSON/base64url, not a signed session
credential. Its summary helper treats a decoded cookie as signed in and does
not independently enforce its `expiresAt`. A displayed status or reload is not
proof of authorization, renewal or server-enforced expiry. Do not gate real
actions on it. Stronger session storage/expiry is a separate Starter proposal
if acceptance expands to protected actions.

Proposed isolated-dev environment (placeholders, **not configured here**):

```sh
CUBID_SIWC_ISSUER_URL=https://APPROVED-DEV-ISSUER
CUBID_SIWC_CLIENT_ID=APPROVED-EXISTING-PUBLIC-WEB-CLIENT
CUBID_SIWC_REDIRECT_URI=https://APPROVED-DEV-STARTER/api/cubid/siwc/callback
CUBID_SIWC_SCOPE=openid
```

Use an already approved HTTPS host reachable from the phone and its exact
registered callback. Phone `localhost` is the phone, not this Mac; a plain LAN
HTTP origin is not an equivalent test. Identity owns issuer/client readiness;
the parent must identify the existing isolated host/client and exact reviewed
application/SDK revisions. No dapp API key, browser-only callback, native client
or new provider registration is needed for this bounded login panel.

Do not run install/build commands in the preserved dirty Starter checkout.
Propose its path/source-pin/config changes to the parent before a separate
Starter edit. The first test can use an already approved suitable deployment;
otherwise approved isolated deployment/configuration is the concrete next gate.

## Credential-free preflight

After the parent confirms the dev tuple, Node 24+ can run this SDK tool:

```sh
node examples/starter-device/preflight.mjs \
  --origin https://APPROVED-DEV-STARTER \
  --issuer https://APPROVED-DEV-ISSUER \
  --client-id APPROVED-EXISTING-PUBLIC-WEB-CLIENT \
  --scope openid
```

All three values are required; there is no production/default target. Scope
must explicitly match the approved deployment; the default is `openid` alone.
The tool fetches discovery, unsigned session status and three authorization
launches. It never follows the authorization redirect, sends browser cookies,
submits credentials or completes login. It checks the discovered endpoint,
exact client/callback, S256, state/nonce presence, passkey ACR, scopes,
prompt/max-age modes and each transaction cookie's security attributes. Fixed
query parameters from discovery are preserved; S256 challenges are exactly 43
base64url characters. State, nonce, challenge and transaction-cookie values must
be fresh across the independent launches, and are retained only in memory.

Output contains fixed check labels and explicitly pending authenticated
acceptance. It omits URLs, identifiers, headers, cookies and response bodies.
These GET launches can create short-lived **dev** transactions; run only for
the confirmed environment. No live invocation was made during this slice.
The Starter's existing uncommitted hosted smoke remains untouched; this tool
adds explicit environment/client inputs and discovery-driven endpoint checking.

Offline regression tests use synthetic hosts and the reviewed SDK's actual
authorization builder:

```sh
pnpm --filter @cubid/auth build
cd packages/acceptance
node ../../node_modules/vitest/vitest.mjs run --config vitest.config.ts src/starter-device.acceptance.test.ts
```

## Operator-device acceptance

Open the verified approved dev Starter URL in **Safari on the user's iPhone**.
Use an approved marked non-personal fixture. Record only
OS/browser versions, reviewed deployment/SDK SHA, environment label, timestamp,
scenario result and redacted screenshots. Do not save HAR, callback URLs,
cookies, raw console/network traces, token bodies, subjects or personal data.
The operator performs passkey/biometric prompts; no credential automation.

Short operator pass: open the unsigned panel, tap **Sign in with Cubid**, complete
the fixture's passkey/consent, and confirm return to Starter. Then **Clear starter
session** and sign in again; try **Force login** (cancel once, retry successfully)
and **Force consent**; reload/background Safari and clear the session at the end.
Only provide the clickable URL after the isolated backend and exact callback
preflight are verified. A production URL or an invented Preview alias is not a
substitute for that verified target.

| Scenario | Expected observation / evidence |
| --- | --- |
| First open | Confirm approved dev origin/TLS, canonical Starter marker, unsigned panel and mobile usability. |
| New fixture user | Start SIWC, complete the supported Cubid passkey onboarding and consent, return to the exact Starter callback and see successful ordered redacted discovery/authorization/callback/token/UserInfo/session trace. Treat unsupported onboarding as a blocker, not a fabricated success. |
| Returning user | Reuse the approved fixture; verify return to the same app identity via server-side fixture evidence without logging the subject. Normal SSO may legitimately skip a new ceremony. |
| Force login | `prompt=login&max_age=0` produces fresh required passkey authentication; observe a bounded recoverable cancel/error path as well as success. |
| Force consent | Observe the hosted consent screen and complete the same minimal scopes; do not claim optional partial-consent behavior before Identity #192/#74 acceptance. |
| Cancel / interruption | Cancel at Cubid, then background/reopen the browser or interrupt return; no authenticated success for an incomplete flow. Restart cleanly using the panel. Never construct a raw callback from captured secrets. |
| Reload / local logout | Reload to observe the demo cookie; clear Starter session and confirm unsigned state. A subsequent normal start may reuse Cubid SSO; this is not issuer logout. Record lifetime observations separately from any session-policy decision. |
| Negative guards | Offline route tests cover missing config, state/nonce mismatch and unsafe return paths. Use synthetic cases; do not edit captured live transactions. |

Completion requires the actual authenticated phone round trip, ordered redacted
evidence, force modes, cancellation and local logout. Preflight, mobile viewport
screenshots and offline tests do not satisfy these observations. Original
[Starter #4](https://github.com/Cubid-Me/cubid-starter-v3/issues/4) remains the
hosted acceptance owner; [Starter #3](https://github.com/Cubid-Me/cubid-starter-v3/issues/3)
contains deployment prerequisites. Its historical Login stall was later marked
unblocked by monorepo #76/#83; retest current behavior rather than reimplementing
that solved predecessor. Credential-status/webhook [Starter #6](https://github.com/Cubid-Me/cubid-starter-v3/issues/6)
is separate scope.

Pending parent/operator inputs: approved isolated HTTPS Starter and issuer,
existing public-web client with exact callback, reviewed source pins and the
fixture/device/browser. Any missing host/client registration, access grant or
deployment requires separate approval; this slice changes none of them.
