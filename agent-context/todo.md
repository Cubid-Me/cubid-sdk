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

- Status: Completed
- Timestamp started: 2026-05-01T08:40:00Z
- Timestamp completed: 2026-05-09T11:20:00Z
- Feature branch: `codex/s02-retire-web2-compat`
- Head: `f46c24dc` at planning start
- Session-log reference(s): session: s08-package-migration-planning, session: s12-browser-react-package-slices, session: s39-s02-compatibility-retirement

The rename from the interim `web2` package family toward clearer public names is
now complete:

- `@cubid/web2` -> `@cubid/browser`
- `@cubid/web2-react` -> `@cubid/react`

The old package names now remain only as frozen deprecated compatibility shims.
They stay installable to preserve existing imports, but the supported package
surfaces and normal release targets are now `@cubid/browser` and `@cubid/react`.

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

- Status: Completed
- Timestamp started: 2026-05-01T08:40:00Z
- Timestamp completed: 2026-05-15T00:05:00Z
- Feature branch: `dev`
- Head: `f46c24dc` at planning start
- Session-log reference(s): session: s08-package-migration-planning, session: s13-evm-package-slice, session: s66-web3-compatibility-closeout

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

- Status: Completed
- Timestamp started: 2026-05-07T12:10:00Z
- Timestamp completed: 2026-05-07T12:35:00Z
- Feature branch: `dev`
- Head: `9898fb0b` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-06-siwc07-smart-account-roadmap.md`, session: s30-siwc-wallet-event-and-capability-roadmap-ingest, session: s37-s03-capability-driven-chain-surface

When future account, chain, or EVM-specific helpers expand beyond the current
generated custody-account model, keep the public SDK capability-driven rather
than assuming every Cubid account is a smart account, has a paymaster, or
supports session keys.

Near-term defaults should remain app-scoped generated custody accounts with
Passport-hosted approval. If smart accounts, scoped session keys, paymasters,
or gas sponsorship land later, expose them through explicit capability fields,
feature flags, and policy-aware helpers instead of universal assumptions.

The current EVM, wagmi, and interim web3 packages now preserve optional
`capabilities` metadata on connections and verification results, and they
export small helper functions for capability checks instead of baking in smart
account defaults.

### S03.7 Create the first `@cubid/near` package slice

- Status: Completed
- Timestamp started: 2026-05-14T03:35:00Z
- Timestamp completed: 2026-05-14T04:10:00Z
- Feature branch: `codex/s03-chain-split-followup`
- Head: `8a846527` at implementation start
- Session-log reference(s): session: s51-near-package-slice

Added `packages/near` as the next chain-specific package on top of
`@cubid/core`, with NEAR-specific connection and stamp types, capability
metadata helpers, tests, publish-workflow wiring, and developer-ingestion docs.

### S03.8 Create the first `@cubid/solana` package slice

- Status: Completed
- Timestamp started: 2026-05-14T04:20:00Z
- Timestamp completed: 2026-05-14T04:50:00Z
- Feature branch: `codex/s03-chain-split-followup`
- Head: `ced815f3` at implementation start
- Session-log reference(s): session: s52-solana-package-slice

Added `packages/solana` as the next chain-specific package on top of
`@cubid/core`, with Solana-specific connection and stamp types, capability
metadata helpers, tests, publish-workflow wiring, and developer-ingestion docs.

### S03.9 Create the first `@cubid/sui` package slice

- Status: Completed
- Timestamp started: 2026-05-14T16:30:00Z
- Timestamp completed: 2026-05-14T17:15:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `a8ded0e0` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-03-c05-2-1-sui-v3-custody.md`, session: s55-sui-package-slice

Added `packages/sui` as the next chain-specific package on top of
`@cubid/core`, with canonical lowercase address normalization, capability
metadata helpers, tests, publish-workflow wiring, and developer-ingestion docs.

### S03.10 Create the first `@cubid/cardano` package slice

- Status: Completed
- Timestamp started: 2026-05-14T17:30:00Z
- Timestamp completed: 2026-05-14T18:15:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `50f8038a` at implementation start
- Session-log reference(s): session: s56-cardano-package-slice

Added `packages/cardano` as the next bounded chain-specific package on top of
`@cubid/core`, with Cardano-specific connection metadata, capability helpers,
tests, publish-workflow wiring, and developer-ingestion docs.

### S03.11 Create the first `@cubid/bitcoin` package slice

- Status: Completed
- Timestamp started: 2026-05-14T18:40:00Z
- Timestamp completed: 2026-05-14T19:05:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `b7b3919a` at implementation start
- Session-log reference(s): session: s57-bitcoin-package-slice

Added `packages/bitcoin` as the next bounded chain-specific package on top of
`@cubid/core`, with Bitcoin-specific connection metadata, capability helpers,
tests, publish-workflow wiring, and developer-ingestion docs.

### S03.12 Create the first `@cubid/starknet` package slice

- Status: Completed
- Timestamp started: 2026-05-14T19:10:00Z
- Timestamp completed: 2026-05-14T19:35:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `f2f2d9cb` at implementation start
- Session-log reference(s): session: s58-starknet-package-slice

Added `packages/starknet` as the next bounded chain-specific package on top of
`@cubid/core`, with Starknet-specific connection metadata, capability helpers,
tests, publish-workflow wiring, and developer-ingestion docs.

### S03.13 Create the first `@cubid/cosmos` package slice

- Status: Completed
- Timestamp started: 2026-05-14T19:40:00Z
- Timestamp completed: 2026-05-14T20:05:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `14e84812` at implementation start
- Session-log reference(s): session: s59-cosmos-package-slice

Added `packages/cosmos` as the next bounded chain-specific package on top of
`@cubid/core`, with Cosmos-specific connection metadata, capability helpers,
tests, publish-workflow wiring, and developer-ingestion docs.

### S03.14 Create the first `@cubid/polkadot` package slice

- Status: Completed
- Timestamp started: 2026-05-14T21:15:00Z
- Timestamp completed: 2026-05-14T21:45:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `e8b7cd77` at implementation start
- Session-log reference(s): session: s62-polkadot-package-slice

Added `packages/polkadot` as the next bounded chain-specific package on top of
`@cubid/core`, with Polkadot-specific connection metadata, capability helpers,
tests, publish-workflow wiring, and developer-ingestion docs.

### S03.15 Create the first `@cubid/aptos` package slice

- Status: Completed
- Timestamp started: 2026-05-14T21:55:00Z
- Timestamp completed: 2026-05-14T22:25:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `2e5bc0aa` at implementation start
- Session-log reference(s): session: s63-aptos-package-slice

Added `packages/aptos` as the next bounded chain-specific package on top of
`@cubid/core`, with Aptos-specific connection metadata, capability helpers,
tests, publish-workflow wiring, and developer-ingestion docs.

### S03.16 Create the first `@cubid/tezos` package slice

- Status: Completed
- Timestamp started: 2026-05-14T22:35:00Z
- Timestamp completed: 2026-05-14T23:05:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `5bde7b75` at implementation start
- Session-log reference(s): session: s64-tezos-package-slice

