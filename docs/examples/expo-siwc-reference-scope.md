# Bounded Expo reference integration for SDK #47

## What the issue requires

[SDK #47](https://github.com/Cubid-Me/cubid-sdk/issues/47) asks for a **runnable
native authentication example**: a native public OIDC client, exact custom-scheme
callback, Expo system browser and deep-link handling, server-side code exchange
and ID-token validation, app-session persistence across cold start, and one
step-up-protected demonstration action. Its acceptance asks for production-client
new-user and returning-user passkey sign-in on a device.

That requires a native binary for the final acceptance pass. It does not require
a retail product, account-management UI, application business logic or a separate
implementation stream. A small SDK reference example is sufficient. Existing
Markdown sketches, synthetic tests and the [session measurement kit](./native-session-measurement.md)
are useful prerequisites; they cannot prove platform callback routing, actual
passkey UI, process death or persistence on a physical device.

The issue's [adopting-team offer](https://github.com/Cubid-Me/cubid-sdk/issues/47#issuecomment-5752260751)
proposes a contribution and asks to agree its shape. It does not establish a
separate Starter-team assignment. This SDK stream can own the bounded example;
there is no need to create a new product team or session merely to demonstrate SDK use.

## Read-only Starter assessment

`Cubid-Me/cubid-starter-v3` describes itself as a single full-stack Next.js App
Router starter. Its current server-mediated SIWC routes are browser-oriented:
start redirects to Cubid and writes an HTTP-only transaction cookie; callback
reads that cookie, performs exchange/validation, writes the demo session cookie
and redirects to a same-origin web page. Session status reads the browser cookie.

Those routes are useful protocol reference material. A native custom-scheme
callback plus an app-server completion API needs an explicit transaction/device
binding and app-session delivery/storage contract; reusing the web routes unchanged
would assume browser and native API requests share the same cookies. Do not make
that assumption or weaken cookie/redirect protections to adapt the example.

Inspected evidence on 2026-10-15:

- Remote `main`: `6791ec0888f34ad64eec9b9c053f2ec10d57e20e`.
- Local branch: `codex/starter-production-deploy` at
  `3aeb602d0671b0278f3cfca5debfb4567cb0ad9c`, with existing modified/untracked work.
  It is not a clean example baseline to copy or replace.
- No open Starter PR or `.github/CODEOWNERS` assignment was found in the inspected
  GitHub evidence. Repository ownership is the Cubid-Me organization; a contributor
  history is not a current implementation assignment.
- The local deployment-branch README pins an older reviewed SDK source for deployment.
  Do not assume it already consumes the new native/step-up APIs.

No Starter file, branch, dependency, worktree, registration or deployment was changed.
Its unique local work must remain intact. A second repository/worktree is unnecessary
for the recommended deliverable.

## Recommended smallest useful deliverable

Destination: **`cubid-sdk/examples/expo-siwc/`**, owned by this existing SDK stream.
Keep it private and isolated from the published package entry points. Use the
existing SDK checkout/worktree; do not restructure Starter or create a new repository.

| Part | Bounded responsibility |
| --- | --- |
| One native screen | Sign in, minimal status, cancel, sign out and confirm one harmless demo action; no retail flows |
| Expo shell | One exact configured scheme, system auth session, cold-launch callback delivery, explicit user-visible errors |
| App session | Host-selected secure storage of the example backend's app-session credential; no Cubid/provider tokens on device |
| Small reference RP backend | Existing public SDK discovery/PKCE/exchange/validation, private short-lived one-use transactions bound to the initiating app/device session, exact callback and nonce/subject checks |
| Demonstration step-up | Reuse the existing SDK #50 helper; verify freshness and same subject on the backend and authorize only a one-use no-op demo action |
| Tests and README | Synthetic issuer/store tests plus setup, trust boundaries, package source/version, device acceptance and session-measurement instructions |

Use `openid` alone unless the demonstration explicitly needs another consented
claim. Standard Cubid login remains the protocol boundary; no direct Google SDK,
provider-token exposure, alternate return URL or new issuer API is needed. A UI
selection hint is not proof or evidence that a provider is enabled.

The reference backend should have an explicit pluggable transaction/session store.
An in-memory **development-only** adapter can support the local example; it is not
a production account system or a promise of durability across backend restarts.
Production storage/provisioning and deployment are separate acceptance gates.
Do not copy private issuer runtime or dirty Starter implementation into this SDK.

Estimated code scope: roughly 12–18 small files in two implementation slices
(reference backend/store/tests, then native shell/adapters/README), about 1–2
focused engineering days before device testing. This is an estimate, not a device
acceptance or release-date commitment. The physical-device pass is separately
scheduled and depends on an approved existing client/environment and available devices.

## Decisions and dependencies

The destination above is a technical recommendation within the current SDK
examples scope, rather than a request to invent or fund a new application.
The parent can confirm it as routine stream ownership. If the adopting team has
already started an upstream example, coordinate with that exact contribution
before duplicating it. No such open SDK/Starter PR was found during this assessment.

Before hosted/device work, the owner must resolve:

- The already authorized native client, environment and exact callback, plus
  devices/builds for the acceptance pass. This assessment authorizes no new
  registration, credential entry, deployment or persistent access.
- Which reviewed SDK package version the example consumes. The issue asks for
  published `@cubid/auth`; publication is separately prohibited in this session.
  Offline development may pin the reviewed source/local package artifacts and
  label that explicitly; do not claim published-version compatibility until checked.
- Whether a reference backend remains local/development-only or receives a
  separately approved hosted endpoint/storage adapter for device testing.

There is no Identity wire change in this proposal. Coordinate with Identity only
if a concrete protocol gap emerges. The reference backend/store contract is
example-owned and must not be presented as a new Cubid endpoint.

## Independent SDK work while device acceptance waits

SDK #46 can finish the hook-level native handoff example and cohesive tests using
existing async storage and crypto injection, without adding an Expo dependency.
It must distinguish manual `performRedirect:false` from injected `navigate`;
passing both does not cause the SDK to invoke the navigator. This does not replace
the server-mediated architecture required by #47.

SDK #43/#44/#45/#48/#51 already have implementation/evidence in PR #59/#60;
#50 is on dev through PR #61 and #49 measurement preparation through PR #62.
Do not repeat those implementations just because their issues remain open.
#49's device observation and session-policy decision remain outstanding. #40 and
hosted federation acceptance remain dependent on runtime/consent/hosted evidence.
The explicitly deferred main-only PR #58 and unrelated stamps/inbox/application
work are outside this slice. FriendR #31 already has constants/classification tests
in the current SDK; verify acceptance coverage before proposing additional code.
