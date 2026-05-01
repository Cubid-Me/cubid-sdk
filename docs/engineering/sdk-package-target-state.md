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

`@cubid/browser` may depend on `@cubid/core`. It owns browser-safe hosted
verification helpers, OTP/browser flow orchestration, AllowPage URL/state
helpers, and other client helpers that do not require React.

`@cubid/react` may depend on `@cubid/browser` and `@cubid/core`. It owns React
hooks, React components, and context/provider helpers. It must not become the
home for protocol logic that belongs in core or the generic browser layer.

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
- Create or expand a specialized package when adding a heavy dependency would
  pollute core or force unrelated consumers to install ecosystem-specific code.
- Avoid duplicate protocol logic across packages; shared protocol contracts
  should live in core unless a stronger boundary is documented.

## Current E02 Direction

The current migration direction starts by publishing `@cubid/core` as the
npm-first foundation, then layers in package-ready integration surfaces:

- `@cubid/core` now owns the runtime-agnostic API client, identity sync helpers,
  normalized responses, Deno validation, and Edge examples.
- `@cubid/web2` is the interim home for the future `@cubid/browser` surface:
  hosted verification URLs, OTP orchestration, AllowPage helpers, and provider
  stamp sync.
- `@cubid/web2-react` is the interim home for the future `@cubid/react`
  surface: OTP forms, hosted verification widgets, provider connect buttons,
  and optional React context.
- `@cubid/web3` is the interim home for chain adapter boundaries that should
  split into `@cubid/evm`, `@cubid/wagmi`, and later chain-specific packages.

Live npm publication is complete for `@cubid/core`. JSR publication remains a
separate owner-side setup and release task. See
`docs/engineering/package-migration-plan.md` for the rename and split plan.