Added `packages/tezos` as the next bounded chain-specific package on top of
`@cubid/core`, with Tezos-specific connection metadata, capability helpers,
tests, publish-workflow wiring, and developer-ingestion docs.

### S03.17 Create the first `@cubid/stellar` package slice

- Status: Completed
- Timestamp started: 2026-05-14T23:15:00Z
- Timestamp completed: 2026-05-14T23:45:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `1feeede7` at implementation start
- Session-log reference(s): session: s65-stellar-package-slice

Added `packages/stellar` as the final currently planned bounded chain-specific
package on top of `@cubid/core`, with Stellar-specific connection metadata,
capability helpers, tests, publish-workflow wiring, and developer-ingestion
docs.

### S03.18 Start the `@cubid/web3` compatibility-closeout plan

- Status: Completed
- Timestamp started: 2026-05-14T20:40:00Z
- Timestamp completed: 2026-05-14T21:00:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `2a5312af` at implementation start
- Session-log reference(s): session: s61-web3-compatibility-closeout-planning

Turn the eventual `@cubid/web3` retirement into a concrete compatibility-closeout
plan now that multiple chain-specific packages exist. The plan should freeze
`@cubid/web3` as a legacy shared wallet surface, keep new chain-specific work
out of it, and break the remaining closeout into explicit migration,
deprecation, and release-policy steps.

### S03.19 Freeze `@cubid/web3` to the legacy shared wallet surface

- Status: Completed
- Timestamp started: 2026-05-14T23:55:00Z
- Timestamp completed: 2026-05-15T00:05:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `d45ebc79` at implementation start
- Session-log reference(s): session: s66-web3-compatibility-closeout

Keep `@cubid/web3` limited to the already-supported legacy shared wallet
surface instead of expanding it for newly extracted chains. New chain-specific
helpers should land only in their dedicated packages.

### S03.20 Add explicit `@cubid/web3` migration and deprecation messaging

- Status: Completed
- Timestamp started: 2026-05-14T23:55:00Z
- Timestamp completed: 2026-05-15T00:05:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `d45ebc79` at implementation start
- Session-log reference(s): session: s66-web3-compatibility-closeout

Update package metadata, README messaging, and developer docs so downstream
consumers are clearly pointed toward dedicated chain packages while preserving
the current compatibility surface for existing installs.

### S03.21 Move `@cubid/web3` out of the normal active-package path

- Status: Completed
- Timestamp started: 2026-05-14T23:55:00Z
- Timestamp completed: 2026-05-15T00:05:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `d45ebc79` at implementation start
- Session-log reference(s): session: s66-web3-compatibility-closeout

Once the migration messaging is live, treat `@cubid/web3` like a controlled
compatibility package rather than a primary forward-looking SDK surface. That
includes narrowing when it appears in release planning, roadmap summaries, and
package-selection guidance.

### S03.22 Write a downstream `@cubid/web3` migration guide

- Status: Completed
- Timestamp started: 2026-05-14T23:55:00Z
- Timestamp completed: 2026-05-15T00:05:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `d45ebc79` at implementation start
- Session-log reference(s): session: s66-web3-compatibility-closeout

Document how existing `@cubid/web3` consumers should move to the dedicated
chain packages, including the preserved adapter concepts, capability helpers,
and the right package choice by chain and framework.

### S03.23 Decide the final long-term `@cubid/web3` end state

- Status: Completed
- Timestamp started: 2026-05-14T23:55:00Z
- Timestamp completed: 2026-05-15T00:05:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `d45ebc79` at implementation start
- Session-log reference(s): session: s66-web3-compatibility-closeout

After the compatibility package is frozen and downstream migrations are in
motion, keep `@cubid/web3` as a long-lived frozen wrapper with manual-only
maintenance unless a later deliberate deprecation decision is made.

### S04. Create dedicated auth package boundaries for Sign in with Cubid

- Status: Completed
- Timestamp started: 2026-05-14T00:09:05Z
- Timestamp completed: 2026-05-14T00:55:02Z
- Feature branch: `codex/clearpass-dashboard-auth-roadmap`
- Head: `73f7ec18` at start
- Session-log reference(s): incoming ClearPass note `agent-context/messages-from-clearpass/2026-05-13-dashboard-sign-in-with-cubid-blocker.md`, incoming Passport handoff `agent-context/messages-from-cubid-passport/2026-05-14-clearpass-dashboard-oidc-contract.md`, session: s45-clearpass-dashboard-auth-roadmap, session: s46-auth-foundation-package, session: s47-auth-react-session-bindings, session: s48-clearpass-vite-auth-example, session: s49-clearpass-auth-handoff

When "Sign in with Cubid" becomes a public SDK surface, prefer a dedicated auth
package family such as `@cubid/auth` and `@cubid/auth-react` for PKCE/state
helpers, callback parsing, token exchange, userinfo/session helpers, and React
session bindings. Do not force those responsibilities into `@cubid/core`,
`@cubid/browser`, or `@cubid/react` unless a narrower shared helper is clearly
justified by real duplication.

ClearPass Dashboard is now the first concrete consumer. It is a browser-delivered
Vite/React app that needs Login with Cubid without a Cubid API key, dapp secret,
service-role credential, or OIDC signing material in browser code. This parent
todo stays open until the dedicated auth package surface, React bindings,
example, and ClearPass reply are complete.

Future user-authenticated disclosure-grant management routes such as
`/api/disclosures/app-grants/list` and `/api/disclosures/app-grants/revoke`
should be evaluated under this same boundary. If the SDK exposes them later,
model them as account-management APIs rather than dapp server APIs.

### S04.1 Add `@cubid/auth` OIDC and PKCE foundation

- Status: Completed
- Timestamp started: 2026-05-14T00:12:00Z
- Timestamp completed: 2026-05-14T00:36:04Z
- Feature branch: `codex/clearpass-dashboard-auth-roadmap`
- Head: `e0f07271` at start
- Session-log reference(s): incoming ClearPass note `agent-context/messages-from-clearpass/2026-05-13-dashboard-sign-in-with-cubid-blocker.md`; incoming Passport handoff `agent-context/messages-from-cubid-passport/2026-05-14-clearpass-dashboard-oidc-contract.md`; session: `s46-auth-foundation-package`

Create the runtime-agnostic Sign in with Cubid auth package for public OIDC clients. The package should use web-standard primitives only and expose helpers for PKCE verifier and challenge generation, state and nonce generation, authorization URL creation, callback parsing, token exchange request construction or execution with injected `fetch`, userinfo request helpers, logout/session-clear helpers, and structured auth errors. It must support browser-delivered public clients using Authorization Code + PKCE with token endpoint auth method `none`. It must not require a Cubid dapp API key, include private Passport/OIDC runtime code, depend on React, assume Node-only APIs, or expose any privileged credential path. ClearPass Dashboard should be treated as the first acceptance target.

### S04.2 Add `@cubid/auth-react` session bindings

