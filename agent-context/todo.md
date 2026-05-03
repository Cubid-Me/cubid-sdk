# Cubid SDK Todo

## Execution Protocol

- Treat this repo as the canonical public SDK home.
- Do not move private Passport/Admin/OIDC runtime code into this repo.
- If the local checkout is missing `.git`, note that explicitly in status updates and session logs before doing branch- or publish-related work.
- Keep todo state and implementation history separate: status here, narrative in `session-log.md`.

## S. SDK Foundation

### S01. Adopt `@cubid/core` as the canonical public API package

- Status: Completed
- Timestamp started: 2026-04-30T13:49:00Z
- Timestamp completed: 2026-04-30T14:10:00Z
- Feature branch: unavailable locally (`/Users/botmaster/src/cubid/cubid-sdk-v2` is missing `.git`)
- Head: unavailable locally (`/Users/botmaster/src/cubid/cubid-sdk-v2` is missing `.git`)
- Session-log reference(s): session: s01-core-adoption

Rename or replace `packages/api` with `packages/core`, port the stronger runtime-agnostic implementation from `cubid-passport`, preserve the useful SDK ergonomics that still fit the safer core posture, and update workspace dependencies so `@cubid/core` becomes the only public foundation package targeted for first release.

### S01.1 Reconcile old `@cubid/api` ergonomics with new `@cubid/core`

- Status: Completed
- Timestamp started: 2026-04-30T13:49:00Z
- Timestamp completed: 2026-04-30T14:10:00Z
- Feature branch: unavailable locally (`/Users/botmaster/src/cubid/cubid-sdk-v2` is missing `.git`)
- Head: unavailable locally (`/Users/botmaster/src/cubid/cubid-sdk-v2` is missing `.git`)
- Session-log reference(s): session: s01-core-adoption

Carry forward the useful older ergonomics that remain compatible with the stronger runtime-agnostic core posture, including broader route coverage, normalized responses, malformed-success handling, and endpoint-aware error metadata, while rejecting plaintext OTP exposure, framework coupling, and browser-sign-in flows that rely on dapp API keys.

### S01.2 Add Deno, Supabase Edge, npm, and JSR release validation

- Status: Completed
- Timestamp started: 2026-04-30T13:49:00Z
- Timestamp completed: 2026-04-30T14:10:00Z
- Feature branch: unavailable locally (`/Users/botmaster/src/cubid/cubid-sdk-v2` is missing `.git`)
- Head: unavailable locally (`/Users/botmaster/src/cubid/cubid-sdk-v2` is missing `.git`)
- Session-log reference(s): session: s01-core-adoption

Port Deno smoke checks, npm pack dry-runs, JSR dry-runs, and publish workflow scaffolding into this SDK repo so `@cubid/core` is validated as a public package from the correct canonical home.

### S01.3 Bootstrap-publish `@cubid/core@0.1.0`

- Status: Completed
- Timestamp started: 2026-05-01T00:00:00Z
- Timestamp completed: 2026-05-01T00:06:00Z
- Feature branch: `main`
- Head: `b77fba14` at bootstrap publish start
- Session-log reference(s): session: s05-core-bootstrap-publish

Bootstrap npm publication and GitHub trusted publishing are now in place for
`@cubid/core` from this SDK repo.

### S01.4 Finish `@cubid/core` cross-registry release verification

- Status: Completed
- Timestamp started: 2026-05-01T08:20:00Z
- Timestamp completed: 2026-05-01T08:32:00Z
- Feature branch: `dev`
- Head: `f0ca53b9` at verification start
- Session-log reference(s): session: s07-core-cross-registry-verification

Verified the current cross-registry release state for `@cubid/core` from this
SDK repo:

- npm `@cubid/core@0.1.0` is live
- npm trusted publishing is configured for `Cubid-Me/cubid-sdk`
- npm pack dry-run and JSR dry-run both pass locally
- docs now correctly describe JSR as pending rather than already live

### S01.5 Link and publish `@cubid/core` on JSR

