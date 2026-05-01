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

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): session: s07-core-cross-registry-verification

The remaining cross-registry release task is owner-side JSR setup and first
live publication. `https://jsr.io/@cubid/core/meta.json` still returns 404, so
the package must be created or linked in JSR and then published through the
repo workflow before `jsr:@cubid/core` imports become live.

### S02. Rename the browser and React package layers

- Status: In progress
- Timestamp started: 2026-05-01T08:40:00Z
- Timestamp completed: TBD
- Feature branch: `dev`
- Head: `f46c24dc` at planning start
- Session-log reference(s): session: s08-package-migration-planning

Plan the migration from the interim `web2` package family toward clearer public
names:

- `@cubid/web2` -> `@cubid/browser`
- `@cubid/web2-react` -> `@cubid/react`

Preserve the useful hosted-verification, provider-connect, OTP, callback, and
profile-completion primitives while keeping browser-specific logic out of core
and React-specific logic out of the headless browser layer.

### S02.1 Keep the headless browser layer first-class

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): TBD

Before renaming packages, document and preserve the architectural rule that
browser integration is not the same thing as React. The public SDK should keep
a headless browser-safe layer for hosted verification launchers, OTP flow
orchestration, callback parsing, and other client-side helpers that do not
require a UI framework.

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

### S03. Split chain packages

- Status: In progress
- Timestamp started: 2026-05-01T08:40:00Z
- Timestamp completed: TBD
- Feature branch: `dev`
- Head: `f46c24dc` at planning start
- Session-log reference(s): session: s08-package-migration-planning

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