- Status: Completed
- Timestamp started: 2026-05-14T00:37:00Z
- Timestamp completed: 2026-05-14T00:50:59Z
- Feature branch: `codex/clearpass-dashboard-auth-roadmap`
- Head: `651f9404` at start
- Session-log reference(s): incoming ClearPass note `agent-context/messages-from-clearpass/2026-05-13-dashboard-sign-in-with-cubid-blocker.md`; incoming Passport handoff `agent-context/messages-from-cubid-passport/2026-05-14-clearpass-dashboard-oidc-contract.md`; session: `s47-auth-react-session-bindings`

Add React bindings on top of `@cubid/auth` for browser apps that want a clean Login with Cubid experience. The package should provide a provider or hook surface for configured issuer/client metadata, sign-in launch, callback handling, session state, loading/error states, userinfo display metadata, and logout/session clearing. It should be usable from Vite/React and Next without privileged credentials in the browser. The React layer should not invent backend authorization; it should make the hosted Cubid OIDC flow ergonomic while documenting that protected dashboard data and app-specific server routes must still enforce the same authenticated session server-side.

### S04.3 Add a Vite ClearPass Dashboard auth example

- Status: Completed
- Timestamp started: 2026-05-14T00:51:00Z
- Timestamp completed: 2026-05-14T00:53:30Z
- Feature branch: `codex/clearpass-dashboard-auth-roadmap`
- Head: `08724d5b` at start
- Session-log reference(s): incoming ClearPass note `agent-context/messages-from-clearpass/2026-05-13-dashboard-sign-in-with-cubid-blocker.md`; incoming Passport handoff `agent-context/messages-from-cubid-passport/2026-05-14-clearpass-dashboard-oidc-contract.md`; session: `s48-clearpass-vite-auth-example`

Add a minimal Vite/React example showing how ClearPass Dashboard should use browser-safe Sign in with Cubid. The example should show public relying-party configuration, sign-in button or route guard, redirect/callback handling, session establishment, granted email/name display, logout, and failure states. It should clearly separate browser-safe values from server or edge responsibilities, and it should avoid local-storage-only security theater. If token exchange is demonstrated through a backend or edge route, document which values are public, which values are server-only, and how ClearPass should enforce authenticated developer/app scope on protected dashboard routes after the UI gate succeeds.

### S04.4 Reply to ClearPass with package names and usage

- Status: Completed
- Timestamp started: 2026-05-14T00:54:00Z
- Timestamp completed: 2026-05-14T00:55:02Z
- Feature branch: `codex/clearpass-dashboard-auth-roadmap`
- Head: `c8d649a0` at start
- Session-log reference(s): incoming ClearPass note `agent-context/messages-from-clearpass/2026-05-13-dashboard-sign-in-with-cubid-blocker.md`; incoming Passport handoff `agent-context/messages-from-cubid-passport/2026-05-14-clearpass-dashboard-oidc-contract.md`; session: `s49-clearpass-auth-handoff`

After `@cubid/auth`, `@cubid/auth-react`, and the ClearPass-oriented example are available, write a response note for ClearPass with package names, version or commit references, install commands, usage snippets, required environment variables, callback URL setup, staging and production issuer URLs, supported scopes, and what must remain server-side. The reply should explicitly say that ClearPass browser code must not contain Cubid dapp API keys, service-role credentials, OIDC signing keys, Passport internal tokens, or any other privileged material. Include validation evidence and any remaining hosted OIDC client setup or smoke-test blockers so ClearPass agents can resume dashboard auth implementation without guessing.

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

- Status: Completed
- Timestamp started: 2026-05-06T22:20:00Z
- Timestamp completed: 2026-05-06T22:45:00Z
- Feature branch: `dev`
- Head: `e6a41e46` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-06-siwc06-wallet-webhook-contracts.md`, session: s30-siwc-wallet-event-and-capability-roadmap-ingest, session: s33-siwc-signing-surface

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

- Status: Completed
- Timestamp started: 2026-05-06T22:20:00Z
- Timestamp completed: 2026-05-06T22:45:00Z
- Feature branch: `dev`
- Head: `e6a41e46` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-06-siwc04-signing-request-lifecycle.md`, incoming message `agent-context/messages-from-cubid-passport/2026-05-06-siwc05-transaction-risk-controls.md`, session: s29-s08-signing-request-roadmap-ingest, session: s33-siwc-signing-surface

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

- Status: Completed
- Timestamp started: 2026-05-06T22:20:00Z
- Timestamp completed: 2026-05-06T22:45:00Z
- Feature branch: `dev`
- Head: `e6a41e46` at implementation start
- Session-log reference(s): session: s29-s08-signing-request-roadmap-ingest, session: s33-siwc-signing-surface

Define the shared public request and response types for the API v3
signing-request lifecycle. The create route should accept the app-scoped user
and account identifiers, `requestType`, redacted `payloadSummary`, and the
structured payload inputs Passport documents for message and typed-data signing.

### S08.2 Require idempotency handling on create

- Status: Completed
- Timestamp started: 2026-05-06T22:20:00Z
- Timestamp completed: 2026-05-06T22:45:00Z
- Feature branch: `dev`
- Head: `e6a41e46` at implementation start
- Session-log reference(s): session: s29-s08-signing-request-roadmap-ingest, session: s33-siwc-signing-surface

Keep `createSigningRequest(...)` aligned with the existing API v3 write-helper
pattern: require or safely generate `Idempotency-Key`, preserve backend
conflict semantics, and document the caller-owned retry story clearly.

### S08.3 Normalize redacted response metadata only

- Status: Completed
- Timestamp started: 2026-05-06T22:20:00Z
- Timestamp completed: 2026-05-06T22:45:00Z
- Feature branch: `dev`
- Head: `e6a41e46` at implementation start
- Session-log reference(s): session: s29-s08-signing-request-roadmap-ingest, session: s33-siwc-signing-surface

Normalize only the redacted public signing-request metadata returned by
Passport. Do not surface raw request payloads, raw user identifiers, or other
private custody material through `@cubid/core`.

### S08.4 Include additive SIWC05 risk and policy fields on summaries

- Status: Completed
- Timestamp started: 2026-05-06T22:20:00Z
- Timestamp completed: 2026-05-06T22:45:00Z
- Feature branch: `dev`
- Head: `e6a41e46` at implementation start
- Session-log reference(s): session: s29-s08-signing-request-roadmap-ingest, session: s33-siwc-signing-surface

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

- Status: Completed
- Timestamp started: 2026-05-06T22:20:00Z
- Timestamp completed: 2026-05-06T22:45:00Z
- Feature branch: `dev`
- Head: `e6a41e46` at implementation start
- Session-log reference(s): session: s29-s08-signing-request-roadmap-ingest, session: s33-siwc-signing-surface

Even after the signing-request wrappers land, treat transaction-signing requests
as policy-denied and deferred. SDK examples and client helpers should display
risk and policy metadata when available, but must not imply that transaction
signatures are supported until a later Passport note explicitly says they are.

### S09. Establish testing strategy and acceptance governance for the public SDK repo

- Status: Completed
- Timestamp started: 2026-05-07T13:10:00Z
- Timestamp completed: 2026-05-07T14:05:00Z
- Feature branch: `dev`
- Head: `49d836a5` at implementation start
- Session-log reference(s): session: s34-repo-cleanup-control-plane, session: s38-testing-baseline-and-acceptance-harness