- Status: Completed
- Timestamp started: 2026-05-01T09:22:00Z
- Timestamp completed: 2026-05-02T00:23:00Z
- Feature branch: `dev`
- Head: `fba54d8e` at live-publish attempt start
- Session-log reference(s): session: s07-core-cross-registry-verification, session: s11-core-jsr-live-publish-attempt, session: s14-core-jsr-live-publish-success

The owner-side JSR setup is complete and `@cubid/core@0.1.0` is now live at
`https://jsr.io/@cubid/core`.

The first GitHub Actions live publish attempt from `main` failed in run
`25208963795` with JSR `actorNotAuthorized`, which confirms the remaining
setup dependency that had to be fixed on the JSR side. After linking the
package to `Cubid-Me/cubid-sdk`, run `25265529712` succeeded and published the
package through the existing `.github/workflows/publish.yml` OIDC flow.

### S02. Rename the browser and React package layers

- Status: In progress
- Timestamp started: 2026-05-01T08:40:00Z
- Timestamp completed: TBD
- Feature branch: `dev`
- Head: `f46c24dc` at planning start
- Session-log reference(s): session: s08-package-migration-planning, session: s12-browser-react-package-slices

Continue the migration from the interim `web2` package family toward clearer
public names:

- `@cubid/web2` -> `@cubid/browser`
- `@cubid/web2-react` -> `@cubid/react`

Preserve the useful hosted-verification, provider-connect, OTP, callback, and
profile-completion primitives while keeping browser-specific logic out of core
and React-specific logic out of the headless browser layer.

### S02.4 Add explicit compatibility and deprecation messaging to the interim package names

- Status: Completed
- Timestamp started: 2026-05-02T00:35:00Z
- Timestamp completed: 2026-05-02T00:42:00Z
- Feature branch: `dev`
- Head: `24209743` at implementation start
- Session-log reference(s): session: s15-browser-react-release-prep

Added package-level README, metadata, and compatibility messaging for
`@cubid/web2` and `@cubid/web2-react` so the old names now clearly direct new
integrations toward `@cubid/browser` and `@cubid/react`.

### S02.1 Keep the headless browser layer first-class

- Status: Completed
- Timestamp started: 2026-05-01T09:30:00Z
- Timestamp completed: 2026-05-01T09:42:00Z
- Feature branch: `dev`
- Head: `fba54d8e` at implementation start
- Session-log reference(s): session: s12-browser-react-package-slices

`packages/browser` now exists as the first-class headless browser layer, and
`@cubid/web2` now re-exports it as a compatibility package. The public SDK
continues to keep hosted verification launchers, OTP flow orchestration,
callback parsing, and other client-side helpers outside of React.

### S02.2 Write the browser and React migration plan

- Status: Completed
- Timestamp started: 2026-05-01T08:40:00Z
- Timestamp completed: 2026-05-01T08:52:00Z
- Feature branch: `dev`
- Head: `f46c24dc` at planning start
- Session-log reference(s): session: s08-package-migration-planning

Document the staged migration from `@cubid/web2` to `@cubid/browser` and from
`@cubid/web2-react` to `@cubid/react`, including compatibility-package
strategy, preserved surface area, and release order.

### S02.3 Create the renamed browser and React package slices

- Status: Completed
- Timestamp started: 2026-05-01T09:30:00Z
- Timestamp completed: 2026-05-01T09:42:00Z
- Feature branch: `dev`
- Head: `fba54d8e` at implementation start
- Session-log reference(s): session: s12-browser-react-package-slices

Added `packages/browser` and `packages/react` from the existing public surfaces,
switched React imports to depend on `@cubid/browser`, and converted
`@cubid/web2` and `@cubid/web2-react` into compatibility re-export packages.

### S03. Split chain packages

- Status: In progress
- Timestamp started: 2026-05-01T08:40:00Z
- Timestamp completed: TBD
- Feature branch: `dev`
- Head: `f46c24dc` at planning start
- Session-log reference(s): session: s08-package-migration-planning, session: s13-evm-package-slice

