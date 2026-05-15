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

- Status: Not started
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-allow-page-grants.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`, session: s67-flexible-messaging-roadmap-intake

Track the future public SDK surface for flexible messaging without collapsing
signed-in user messaging profile management into dapp server notification APIs.
Keep hosted Allow Page category grants modeled as permission state only, route
signed-in channel and preference helpers toward a future `@cubid/comms` package
family, and reserve future server-safe send and status helpers for
`@cubid/core` once the messaging roadmap is explicitly promoted.

### S13.1 Define the package boundary for flexible messaging helpers

- Status: Not started
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-allow-page-grants.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`, session: s67-flexible-messaging-roadmap-intake

Document that signed-in messaging profile helpers belong in a future
`@cubid/comms` package family rather than `@cubid/core`, and keep hosted Allow
Page category-grant routes out of `@cubid/browser` until the product roadmap
explicitly promotes them.

### S13.2 Add signed-in channel metadata helpers in a future `@cubid/comms`

- Status: Not started
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`, session: s67-flexible-messaging-roadmap-intake

When flexible messaging is promoted, add public wrappers for
`POST /api/notifications/channels/list` and
`POST /api/notifications/channels/update` that expose only channel id/type,
provider key, label, masked display hint, verification/status/default flags,
and timestamps.

### S13.3 Add signed-in channel verification lifecycle helpers in a future `@cubid/comms`

- Status: Not started
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`, session: s67-flexible-messaging-roadmap-intake

When flexible messaging is promoted, add typed wrappers for
`POST /api/notifications/channels/start-verification` and
`POST /api/notifications/channels/complete-verification` while keeping email
and Telegram setup flows fail-closed and avoiding any claim that provider
delivery or bot-handshake readiness is already complete.

### S13.4 Add signed-in global preference helpers in a future `@cubid/comms`

- Status: Not started
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`, session: s67-flexible-messaging-roadmap-intake

When flexible messaging is promoted, add wrappers for
`POST /api/notifications/preferences/list` and
`POST /api/notifications/preferences/update` that stay limited to the global
category defaults for `SECURITY`, `TRANSACTIONAL`, and `WORKFLOW`.

### S13.5 Model Allow Page category grants as permission metadata, not channel access

- Status: Not started
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-allow-page-grants.md`, session: s67-flexible-messaging-roadmap-intake

Keep Allow Page category grants Passport-hosted for now. If the SDK later
surfaces them, represent them only as category permission state and never as
access to destinations, channel selection, or delivery capability.

### S13.6 Add server-safe notification send helpers in a future `@cubid/core`

- Status: Not started
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-send-route.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-email-provider.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-telegram-provider.md`, `agent-context/messages-from-cubid-passport/2026-05-15-flexible-messaging-abuse-controls.md`, session: s67-flexible-messaging-roadmap-intake

When the messaging roadmap is promoted, add server-safe `@cubid/core` wrappers
for `POST /api/v3/notifications/send` with required idempotency, typed
categories and priorities, and explicit browser-safety guidance that Cubid dapp
API keys must stay on the app backend.

### S13.7 Normalize flexible messaging send errors and accepted-versus-delivered semantics

- Status: Not started
- Session-log reference(s): incoming messages `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-send-route.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-email-provider.md`, `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-telegram-provider.md`, `agent-context/messages-from-cubid-passport/2026-05-15-flexible-messaging-abuse-controls.md`, session: s67-flexible-messaging-roadmap-intake

When those send helpers land, model `status: "accepted"` as Cubid accepting
and routing the event rather than guaranteed provider delivery. Preserve stable
error codes such as `notification_grant_required`,
`notification_provider_disabled`, and `notification_quota_exceeded` as
structured send outcomes instead of retryable transport failures.

### S13.8 Add server-safe notification status helpers in a future `@cubid/core`

- Status: Not started
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-15-flexible-messaging-status-history.md`, session: s67-flexible-messaging-roadmap-intake

When the messaging roadmap is promoted, add server-safe `@cubid/core` wrappers
for `POST /api/v3/notifications/status` that return event status, selected
channel type, latest delivery state, and redacted delivery attempts without
exposing raw user ids, destinations, ciphertext, provider secrets, or
cross-app data.

### S13.9 Keep Passport-user notification history routes out of ordinary dapp SDK usage

- Status: Not started
- Session-log reference(s): incoming message `agent-context/messages-from-cubid-passport/2026-05-15-flexible-messaging-status-history.md`, session: s67-flexible-messaging-roadmap-intake

Treat `POST /api/notifications/history/list` as a Passport-user profile route,
not as a normal dapp SDK surface. If it is exposed later, keep it behind the
same signed-in account-management boundary as future `@cubid/comms` helpers
rather than mixing it into server-authenticated dapp APIs.