Turn the current ad hoc package-level validation into an explicitly documented
testing and acceptance strategy for this public SDK monorepo. The goal is to
make it clear what each layer proves locally and in CI before publish or merge.

### S09.1 Create a written testing strategy for the SDK monorepo

- Status: Completed
- Timestamp started: 2026-05-07T13:10:00Z
- Timestamp completed: 2026-05-07T14:05:00Z
- Feature branch: `dev`
- Head: `49d836a5` at implementation start
- Session-log reference(s): session: s34-repo-cleanup-control-plane, session: s38-testing-baseline-and-acceptance-harness

Document the intended test pyramid and validation responsibilities for:

- `@cubid/core` contract and normalization tests
- browser-flow helper tests in `@cubid/browser`
- React component tests in `@cubid/react`
- chain-package tests in `@cubid/evm`, `@cubid/wagmi`, and later chain splits
- package publish validation versus runtime behavior validation

The written strategy should explain what must pass locally, what CI enforces,
and what remains out of scope until a stronger acceptance harness exists.

### S09.2 Create a local acceptance harness for package-consumer flows

- Status: Completed
- Timestamp started: 2026-05-07T13:10:00Z
- Timestamp completed: 2026-05-07T14:05:00Z
- Feature branch: `dev`
- Head: `49d836a5` at implementation start
- Session-log reference(s): session: s34-repo-cleanup-control-plane, session: s38-testing-baseline-and-acceptance-harness

Add a small local acceptance harness that exercises the public SDK surfaces as a
consumer would, rather than only testing packages in isolation. Focus first on:

- server-only `@cubid/core` usage
- headless browser-hosted verification helpers in `@cubid/browser`
- React flow composition in `@cubid/react`

Keep the harness lightweight and local-first so future package and publish
changes can be validated against a realistic integration path before release.

### S09.3 Decide on and document coverage governance

- Status: Completed
- Timestamp started: 2026-05-07T13:10:00Z
- Timestamp completed: 2026-05-07T14:05:00Z
- Feature branch: `dev`
- Head: `49d836a5` at implementation start
- Session-log reference(s): session: s34-repo-cleanup-control-plane, session: s38-testing-baseline-and-acceptance-harness

Decide whether this repo should enforce line, branch, or package-level coverage
thresholds, and document the answer clearly. If coverage gates are adopted,
define:

- where coverage is generated
- what the minimum thresholds are
- which packages or suites they apply to
- how coverage is reviewed in CI and release decisions

If strict thresholds are deferred, document the reason plainly instead of
leaving coverage governance implicit.

### S10. Publish the API and SDK surfaces to developer-ingestion platforms

- Status: Completed
- Timestamp started: 2026-05-09T12:00:00Z
- Timestamp completed: 2026-05-09T13:30:00Z
- Feature branch: `codex/s02-retire-web2-compat`
- Head: `8c4e828c` at implementation start
- Session-log reference(s): session: s35-testing-and-distribution-roadmap-extension, session: s40-s10-developer-ingestion-publishing

Expand the public distribution strategy beyond "packages exist on npm" so the
Cubid API and SDKs are easier for developers and tooling to ingest, discover,
and work with.

### S10.1 Decide which packages should publish to JSR or remain npm-only

- Status: Completed
- Timestamp started: 2026-05-09T12:00:00Z
- Timestamp completed: 2026-05-09T13:30:00Z
- Feature branch: `codex/s02-retire-web2-compat`
- Head: `8c4e828c` at implementation start
- Session-log reference(s): session: s14-core-jsr-live-publish-success, session: s35-testing-and-distribution-roadmap-extension, session: s40-s10-developer-ingestion-publishing

`@cubid/core` is already live on JSR, but the broader package family still
needs an explicit distribution policy. Decide which packages belong on JSR,
which should remain npm-only, and why.

### S10.2 Publish machine-friendly API reference material

- Status: Completed
- Timestamp started: 2026-05-09T12:10:00Z
- Timestamp completed: 2026-05-09T13:30:00Z
- Feature branch: `codex/s02-retire-web2-compat`
- Head: `8c4e828c` at implementation start
- Session-log reference(s): session: s35-testing-and-distribution-roadmap-extension, session: s40-s10-developer-ingestion-publishing

Add a developer-ingestion surface for the public API and SDK contracts, such as
generated API reference docs or another machine-friendly contract artifact that
stays aligned with the published package surfaces.

### S10.3 Publish developer-facing reference and integration entrypoints

- Status: Completed
- Timestamp started: 2026-05-09T12:15:00Z
- Timestamp completed: 2026-05-09T13:30:00Z
- Feature branch: `codex/s02-retire-web2-compat`
- Head: `8c4e828c` at implementation start
- Session-log reference(s): session: s35-testing-and-distribution-roadmap-extension, session: s40-s10-developer-ingestion-publishing

Make the published SDK family easier to adopt by tightening the external
entrypoints developers actually use: package READMEs, registry metadata,
integration guides, and any hosted or registry-linked reference surfaces that
improve discovery and onboarding.

### S11. Add a ClearPass Verify helper surface without leaking provider internals

- Status: Completed
- Timestamp started: 2026-05-10T00:45:00Z
- Timestamp completed: 2026-05-10T01:20:00Z
- Feature branch: `codex/s02-retire-web2-compat`
- Head: `a6b8ea0d` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-09-clearpass-verify-stamp.md`, session: s40-s10-developer-ingestion-publishing, session: s41-ci-fix-and-clearpass-verify-helper

Add a browser or React helper surface for the new `clearpass_verify` stamp that
launches the Cubid-hosted ClearPass Verify flow, keeps ClearPass branded as a
third-party provider, refreshes disclosed stamps after return, and continues to
exclude raw ClearPass document, face, OCR, or biometric payloads from the SDK
surface.

### S12. Add SIWC wallet request, capability, and approval helper surfaces

- Status: Completed
- Timestamp started: 2026-05-14T05:20:00Z
- Timestamp completed: 2026-05-14T08:40:00Z
- Feature branch: `codex/s03-chain-split-followup`
- Head: `e1585a28` at implementation start
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-siwc09-passkey-account-creation.md`, `agent-context/messages-from-cubid-passport/2026-05-14-siwc10-wallet-capabilities.md`, `agent-context/messages-from-cubid-passport/2026-05-14-siwc12-evm-transaction-pilot.md`, `agent-context/messages-from-cubid-passport/2026-05-14-siwc13-solana-transaction-readiness.md`, `agent-context/messages-from-cubid-passport/2026-05-14-siwc14-sdk-wallet-release-handoff.md`, session: s53-siwc-wallet-handoff-ingest, session: s54-siwc-wallet-helper-release-surface

Wrap the new SIWC wallet helper contract in the public SDK so SmarTrust and
other dapps can stay fail-closed while using passkey-approved custody and
signing flows. This track should keep runtime-agnostic request and capability
helpers in `@cubid/core`, keep hosted user-approval helpers in `@cubid/browser`,
and continue excluding private keys, ciphertext, raw Cubid identity, and
browser-side privileged approval material from the public SDK.