Plan the migration from `@cubid/web3` into chain-specific packages such as `@cubid/evm`, `@cubid/wagmi`, `@cubid/solana`, `@cubid/cardano`, `@cubid/sui`, and `@cubid/near`, starting with lightweight contract boundaries before adding heavier SDK dependencies.

### S03.1 Write the chain package split plan

- Status: Completed
- Timestamp started: 2026-05-01T08:40:00Z
- Timestamp completed: 2026-05-01T08:52:00Z
- Feature branch: `dev`
- Head: `f46c24dc` at planning start
- Session-log reference(s): session: s08-package-migration-planning

Document the phased split from `@cubid/web3` into `@cubid/evm`,
`@cubid/wagmi`, and later chain-specific packages, including compatibility
package strategy and release order.

### S03.2 Create the first `@cubid/evm` package slice

- Status: Completed
- Timestamp started: 2026-05-01T09:42:00Z
- Timestamp completed: 2026-05-01T09:50:00Z
- Feature branch: `dev`
- Head: `fba54d8e` at implementation start
- Session-log reference(s): session: s13-evm-package-slice

Added `packages/evm` as the first chain-specific package, renamed the copied
wallet contracts to EVM-specific public types and factory names, and kept
`@cubid/web3` in place while later compatibility and ecosystem-specific splits
remain pending.

### S03.3 Create the first `@cubid/wagmi` package slice

- Status: Completed
- Timestamp started: 2026-05-02T00:35:00Z
- Timestamp completed: 2026-05-02T00:42:00Z
- Feature branch: `dev`
- Head: `24209743` at implementation start
- Session-log reference(s): session: s16-wagmi-package-slice

Added `packages/wagmi` as the wagmi-specific React integration layer on top of
`@cubid/evm`, including a hook-backed adapter helper and package-level tests
without leaking wagmi into the core, browser, or generic React packages.

### S04. Create dedicated auth package boundaries when OIDC is ready

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): TBD

When "Sign in with Cubid" becomes a public SDK surface, prefer a dedicated auth
package family such as `@cubid/auth` and `@cubid/auth-react` for PKCE/state
helpers, callback parsing, token exchange, userinfo/session helpers, and React
session bindings. Do not force those responsibilities into `@cubid/core`,
`@cubid/browser`, or `@cubid/react` unless a narrower shared helper is clearly
justified by real duplication.

Future user-authenticated disclosure-grant management routes such as
`/api/disclosures/app-grants/list` and `/api/disclosures/app-grants/revoke`
should be evaluated under this same boundary. If the SDK exposes them later,
model them as account-management APIs rather than dapp server APIs.

### S05. Align future identity and stamp helpers with app-scoped disclosure contracts

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-04-30-e01-d01-app-scoped-disclosure-and-stamps.md`, `agent-context/messages-from-cubid-passport/2026-04-30-e01-disclosure-grant-persistence.md`, `agent-context/messages-from-cubid-passport/2026-04-30-e01-disclosure-filtering-runtime.md`

Before adding new identity, disclosure, or stamp metadata helpers, reconcile the
public SDK surface with Passport's app-scoped subject model, selective-disclosure
grant contracts, and canonical stamp registry so the SDK does not expose raw
cross-app identifiers or drift from the backend's stamp definitions.

Future helper types should treat persisted disclosure grants from at least
`allow_page` and `oidc` as first-class sources, and should not assume legacy
`stamp_dappuser_permissions` rows are the only disclosure gate for stamp data.
They should also distinguish privacy-limited outcomes such as `notGranted`
from `notVerified`, `notFound`, or transport failure so downstream apps can
explain why a score or stamp is absent without implying a backend error.

Profile and location disclosure claims now need the same treatment. Preserve
typed public claim names such as `profile:name`, `profile:*`, `profile`,
`cubid:profile`, `location:rough`, `location:approximate`, `location:exact`,
and `location:*` when evolving SDK response metadata.

Allow Page grant revocation now also clears matching legacy
`stamp_dappuser_permissions` rows in Passport, so future disclosure-aware SDK
helpers should treat revocation as authoritative rather than assuming legacy
stamp fallback might still keep an app authorized.
