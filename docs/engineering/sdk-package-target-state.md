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

JSR should remain intentionally narrow. Use JSR only for runtime-agnostic
packages with a real Deno or Supabase Edge value proposition. Under the current
public package policy, that means `@cubid/core` only; the auth, auth-react,
browser, React, wagmi, and transitional compatibility packages remain npm-only
by design.

Public SDK packages should use explicit package-level licenses. `@cubid/core`
is Apache-2.0; app and service workspaces in this monorepo are not automatically
covered by that SDK package license.

Target packages:

- `@cubid/core`: required runtime-agnostic foundation
- `@cubid/auth`: runtime-agnostic OIDC and PKCE helpers
- `@cubid/auth-react`: React auth/session bindings
- `@cubid/browser`: headless browser integration helpers
- `@cubid/react`: React hooks and components built on `@cubid/browser`
- `@cubid/evm`: EVM wallet and signing logic, using `viem` only when needed
- `@cubid/wagmi`: wagmi-specific React/EVM integration
- `@cubid/solana`: Solana wallet and signing logic
- `@cubid/cardano`: Cardano wallet and signing logic
- `@cubid/sui`: Sui wallet and signing logic
- `@cubid/near`: NEAR wallet and signing logic
- `@cubid/auth-react`: React auth/session helpers
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

`@cubid/core` should also carry the canonical public stamp-id registry and
small app-scoped subject helpers so downstream apps can stay aligned with
Passport's disclosure-aware identity model without depending on private backend
packages or copying stamp-id maps by hand.

The current custody-chain surface on those helpers includes `evm`, `near`,
`solana`, and `sui`. The SDK must keep those helpers limited to public account
metadata and must not grow private-key or custody-secret return values.

`@cubid/core` should also carry the future dapp-facing API v3 signing-request
lifecycle wrappers because those routes are runtime-agnostic HTTP contracts.
Keep Passport-hosted list, approve, and reject routes out of the public SDK
surface unless a later account-management or auth boundary is explicitly
introduced.

When those wrappers land, expose only redacted signing-request summaries:
`signingRequestId`, `status`, `chain`, `requestType`, `payloadHash`,
`payloadSummary`, `policyVersion`, `requiredAcr`, timestamps, and `result` only
after completion. Do not expose raw signing payloads, raw Cubid internal IDs,
private keys, encrypted key material, or private custody data.

SIWC05's additive transaction risk and policy fields should be modeled as
optional summary metadata in `@cubid/core` types, not as a signal that
transaction signing is enabled. Approval remains Passport-hosted, and dapp API
keys must not approve signing requests.

`@cubid/browser` may depend on `@cubid/core`. It owns browser-safe hosted
verification helpers, OTP/browser flow orchestration, AllowPage URL/state
helpers, and other client helpers that do not require React.

`@cubid/react` may depend on `@cubid/browser` and `@cubid/core`. It owns React
hooks, React components, and context/provider helpers. It must not become the
home for protocol logic that belongs in core or the generic browser layer.

If the SDK later adds UI for signing-request summaries, statuses, or risk
labels, that presentation work may live in `@cubid/react` or
browser-framework-specific adapters. The signing-request approval authority
itself remains Passport-hosted and out of scope for these packages.

Future user-authenticated disclosure-grant management routes, such as Allow
Page grant listing or revocation, should not be treated as dapp server APIs in
`@cubid/core`. If the public SDK exposes them later, they should sit behind a
dedicated account-management or auth boundary.

`@cubid/core` now exposes runtime-agnostic webhook verification helpers. They
should keep verifying Cubid's exact raw-body signature contract and preserve
both canonical `eventType` and transition-friendly `legacyEventType` fields in
public types and examples.

`@cubid/auth` now owns the browser-safe Sign in with Cubid OIDC foundation. It
should stay runtime-agnostic and web-standard only: PKCE verifier and challenge
helpers, state and nonce generation, authorization URL builders, callback
parsing, token exchange and userinfo helpers, logout and session-clear helpers,
and structured auth errors. It must not require a Cubid dapp API key, client
secret, service-role credential, Passport internal token, or any other
privileged material in browser code.

`@cubid/auth-react` now owns the React layer for Sign in with Cubid. It should
provide provider, hook, callback, sign-in, and logout ergonomics for browser
apps while keeping protected-route authorization and server-side scope
enforcement outside the SDK package itself.

Future webhook type updates should treat SIWC wallet events as additive to that
same verified envelope, including:

- `wallet.created`
- `wallet.signing_request.created`
- `wallet.policy.denied`
- `wallet.signing_request.approved`
- `wallet.signing_request.rejected`
- `wallet.signing_request.cancelled`
- `wallet.signing_request.step_up_failed`
- `wallet.signature.completed`
- `wallet.signature.failed`

Do not add transaction webhook expectations until Passport explicitly enables
transaction signing and publishes the corresponding wallet transaction events.

Chain packages own chain-specific wallet, key, and signing behavior. Each chain
package should avoid cross-chain assumptions. `@cubid/evm` may depend on
`viem`; `@cubid/wagmi` is the only package that may depend on `wagmi`.

Future smart-account, session-key, paymaster, and gas-sponsorship APIs should
also be capability-driven rather than universal. Keep app-scoped generated
custody accounts as the default public model unless Passport later exposes
explicit capability fields or feature gates for optional account modes.

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
- Use `@cubid/auth` for runtime-agnostic hosted OIDC and PKCE helpers, and
  keep `@cubid/auth-react` for React-specific auth/session bindings.
- Use the relevant chain package when a feature requires chain-specific key,
  wallet, signing, transaction, or SDK dependencies.
- Put wagmi integrations only in `@cubid/wagmi`.
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
- `@cubid/auth` now exists as the primary browser-safe OIDC and PKCE surface
  for Sign in with Cubid relying-party clients.
- `@cubid/auth-react` now exists as the React session and callback layer for
  Sign in with Cubid relying-party clients.
- `@cubid/react` now exists as the primary React surface for OTP forms, hosted
  verification widgets, provider connect buttons, and optional React context.
- `@cubid/web2` and `@cubid/web2-react` now remain only as frozen deprecated
  compatibility wrappers around those renamed packages.
- `@cubid/evm` now exists as the first real chain-specific package.
- `@cubid/web3` remains the interim shared wallet package while the split
  continues into `@cubid/evm`, `@cubid/wagmi`, and later chain-specific
  packages.

Live npm and JSR publication are complete for `@cubid/core`. See
`docs/engineering/package-migration-plan.md` for the rename and split plan.
Machine-readable API reference artifacts live under `docs/reference/api/` for
the primary public packages and should stay aligned with the package export
surfaces.