### S12.1 Add wallet capability discovery helpers in `@cubid/core`

- Status: Completed
- Timestamp started: 2026-05-14T05:35:00Z
- Timestamp completed: 2026-05-14T08:40:00Z
- Feature branch: `codex/s03-chain-split-followup`
- Head: `c11a2cbe` at implementation start
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-siwc10-wallet-capabilities.md`, `agent-context/messages-from-cubid-passport/2026-05-14-siwc12-evm-transaction-pilot.md`, session: s54-siwc-wallet-helper-release-surface

Add runtime-agnostic helpers for `POST /api/v3/accounts/capabilities`,
including optional app-scoped account lookup by `dapp_user_uuid`, per-chain
wallet action flags, passkey-approved creation support, and fail-closed policy
fields when SIWC policy is missing or disabled.

### S12.2 Add passkey-approved account-request helpers in `@cubid/core`

- Status: Completed
- Timestamp started: 2026-05-14T05:35:00Z
- Timestamp completed: 2026-05-14T08:40:00Z
- Feature branch: `codex/s03-chain-split-followup`
- Head: `c11a2cbe` at implementation start
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-siwc09-passkey-account-creation.md`, `agent-context/messages-from-cubid-passport/2026-05-14-siwc14-sdk-wallet-release-handoff.md`, session: s54-siwc-wallet-helper-release-surface

Add `POST /api/v3/accounts/requests/create` and
`POST /api/v3/accounts/requests/get` wrappers with required idempotency on
create, stable public statuses such as `pending_user_approval`,
`policy_denied`, `approved`, `rejected`, `expired`, and `failed`, and public
account metadata only after approval.

### S12.3 Add browser-safe Passport approval helpers in `@cubid/browser`

- Status: Completed
- Timestamp started: 2026-05-14T05:35:00Z
- Timestamp completed: 2026-05-14T08:40:00Z
- Feature branch: `codex/s03-chain-split-followup`
- Head: `c11a2cbe` at implementation start
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-siwc09-passkey-account-creation.md`, `agent-context/messages-from-cubid-passport/2026-05-14-siwc14-sdk-wallet-release-handoff.md`, session: s54-siwc-wallet-helper-release-surface

Add browser-safe hosted approval and rejection helpers for Passport SIWC
account and signing requests. These helpers should stay in the headless browser
layer, require only public request identifiers, and document that final
approval still depends on a Passport-authenticated user session with fresh
passkey step-up.

### S12.4 Normalize SIWC error metadata and typed signing results

- Status: Completed
- Timestamp started: 2026-05-14T05:35:00Z
- Timestamp completed: 2026-05-14T08:40:00Z
- Feature branch: `codex/s03-chain-split-followup`
- Head: `c11a2cbe` at implementation start
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-siwc12-evm-transaction-pilot.md`, `agent-context/messages-from-cubid-passport/2026-05-14-siwc13-solana-transaction-readiness.md`, `agent-context/messages-from-cubid-passport/2026-05-14-siwc14-sdk-wallet-release-handoff.md`, session: s54-siwc-wallet-helper-release-surface

When Passport returns browser-safe SIWC error metadata, expose it through
structured SDK errors using `details.siwcCode`, `details.retryable`, and
`details.userAction`. Also add typed public result handling for message
signatures, EVM typed-data signatures, and the limited EVM signed-transaction
pilot result shape.

### S12.5 Keep transaction signing capability-gated and chain-specific

- Status: Completed
- Timestamp started: 2026-05-14T05:35:00Z
- Timestamp completed: 2026-05-14T08:40:00Z
- Feature branch: `codex/s03-chain-split-followup`
- Head: `c11a2cbe` at implementation start
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-siwc12-evm-transaction-pilot.md`, `agent-context/messages-from-cubid-passport/2026-05-14-siwc13-solana-transaction-readiness.md`, session: s54-siwc-wallet-helper-release-surface

Keep transaction signing explicitly fail-closed unless capability discovery and
policy metadata say otherwise. The SDK may expose the limited EVM Admin-policy
pilot and Solana readiness summaries, but it must continue warning that Cubid
does not broadcast EVM pilot transactions and that Solana transaction signing
remains disabled.

### S13. Add flexible messaging account-management helpers without exposing delivery internals

- Status: Completed
- Timestamp started: 2026-05-15T05:40:38Z
- Timestamp completed: 2026-05-15T07:12:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `848c4352` at implementation start
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-allow-page-grants.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`, session: s67-flexible-messaging-roadmap-intake, session: s76-notification-history-boundary

Track the future public SDK surface for flexible messaging without collapsing
signed-in user messaging profile management into dapp server notification APIs.
Keep hosted Allow Page category grants modeled as permission state only, route
signed-in channel and preference helpers toward a future `@cubid/comms` package
family, and reserve future server-safe send and status helpers for
`@cubid/core` once the messaging roadmap is explicitly promoted.

### S13.1 Define the package boundary for flexible messaging helpers

- Status: Completed
- Timestamp started: 2026-05-15T05:40:38Z
- Timestamp completed: 2026-05-15T05:40:38Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `848c4352` at implementation start
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-allow-page-grants.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`, session: s67-flexible-messaging-roadmap-intake, session: s68-comms-package-boundary

Document that signed-in messaging profile helpers belong in a future
`@cubid/comms` package family rather than `@cubid/core`, and keep hosted Allow
Page category-grant routes out of `@cubid/browser` until the product roadmap
explicitly promotes them.

### S13.2 Add signed-in channel metadata helpers in a future `@cubid/comms`

- Status: Completed
- Timestamp started: 2026-05-15T05:45:08Z
- Timestamp completed: 2026-05-15T05:45:08Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `f57cce5f` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`, session: s67-flexible-messaging-roadmap-intake, session: s69-comms-channel-metadata

When flexible messaging is promoted, add public wrappers for
`POST /api/notifications/channels/list` and
`POST /api/notifications/channels/update` that expose only channel id/type,
provider key, label, masked display hint, verification/status/default flags,
and timestamps.

### S13.3 Add signed-in channel verification lifecycle helpers in a future `@cubid/comms`

- Status: Completed
- Timestamp started: 2026-05-15T05:45:08Z
- Timestamp completed: 2026-05-15T05:45:08Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `96192119` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`, session: s67-flexible-messaging-roadmap-intake, session: s70-comms-channel-verification

When flexible messaging is promoted, add typed wrappers for
`POST /api/notifications/channels/start-verification` and
`POST /api/notifications/channels/complete-verification` while keeping email
and Telegram setup flows fail-closed and avoiding any claim that provider
delivery or bot-handshake readiness is already complete.

### S13.4 Add signed-in global preference helpers in a future `@cubid/comms`

- Status: Completed
- Timestamp started: 2026-05-15T05:50:33Z
- Timestamp completed: 2026-05-15T05:50:33Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `6395fe8a` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`, session: s67-flexible-messaging-roadmap-intake, session: s71-comms-global-preferences

When flexible messaging is promoted, add wrappers for
`POST /api/notifications/preferences/list` and
`POST /api/notifications/preferences/update` that stay limited to the global
category defaults for `SECURITY`, `TRANSACTIONAL`, and `WORKFLOW`.

