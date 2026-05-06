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

### S02.5 Publish `@cubid/browser` and `@cubid/react`

- Status: Completed
- Timestamp started: 2026-05-03T00:35:00Z
- Timestamp completed: 2026-05-03T00:45:00Z
- Feature branch: `dev`
- Head: `16c8ae9d` at publish start
- Session-log reference(s): session: s17-browser-react-publish

Published `@cubid/browser@0.1.0` and `@cubid/react@0.1.0` to npm. Authenticated
npm access checks confirm both packages are public under the `cubid` org, even
though the anonymous `npm view` endpoint briefly lagged after publication.

### S02.6 Republish `@cubid/browser` and `@cubid/react` with npm-resolvable dependency metadata

- Status: Completed
- Timestamp started: 2026-05-03T22:05:00Z
- Timestamp completed: 2026-05-03T22:15:00Z
- Feature branch: `main`
- Head: `464e1949` at trusted-publisher retry start
- Session-log reference(s): incoming message `agent-context/messages-from-chaincrew/2026-05-03-published-package-workspace-dependency-note.md`, session: s23-chaincrew-workspace-dependency-followup, session: s27-package-metadata-republish

Corrective patch releases are now live:

- `@cubid/browser@0.1.1`
- `@cubid/react@0.1.1`

Verified npm metadata now resolves to normal package versions rather than
`workspace:*`.

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

### S03.4 Publish `@cubid/evm` and `@cubid/wagmi`

- Status: Completed
- Timestamp started: 2026-05-03T09:40:00Z
- Timestamp completed: 2026-05-03T09:47:00Z
- Feature branch: `dev`
- Head: `00770fe4` at publish start
- Session-log reference(s): session: s18-evm-wagmi-publish

Published `@cubid/evm@0.1.0` and `@cubid/wagmi@0.1.0` to npm. Authenticated
npm access checks confirm both packages are public under the `cubid` org.

### S03.5 Republish `@cubid/evm` and `@cubid/wagmi` with npm-resolvable dependency metadata

- Status: Completed
- Timestamp started: 2026-05-03T22:05:00Z
- Timestamp completed: 2026-05-03T22:15:00Z
- Feature branch: `main`
- Head: `464e1949` at trusted-publisher retry start
- Session-log reference(s): session: s23-chaincrew-workspace-dependency-followup, session: s27-package-metadata-republish

Corrective patch releases are now live:

- `@cubid/evm@0.1.1`
- `@cubid/wagmi@0.1.1`

Verified npm metadata now resolves to normal package versions rather than
`workspace:*`.

### S03.6 Keep future custody and chain helpers capability-driven

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-06-siwc07-smart-account-roadmap.md`, session: s30-siwc-wallet-event-and-capability-roadmap-ingest

When future account, chain, or EVM-specific helpers expand beyond the current
generated custody-account model, keep the public SDK capability-driven rather
than assuming every Cubid account is a smart account, has a paymaster, or
supports session keys.

Near-term defaults should remain app-scoped generated custody accounts with
Passport-hosted approval. If smart accounts, scoped session keys, paymasters,
or gas sponsorship land later, expose them through explicit capability fields,
feature flags, and policy-aware helpers instead of universal assumptions.

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

- Status: Completed
- Timestamp started: 2026-05-03T10:25:00Z
- Timestamp completed: 2026-05-03T22:40:00Z
- Feature branch: `dev`
- Head: `464e1949` at completion
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-04-30-e01-d01-app-scoped-disclosure-and-stamps.md`, `agent-context/messages-from-cubid-passport/2026-04-30-e01-disclosure-grant-persistence.md`, `agent-context/messages-from-cubid-passport/2026-04-30-e01-disclosure-filtering-runtime.md`, `agent-context/messages-from-cubid-passport/2026-05-03-e01-1-disclosure-fallback-retired.md`, session: s20-disclosure-grant-only-followup, session: s24-s05-disclosure-roadmap-followup, session: s28-s05-app-scoped-stamp-surface

Before adding new identity, disclosure, or stamp metadata helpers, reconcile the
public SDK surface with Passport's app-scoped subject model, selective-disclosure
grant contracts, and canonical stamp registry so the SDK does not expose raw
cross-app identifiers or drift from the backend's stamp definitions.

Current SDK docs and examples now treat persisted disclosure grants from at
least `allow_page` and `oidc` as the only active disclosure authority for
app-facing data. Legacy `stamp_dappuser_permissions` rows are migration input
only and must not be used as a fallback assumption in future helpers.

