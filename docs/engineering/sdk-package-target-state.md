# SDK Package Target State

This document defines the target public SDK ecosystem for Cubid. It complements
the agent backgrounder by translating the product principles into package
boundaries, dependency rules, and publishing ownership.

The canonical public SDK home is `Cubid-Me/cubid-sdk`. Private
identity-provider runtime work stays in `cubid-passport`.

## Package Ecosystem

Official packages are published under the npm org `@cubid/*`, owned by the
`cubid` npm organization and maintained by the `developers` team. Publishing
uses trusted publishing from GitHub Actions; do not publish official packages
from personal npm accounts or long-lived local tokens.

Public SDK packages should use explicit package-level licenses. `@cubid/core`
is Apache-2.0; app and service workspaces in this monorepo are not automatically
covered by that SDK package license.

Target packages:

- `@cubid/core`: required runtime-agnostic foundation
- `@cubid/browser`: headless browser integration helpers
- `@cubid/react`: React hooks and components built on `@cubid/browser`
- `@cubid/evm`: EVM wallet and signing logic, using `viem` only when needed
- `@cubid/wagmi`: wagmi-specific React/EVM integration
- `@cubid/solana`: Solana wallet and signing logic
- `@cubid/cardano`: Cardano wallet and signing logic
- `@cubid/sui`: Sui wallet and signing logic
- `@cubid/near`: NEAR wallet and signing logic
- `@cubid/auth`: later OAuth/OIDC client helpers
- `@cubid/auth-react`: later React auth/session helpers
- `@cubid/comms`: optional later communications helpers
- `@cubid/secrets`: optional later encryption and custody helpers

## Package Responsibilities

`@cubid/core` is the foundation. It owns API client wrappers, user creation,
identity and stamps, humanity score, location, basic secret API wrappers, shared
types, and structured errors. It must stay runtime-agnostic: no React, Next.js,
Node-only APIs, browser-only assumptions, wagmi, chain SDKs, or heavy
dependencies.

Disclosure-aware helpers in `@cubid/core` should treat
`selective_disclosure_grants` as the only active source of truth for app-facing
identity release. Legacy `stamp_dappuser_permissions` rows are migration input
only and should not reappear in public SDK assumptions or examples. Typed
`notGranted` response states should only be added where backend payloads
reliably distinguish privacy-limited success from genuinely empty data.

`@cubid/core` now exposes the first public API v3 write helpers for
`save_secret`, `accounts/generate`, and `accounts/list`. They should continue
to treat idempotency as part of the contract: accept caller-provided
idempotency keys, allow safe high-level defaults, and preserve backend
conflicts like `idempotency_conflict` and `request_in_progress` in structured
errors.

Legacy `POST /api/v2/save_secret` is removed and should not reappear in public
SDK wrappers or examples. The secret-write surface should continue to document
that there is no matching public decrypt/read helper today.

The current custody-chain surface on those helpers includes `evm`, `near`,
`solana`, and `sui`. The SDK must keep those helpers limited to public account
metadata and must not grow private-key or custody-secret return values.

`@cubid/browser` may depend on `@cubid/core`. It owns browser-safe hosted
verification helpers, OTP/browser flow orchestration, AllowPage URL/state
helpers, and other client helpers that do not require React.

`@cubid/react` may depend on `@cubid/browser` and `@cubid/core`. It owns React
hooks, React components, and context/provider helpers. It must not become the
home for protocol logic that belongs in core or the generic browser layer.

Future user-authenticated disclosure-grant management routes, such as Allow
Page grant listing or revocation, should not be treated as dapp server APIs in
`@cubid/core`. If the public SDK exposes them later, they should sit behind a
dedicated account-management or auth boundary.

Webhook verification helpers, when exposed publicly, should stay runtime-agnostic.
They should verify Cubid's exact raw-body signature contract and preserve both
canonical `eventType` and transition-friendly `legacyEventType` fields in
public types and examples.

Chain packages own chain-specific wallet, key, and signing behavior. Each chain
package should avoid cross-chain assumptions. `@cubid/evm` may depend on
`viem`; `@cubid/wagmi` is the only package that may depend on `wagmi`.

`@cubid/secrets`, if introduced, owns advanced encryption/custody helpers. Until
then, `@cubid/core` may expose typed API wrappers for basic secret operations
but should not accumulate heavy crypto custody dependencies.

## Placement Rules For Agents

- Default to `@cubid/core` for small runtime-agnostic API, type, and error
  helpers.
- Use `@cubid/browser` for browser-specific helpers that do not require a UI
  framework.
- Use `@cubid/react` for React-specific hooks, components, providers, and UI
  flows.
- Use the relevant chain package when a feature requires chain-specific key,
  wallet, signing, transaction, or SDK dependencies.
- Put wagmi integrations only in `@cubid/wagmi`.
- Reserve `@cubid/auth` and `@cubid/auth-react` for future hosted OIDC/login
  helpers instead of forcing those responsibilities into core or the generic
  React package.
- Treat future user-authenticated disclosure-grant management routes as
  account-management APIs, not dapp server APIs.
- Create or expand a specialized package when adding a heavy dependency would
  pollute core or force unrelated consumers to install ecosystem-specific code.
- Avoid duplicate protocol logic across packages; shared protocol contracts
  should live in core unless a stronger boundary is documented.

## Current E02 Direction

The current migration direction starts by publishing `@cubid/core` as the
npm-first foundation, then layers in package-ready integration surfaces:

- `@cubid/core` now owns the runtime-agnostic API client, identity sync helpers,
  normalized responses, Deno validation, and Edge examples.
- `@cubid/browser` now exists as the primary headless browser surface for
  hosted verification URLs, OTP orchestration, AllowPage helpers, and provider
  stamp sync.
- `@cubid/react` now exists as the primary React surface for OTP forms, hosted
  verification widgets, provider connect buttons, and optional React context.
- `@cubid/web2` and `@cubid/web2-react` now remain as compatibility wrappers
  around those renamed packages during the migration window.
- `@cubid/evm` now exists as the first real chain-specific package.
- `@cubid/web3` remains the interim shared wallet package while the split
  continues into `@cubid/evm`, `@cubid/wagmi`, and later chain-specific
  packages.

Live npm and JSR publication are complete for `@cubid/core`. See
`docs/engineering/package-migration-plan.md` for the rename and split plan.