### S13.5 Model Allow Page category grants as permission metadata, not channel access

- Status: Completed
- Timestamp started: 2026-05-15T05:52:52Z
- Timestamp completed: 2026-05-15T05:52:52Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `d3ff6b06` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-allow-page-grants.md`, session: s67-flexible-messaging-roadmap-intake, session: s72-comms-allow-page-grant-model

Keep Allow Page category grants Passport-hosted for now. If the SDK later
surfaces them, represent them only as category permission state and never as
access to destinations, channel selection, or delivery capability.

### S13.6 Add server-safe notification send helpers in a future `@cubid/core`

- Status: Completed
- Timestamp started: 2026-05-15T06:28:00Z
- Timestamp completed: 2026-05-15T06:28:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `54c2cb8c` at implementation start
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-send-route.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-email-provider.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-telegram-provider.md`, `agent-context/messages-from-cubid-passport/2026-05-15-flexible-messaging-abuse-controls.md`, session: s67-flexible-messaging-roadmap-intake, session: s73-core-notification-send-helper

Add server-safe `@cubid/core` wrappers for `POST /api/v3/notifications/send`
with required idempotency, typed categories and priorities, and explicit
browser-safety guidance that Cubid dapp API keys must stay on the app backend.

### S13.7 Normalize flexible messaging send errors and accepted-versus-delivered semantics

- Status: Completed
- Timestamp started: 2026-05-15T06:42:00Z
- Timestamp completed: 2026-05-15T06:42:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `f912504c` at implementation start
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-send-route.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-email-provider.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-telegram-provider.md`, `agent-context/messages-from-cubid-passport/2026-05-15-flexible-messaging-abuse-controls.md`, session: s67-flexible-messaging-roadmap-intake, session: s74-core-notification-send-errors

Model `status: "accepted"` as Cubid accepting and routing the event rather
than guaranteed provider delivery. Preserve stable error codes such as
`notification_grant_required`, `notification_provider_disabled`, and
`notification_quota_exceeded` as structured send outcomes instead of retryable
transport failures.

### S13.8 Add server-safe notification status helpers in a future `@cubid/core`

- Status: Completed
- Timestamp started: 2026-05-15T06:58:00Z
- Timestamp completed: 2026-05-15T06:58:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `1316386a` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-15-flexible-messaging-status-history.md`, session: s67-flexible-messaging-roadmap-intake, session: s75-core-notification-status-helper

Add server-safe `@cubid/core` wrappers for `POST /api/v3/notifications/status`
that return event status, selected channel type, latest delivery state, and
redacted delivery attempts without exposing raw user ids, destinations,
ciphertext, provider secrets, or cross-app data.

### S13.9 Keep Passport-user notification history routes out of ordinary dapp SDK usage