Future helper types should still distinguish privacy-limited outcomes such as
`notGranted` from `notVerified`, `notFound`, or transport failure so downstream
apps can explain why a score or stamp is absent without implying a backend
error. For now, only routes whose backend payloads reliably support that
distinction, such as profile and location helpers, should expose typed
`notGranted` states directly.

Profile and location disclosure claims now need the same treatment. Preserve
typed public claim names such as `profile:name`, `profile:*`, `profile`,
`cubid:profile`, `location:rough`, `location:approximate`, `location:exact`,
and `location:*` when evolving SDK response metadata.

Allow Page grant revocation remains authoritative because Passport clears the
matching legacy `stamp_dappuser_permissions` rows during migration as well, and
runtime disclosure checks no longer fall back to those rows.

### S05.1 Preserve typed disclosure metadata on routes that already prove privacy state

- Status: Completed
- Timestamp started: 2026-05-01T09:05:00Z
- Timestamp completed: 2026-05-03T10:25:00Z
- Feature branch: `dev`
- Head: `73060cd7` at latest doc follow-up
- Session-log reference(s): session: s09-profile-location-disclosure-taxonomy-inbox, session: s20-disclosure-grant-only-followup

Keep the current typed disclosure metadata on the helper routes whose payloads
already let the SDK distinguish privacy-limited success from missing transport
data, especially profile and location helpers.

### S05.2 Define the evidence threshold for future `notGranted` helper states

- Status: Completed
- Timestamp started: 2026-05-03T22:20:00Z
- Timestamp completed: 2026-05-03T22:40:00Z
- Feature branch: `dev`
- Head: `464e1949` at completion
- Session-log reference(s): session: s24-s05-disclosure-roadmap-followup, session: s28-s05-app-scoped-stamp-surface

Before adding typed `notGranted` outcomes to score, identity, or stamp helpers,
require one of the following backend signals:

- an explicit disclosure state or claim list in the response payload
- a route-specific null or omission contract that Passport documents as
  disclosure-limited success rather than missing data
- a separate metadata field that distinguishes "redacted for this app" from
  "no data exists"

Until then, keep those helpers normalized but disclosure-cautious in docs and
examples instead of overcommitting to privacy-state inference in runtime types.

### S05.3 Be ready to extend typed disclosure states when Passport exposes route-level signals

- Status: Completed
- Timestamp started: 2026-05-03T22:30:00Z
- Timestamp completed: 2026-05-03T22:40:00Z
- Feature branch: `dev`
- Head: `464e1949` at completion
- Session-log reference(s): session: s28-s05-app-scoped-stamp-surface

If Passport later adds route-level disclosure metadata for identity, stamps, or
scores, extend `@cubid/core` response types and helper docs in a way that keeps
`notGranted`, `notVerified`, `notFound`, and transport failure distinct for
downstream apps. The current tranche closes with canonical stamp-id helpers and
app-scoped subject helpers in place, while further route-level disclosure-state
expansion remains explicitly gated on backend evidence rather than guesswork.

### S06. Align future API v3 write helpers with idempotency requirements

- Status: Completed
- Timestamp started: 2026-05-03T22:25:00Z
- Timestamp completed: 2026-05-03T22:45:00Z
- Feature branch: `dev`
- Head: `1551368d` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-03-e02-6-api-v3-idempotency.md`, incoming message `agent-context/messages-from-cubid-passport/2026-05-03-c05-1-1-dapp-user-secret-v2-quarantine.md`, incoming message `agent-context/messages-from-cubid-passport/2026-05-03-c05-2-1-sui-v3-custody.md`, session: s25-s06-v3-idempotent-write-helpers

`@cubid/core` now exposes `saveSecret`, `generateAccount`, and `listAccounts`
as the first public API v3 write helpers. The write helpers accept optional
caller-owned idempotency keys, auto-generate secure defaults when omitted, and
preserve backend `idempotency_conflict` / `request_in_progress` semantics in
structured `CubidApiError` responses.

Legacy `POST /api/v2/save_secret` is now removed upstream and must stay absent
from the public SDK surface. The public secret helper path is v3-only and
should keep documenting that no public decrypt/read endpoint exists today.

The current custody-chain surface on `generateAccount` and `listAccounts`
includes `evm`, `near`, `solana`, and `sui`. Sui public addresses should stay
normalized to lowercase `0x...` strings, and the helpers must continue to
return public custody metadata only.

### S07. Align future webhook helpers and docs with the v3 delivery contract

- Status: Completed
- Timestamp started: 2026-05-03T22:50:00Z
- Timestamp completed: 2026-05-03T23:05:00Z
- Feature branch: `dev`
- Head: `fc9ab735` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-03-e02-7-api-v3-webhooks.md`, session: s26-s07-webhook-helpers