- Status: Completed
- Timestamp started: 2026-05-15T07:12:00Z
- Timestamp completed: 2026-05-15T07:12:00Z
- Feature branch: `codex/s03-main-release-followup`
- Head: `94c493e9` at implementation start
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-15-flexible-messaging-status-history.md`, session: s67-flexible-messaging-roadmap-intake, session: s76-notification-history-boundary

Treat `POST /api/notifications/history/list` as a Passport-user profile route,
not as a normal dapp SDK surface. If it is exposed later, keep it behind the
same signed-in account-management boundary as future `@cubid/comms` helpers
rather than mixing it into server-authenticated dapp APIs.

### S14. Adopt passkey-first recoverable wallet SDK direction

- Status: Completed
- Timestamp started: 2026-05-25T03:20:52Z
- Timestamp completed: 2026-05-25T04:18:00Z
- Feature branch: `codex/s14-recoverable-wallet-sdk`
- Session-log reference(s): incoming cross-repo notes `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-sdk-direction.md`, `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-error-taxonomy.md`, session: s90-recoverable-wallet-handoff

Track the SDK-side pivot from legacy SIWC wallet generation/signing toward
app-mediated recoverable embedded wallets. The SDK should model Cubid as an
identity-bound recovery provider, not as the wallet generator, normal signer,
transaction broadcaster, MPC provider, or server-side recovery-material reader.

### S14.1 Ingest recoverable-wallet Passport notes and update package boundaries

- Status: Completed
- Timestamp started: 2026-05-25T03:20:52Z
- Timestamp completed: 2026-05-25T03:20:52Z
- Feature branch: `codex/s14-recoverable-wallet-sdk`
- Session-log reference(s): session: s83-recoverable-wallet-direction-intake

Commit the inbound Passport notes, add a session-log intake entry, and update
repo-status, AGENTS guidance, the backgrounder, and target-state docs. Record
that backend recovery routes are available and smoke-tested, and that old SIWC
wallet-generation/signing docs are now superseded for new integrations.

### S14.2 Add server-safe recovery bundle wrappers in `@cubid/core`

- Status: Completed
- Timestamp started: 2026-05-25T03:20:52Z
- Timestamp completed: 2026-05-25T03:25:08Z
- Feature branch: `codex/s14-recoverable-wallet-sdk`
- Session-log reference(s): incoming cross-repo note `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-sdk-direction.md`, session: s84-core-recovery-bundle-helpers

Add typed API v3 helpers for `enrollRecoveryBundle`,
`getRecoveryBundleStatus`, `startRecoveryBundleRelease`,
`rotateRecoveryBundle`, and `revokeRecoveryBundle`. Dapp-authenticated routes
must use `api_key`; enroll, release-start, and rotate must require
`Idempotency-Key`; normalized responses must expose safe metadata only and
must not return recovery material, ciphertext, Vault metadata, raw Cubid user
ids, or service-role fields.

### S14.3 Mirror the browser-safe recoverable-wallet error taxonomy

- Status: Completed
- Timestamp started: 2026-05-25T03:20:52Z
- Timestamp completed: 2026-05-25T03:25:08Z
- Feature branch: `codex/s14-recoverable-wallet-sdk`
- Session-log reference(s): incoming cross-repo note `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-error-taxonomy.md`, session: s84-core-recovery-bundle-helpers

Add `CubidRecoverableWalletError`, `isCubidRecoverableWalletError`, and typed
recoverable-wallet error codes. Map Passport structured errors into this type
for both server-side recovery helpers and browser/client recovery helpers.

### S14.4 Add `@cubid/wallet-recovery` browser/client package

- Status: Completed
- Timestamp started: 2026-05-25T03:29:00Z
- Timestamp completed: 2026-05-25T03:34:00Z
- Feature branch: `codex/s14-recoverable-wallet-sdk`
- Session-log reference(s): incoming cross-repo note `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-sdk-direction.md`, session: s85-wallet-recovery-browser-package

Create a browser-safe npm-only package for hosted recovery launch and
user-authorized release completion. The package must accept a bearer token or
async token provider, never dapp API keys, and return opaque `bundleMaterial`
only from the user-authenticated completion path. Public app SDKs must not
expose Passport's user-wide recovery-bundle list until Passport provides an
app-scoped list contract.

### S14.5 Add `@cubid/wallet-recovery-react`

- Status: Completed
- Timestamp started: 2026-05-25T03:35:00Z
- Timestamp completed: 2026-05-25T03:43:00Z
- Feature branch: `codex/s14-recoverable-wallet-sdk`
- Session-log reference(s): incoming cross-repo note `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-sdk-direction.md`, session: s86-wallet-recovery-react-package

Create React helpers on top of `@cubid/wallet-recovery` for hosted recovery
launch and release completion. Keep `@cubid/auth-react` integration optional by
accepting token provider props rather than hard-coupling the packages. Do not
surface unscoped user-wide bundle visibility to calling dapps.

### S14.6 Deprecate legacy Cubid-generated wallet and normal-signing direction

- Status: Completed
- Timestamp started: 2026-05-25T03:44:00Z
- Timestamp completed: 2026-05-25T03:49:00Z
- Feature branch: `codex/s14-recoverable-wallet-sdk`
- Session-log reference(s): incoming cross-repo note `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-sdk-direction.md`, session: s87-legacy-wallet-direction-deprecation

Keep existing public exports working, but mark `generateAccount`, legacy SIWC
account-request helpers, and legacy SIWC signing-request helpers as deprecated
compatibility surfaces. Update docs so new integrations use host-created
wallet material plus Cubid recovery bundles.

### S14.7 Keep chain packages provider-abstract

- Status: Completed
- Timestamp started: 2026-05-25T03:50:00Z
- Timestamp completed: 2026-05-25T03:56:00Z
- Feature branch: `codex/s14-recoverable-wallet-sdk`
- Session-log reference(s): incoming cross-repo note `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-sdk-direction.md`, session: s88-chain-provider-abstract-docs

Update chain package docs and types only where needed so chain packages remain
wallet-provider adapters, not Cubid signing engines. Do not add Cubid normal
signing flows to chain packages.

### S14.8 Wire package publishing, API references, tests, and acceptance

- Status: Completed
- Timestamp started: 2026-05-25T03:57:00Z
- Timestamp completed: 2026-05-25T04:10:00Z
- Feature branch: `codex/s14-recoverable-wallet-sdk`
- Session-log reference(s): incoming cross-repo note `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-sdk-direction.md`, session: s89-recovery-package-wiring

Wire the new packages into workspace manifests, TypeScript aliases, Vitest,
API reference generation, publish workflow choices, README package matrix, and
the acceptance harness where useful. Bump changed public package versions and
keep JSR support limited to `@cubid/core`.

### S14.9 Write SDK-to-Passport release handoff

- Status: Completed
- Timestamp started: 2026-05-25T04:11:00Z
- Timestamp completed: 2026-05-25T04:18:00Z
- Feature branch: `codex/s14-recoverable-wallet-sdk`
- Session-log reference(s): incoming cross-repo notes `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-sdk-direction.md`, `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-error-taxonomy.md`, session: s90-recoverable-wallet-handoff

After implementation, update the sibling cross-repo notes with implemented
package names, exported helper names, version bumps, validation evidence, and
remaining boundaries for SmarTrust and other downstream apps. Leave sibling
note updates dirty in Passport unless explicitly asked to commit there.

### S15. Add passkey-first auth assurance ergonomics

- Status: Completed
- Timestamp started: 2026-06-11T19:34:08Z
- Timestamp completed: 2026-06-11T19:42:20Z
- Feature branch: `dev`
- Head: `38ba0aac` at implementation start

Add a public SDK ergonomics tranche for passkey-first OIDC/SIWC assurance
inspection without reviving direct WebAuthn SDK helpers. Consuming apps should
continue to redirect to Cubid-hosted Identity/Login surfaces for passkey
account creation, returning-user authentication, cross-device handoff, consent,
and recovery. The SDK should help apps request and inspect passkey-backed
assurance from returned OIDC tokens and session state.

### S15.1 Track app-recoverable wallet hosted enrollment and recovery smoke gaps

- Status: Completed
- Timestamp started: 2026-06-11T19:29:30Z
- Timestamp completed: 2026-06-11T19:34:08Z
- Feature branch: `dev`
- Head: `efec4a65` at implementation start

Record and close the remaining app-recoverable-wallet validation gap: the SDK
and hosted Identity/Passport surfaces still need a real Cubid recovery SDK,
hosted enrollment, and hosted recovery smoke path that proves an app-created
recoverable wallet can enroll recovery material, launch Cubid recovery, release
the app-owned bundle material through the user-authorized path, and return to
the relying app without exposing recovery material to dapp server helpers or
ordinary browser state.

### S15.2 Type OIDC authentication assurance claims

- Status: Completed
- Timestamp started: 2026-06-11T19:34:08Z
- Timestamp completed: 2026-06-11T19:35:28Z
- Feature branch: `dev`
- Head: `38ba0aac` at implementation start

Add explicit typed `acr?: string` and `amr?: string[]` fields to
`CubidIdTokenClaims` so apps can rely on the public TypeScript contract when
inspecting passkey-backed Cubid sessions.

### S15.3 Add passkey-assurance inspection helpers

- Status: Completed
- Timestamp started: 2026-06-11T19:35:28Z
- Timestamp completed: 2026-06-11T19:37:31Z
- Feature branch: `dev`
- Head: `5b284d8b` at implementation start

Add small helper functions such as `hasCubidPasskeyAssurance(...)` and
`getCubidAuthAssurance(...)` so apps can inspect returned ID-token claims,
decoded claims, or SDK session objects without manually parsing raw `acr` and
`amr` values.

### S15.4 Expose assurance status through `@cubid/auth-react`

- Status: Completed
- Timestamp started: 2026-06-11T19:37:31Z
- Timestamp completed: 2026-06-11T19:40:16Z
- Feature branch: `dev`
- Head: `91740607` at implementation start

Expose the same passkey-assurance status through the `@cubid/auth-react`
session context so React apps can render "passkey-backed" state, warnings, or
debug UI without manually parsing ID-token claims.

### S15.5 Refresh the passkey-first SIWC guide for hosted handoff and recovery

- Status: Completed
- Timestamp started: 2026-06-11T19:40:16Z
- Timestamp completed: 2026-06-11T19:41:00Z
- Feature branch: `dev`
- Head: `e975a093` at implementation start

Update the passkey-first SIWC guide with the now-proven Login/Identity-owned
QR handoff and lost-passkey recovery behavior. Keep the boundary explicit:
consuming apps start OIDC, receive callbacks, and validate their own app
session; they must not implement Cubid passkey ceremonies, recovery proof
collection, or recovery passkey enrollment locally.

### S16. Align SDK docs with the Identity protocol boundary

- Status: Completed
- Timestamp started: 2026-06-11T19:27:19Z
- Timestamp completed: 2026-06-11T19:29:30Z
- Feature branch: `dev`
- Head: `02d5393a` at implementation start
- Session-log reference(s): incoming cross-repo note `agent-context/cross-repo-comms/2026-06-11-identity-protocol-boundary-sdk-handoff.md`

Update public SDK docs, examples, package defaults, and generated API reference
text so `https://id.cubid.me` is the target stable SIWC/OIDC issuer and
Identity is described as the public protocol boundary. `https://login.cubid.me`
should be described only as a temporary compatibility host during cutover when
needed. SDK docs must not present Passport, Verify, Admin, or internal OIDC
interaction routes as SDK-callable SIWC internals, and verified identifier
release should use standard OIDC scopes and claims such as `email` and `phone`
according to Admin-configured SIWC page policy.