`@cubid/core` now exposes runtime-agnostic webhook verification helpers that
verify the v1 HMAC over the exact `eventId.timestamp.rawBody` input, preserve
`eventId` and timestamp as replay-protection inputs, and document canonical v3
event names alongside legacy transition names.

### S07.1 Extend webhook types and examples for SIWC wallet events

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-06-siwc06-wallet-webhook-contracts.md`, session: s30-siwc-wallet-event-and-capability-roadmap-ingest

Add the SIWC wallet and signing canonical event names to the public webhook
types and receiver examples:

- `wallet.created`
- `wallet.signing_request.created`
- `wallet.policy.denied`
- `wallet.signing_request.approved`
- `wallet.signing_request.rejected`
- `wallet.signing_request.cancelled`
- `wallet.signing_request.step_up_failed`
- `wallet.signature.completed`
- `wallet.signature.failed`

Treat these as additive to the existing webhook envelope and verification
helpers. Keep transaction webhook expectations fail-closed until Passport
explicitly enables transaction signing and separately announces
`wallet.transaction.submitted` or `wallet.transaction.failed`.

### S08. Add API v3 signing-request lifecycle wrappers in `@cubid/core`

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-06-siwc04-signing-request-lifecycle.md`, incoming message `agent-context/messages-from-cubid-passport/2026-05-06-siwc05-transaction-risk-controls.md`, session: s29-s08-signing-request-roadmap-ingest

Add typed runtime-agnostic API v3 wrappers in `@cubid/core` for the dapp-facing
signing request lifecycle routes:

- `createSigningRequest(...)`
- `getSigningRequest(...)`
- `listSigningRequests(...)`
- `cancelSigningRequest(...)`

This surface belongs in `@cubid/core` because it wraps public HTTP contracts
without requiring React, browser-only routing, or hosted approval UX. The SDK
should expose only redacted request metadata such as `signingRequestId`,
`status`, `chain`, `requestType`, `payloadHash`, `payloadSummary`,
`policyVersion`, `requiredAcr`, timestamps, and `result` only after completion.

Do not expose or expect raw signing payloads in public summaries, raw Cubid
internal IDs, private keys, encrypted key material, or other private custody
data. Passport-hosted approval and rejection flows remain outside this repo,
and transaction-signing clients must stay fail-closed until Passport explicitly
announces signature enablement.

Before starting runtime implementation, handle the adjacent incoming Passport
notes `2026-05-06-siwc06-wallet-webhook-contracts.md` and
`2026-05-06-siwc07-smart-account-roadmap.md` so the contract surface is planned
with the later wallet-event and smart-account notes in view.

### S08.1 Add shared request and response types for create/get/list/cancel

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): session: s29-s08-signing-request-roadmap-ingest

Define the shared public request and response types for the API v3
signing-request lifecycle. The create route should accept the app-scoped user
and account identifiers, `requestType`, redacted `payloadSummary`, and the
structured payload inputs Passport documents for message and typed-data signing.

### S08.2 Require idempotency handling on create

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): session: s29-s08-signing-request-roadmap-ingest

Keep `createSigningRequest(...)` aligned with the existing API v3 write-helper
pattern: require or safely generate `Idempotency-Key`, preserve backend
conflict semantics, and document the caller-owned retry story clearly.

### S08.3 Normalize redacted response metadata only

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): session: s29-s08-signing-request-roadmap-ingest

Normalize only the redacted public signing-request metadata returned by
Passport. Do not surface raw request payloads, raw user identifiers, or other
private custody material through `@cubid/core`.

### S08.4 Include additive SIWC05 risk and policy fields on summaries

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): session: s29-s08-signing-request-roadmap-ingest

Extend the future signing-request summary types to accept the optional SIWC05
risk and policy fields when present:

- `riskLevel`
- `riskReasons`
- `policyDecision`
- `stepUpRequired`
- `transactionOperationType`
- `transactionRecipient`
- `transactionContractAddress`
- `transactionDeclaredValueUsd`

### S08.5 Keep transaction-signing paths fail-closed until Passport explicitly enables them

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): session: s29-s08-signing-request-roadmap-ingest

Even after the signing-request wrappers land, treat transaction-signing requests
as policy-denied and deferred. SDK examples and client helpers should display
risk and policy metadata when available, but must not imply that transaction
signatures are supported until a later Passport note explicitly says they are.