### S17. Add GlobalPayTo Pay-To SDK support from PR22 backend contracts

- Status: In progress
- Timestamp started: 2026-06-25T21:10:10Z
- Timestamp completed: TBD
- Feature branch: `codex/globalpayto-cubid-mvp-dependencies`
- Head: `be0b4810` at implementation start
- Session-log reference(s): incoming cross-repo notes `agent-context/cross-repo-comms/2026-06-24-globalpayto-cubid-mvp-dependencies.md`, `agent-context/cross-repo-comms/2026-06-24-globalpayto-pay-to-sdk-handoff.md`

Track public SDK support for the GlobalPayTo Pay-To MVP now that Cubid
monorepo PR22 has merged to `dev` and handed off the backend contract. The PR22
handoff note is authoritative where it differs from the earlier dependency
request. SDK work should preserve submitted-candidate and opaque-alias resolver
flows, server-only dapp API key use, browser-safe hosted action launch,
redacted lifecycle summaries, and `payment_intent_created`-only notification
support.

### S17.1 Ingest GlobalPayTo Pay-To SDK handoff and architecture

- Status: Completed
- Timestamp started: 2026-06-25T21:10:10Z
- Timestamp completed: 2026-06-25T21:10:10Z
- Feature branch: `codex/globalpayto-cubid-mvp-dependencies`
- Head: `be0b4810` at implementation start
- Session-log reference(s): incoming cross-repo notes `agent-context/cross-repo-comms/2026-06-24-globalpayto-cubid-mvp-dependencies.md`, `agent-context/cross-repo-comms/2026-06-24-globalpayto-pay-to-sdk-handoff.md`, session: GlobalPayTo Pay-To S17.1 handoff intake

Record both GlobalPayTo coordination notes, document PR22 as the platform
prerequisite, and publish the SDK-side package ownership and route-mapping
architecture. Do not add public SDK implementation code to `cubid-monorepo`.

### S17.2 Add server-only Pay-To request/response types in `@cubid/core`

- Status: Completed
- Timestamp started: 2026-06-25T21:16:28Z
- Timestamp completed: 2026-06-25T21:16:28Z
- Feature branch: `codex/globalpayto-cubid-mvp-dependencies`
- Head: `efb299ce` at implementation start
- Session-log reference(s): session: GlobalPayTo Pay-To S17.2/S17.3 core helpers

Add typed models for submitted-candidate eligibility, opaque alias resolution,
grant status, redacted lifecycle events, hosted action start, and
`payment_intent_created` notification helpers. Supported submitted-candidate
stamp types are `email`, `phone`, `github`, `google`, and `evm`. Supported
hosted action types are `setup`, `route_registration`, `route_authorization`,
`route_selection`, and `grant_revocation`.

### S17.3 Add `@cubid/core` server helpers

- Status: Completed
- Timestamp started: 2026-06-25T21:16:28Z
- Timestamp completed: 2026-06-25T21:16:28Z
- Feature branch: `codex/globalpayto-cubid-mvp-dependencies`
- Head: `efb299ce` at implementation start
- Session-log reference(s): session: GlobalPayTo Pay-To S17.2/S17.3 core helpers

Add server/Edge helpers for `checkPayToEligibility(candidates, dappUserUuid)`,
`resolvePayToAliases(aliases, dappUserUuid, resolverKey?)`,
`getPayToGrantStatus(dappUserUuid)`, `listPayToEvents(dappUserUuid, since?,
limit?)`, `startPayToAction(actionType, dappUserUuid, options?)`, and
`sendPaymentIntentCreatedNotification(dappUserUuid, payload)` against the
merged PR22 backend contracts. These helpers should be exposed on the existing
initialized `@cubid/core` client/config pattern, not as free functions that
hide base URL, fetch, credential, or auth behavior.

### S17.4 Preserve server-only API-key and idempotency boundaries

- Status: Completed
- Timestamp started: 2026-06-25T21:17:11Z
- Timestamp completed: 2026-06-25T21:17:11Z
- Feature branch: `codex/globalpayto-cubid-mvp-dependencies`
- Head: `b14af2ef` at implementation start
- Session-log reference(s): session: GlobalPayTo Pay-To S17.4 idempotency boundary

Keep dapp API keys server/Edge-only. `startPayToAction(...)` and notification
send must require or resolve `Idempotency-Key` through the existing SDK
idempotency pattern. Browser packages must never accept dapp API keys.

### S17.5 Add browser-safe hosted action helpers

- Status: Completed
- Timestamp started: 2026-06-25T21:19:25Z
- Timestamp completed: 2026-06-25T21:19:25Z
- Feature branch: `codex/globalpayto-cubid-mvp-dependencies`
- Head: `0151aae5` at implementation start
- Session-log reference(s): session: GlobalPayTo Pay-To S17.5 browser hosted action helper

Add `openPayToHostedAction(hostedUrl)` in the browser layer. Optional
signed-in Cubid-session wrappers for stamp and grant owner-management routes
are explicitly deferred unless the SDK already has a Cubid-authenticated
user-session pattern ready to carry bearer-token calls safely. User routes
remain owner-management routes, not resolver APIs.

### S17.6 Document and enforce anti-enumeration behavior

- Status: Completed
- Timestamp started: 2026-06-25T21:19:59Z
- Timestamp completed: 2026-06-25T21:19:59Z
- Feature branch: `codex/globalpayto-cubid-mvp-dependencies`
- Head: `b56cf7b0` at implementation start
- Session-log reference(s): session: GlobalPayTo Pay-To S17.6 anti-enumeration enforcement

Do not add a list-all-payment-stamps resolver helper. Eligibility and alias
resolution must stay submitted-candidate or opaque-alias based. Preserve
generic negative statuses such as `resolution_unavailable`, `no_events`,
`expired`, `wrong_user`, `unsupported_app_context`, `rate_limited`, `replay`,
and `mismatch` without expanding them into probing-friendly detail.

### S17.7 Add constrained payment notification support

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): TBD

Support only `payment_event_type: "payment_intent_created"` with
`category: "TRANSACTIONAL"` for the GlobalPayTo MVP. Do not add
`payment_received`, settlement, marketing, inbox, activity-feed, or generic
payment-status helpers.

### S17.8 Add docs, examples, API reference, and acceptance tests

- Status: Not started
- Timestamp started: TBD
- Timestamp completed: TBD
- Feature branch: TBD
- Head: TBD
- Session-log reference(s): TBD

Add GlobalPayTo resolver-backend and hosted-site examples, update generated API
reference artifacts for new exports, and add tests proving boolean eligibility
only, generic negative responses, no raw identifier leakage, redacted
lifecycle events, idempotent action start, and unsupported payment event
denial before event creation. Add explicit browser and React package tests
showing Pay-To helpers cannot accept dapp API keys.
