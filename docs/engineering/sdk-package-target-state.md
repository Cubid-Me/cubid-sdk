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
browser, React, wagmi, wallet-recovery, chain, and transitional compatibility
packages remain npm-only by design.

Public SDK packages should use explicit package-level licenses. `@cubid/core`
is Apache-2.0; app and service workspaces in this monorepo are not automatically
covered by that SDK package license.

Target packages:

- `@cubid/core`: required runtime-agnostic foundation
- `@cubid/auth`: runtime-agnostic OIDC and PKCE helpers
- `@cubid/auth-react`: React auth/session bindings
- `@cubid/aptos`: Aptos wallet/provider adapter logic
- `@cubid/browser`: headless browser integration helpers
- `@cubid/react`: React hooks and components built on `@cubid/browser`
- `@cubid/evm`: EVM wallet/provider adapter logic, using `viem` only when needed
- `@cubid/bitcoin`: Bitcoin wallet/provider adapter logic
- `@cubid/cosmos`: Cosmos wallet/provider adapter logic
- `@cubid/near`: NEAR wallet/provider adapter logic
- `@cubid/polkadot`: Polkadot wallet/provider adapter logic
- `@cubid/solana`: Solana wallet/provider adapter logic
- `@cubid/starknet`: Starknet wallet/provider adapter logic
- `@cubid/stellar`: Stellar wallet/provider adapter logic
- `@cubid/tezos`: Tezos wallet/provider adapter logic
- `@cubid/wagmi`: wagmi-specific React/EVM integration
- `@cubid/cardano`: Cardano wallet/provider adapter logic
- `@cubid/sui`: Sui wallet/provider adapter logic
- `@cubid/comms`: signed-in messaging and communications helpers
- `@cubid/wallet-recovery`: browser/client recoverable-wallet helpers
- `@cubid/wallet-recovery-react`: React recoverable-wallet helpers
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

The same general split should apply to flexible messaging. Future dapp-facing
`/api/v3/notifications/send` and `/api/v3/notifications/status` helpers belong
in `@cubid/core` once those backend contracts are explicitly promoted, because
they are server-authenticated runtime-agnostic APIs.

The MyPayTag MVP follows the same split. Cubid provides paytag identity,
verified stamp, opaque alias, consent, grant, hosted action, and lifecycle
primitives; MyPayTag owns payment routes, wallets, provider callbacks,
payment intents, settlement, solvers, bridges, swaps, and execution. The
dapp-authenticated identity/consent helpers belong in `@cubid/core` and are
exposed with Paytag names only: `checkPaytagAuthorization`,
`validatePaytagAliases`, `getPaytagGrantStatus`,
`listPaytagLifecycleEvents`, and `startHostedPaytagAction`.

Dapp API keys must stay server/Edge-only, `startHostedPaytagAction` must
preserve idempotency, and validation helpers must not expose list-all-paytags
or list-all-payment-stamps behavior. Browser-safe hosted paytag action launch
belongs in `@cubid/browser` as `openHostedPaytagAction`, with optional React
ergonomics in `@cubid/react`. Signed-in user paytag stamp and grant
owner-management routes are not resolver APIs and should not be presented as
ordinary dapp server helpers. The SDK must not expose universal Cubid IDs, raw
stamp identifiers, raw payment identifiers, provider subjects, route counts,
route preferences, wallet graphs, private resolver diagnostics, or cross-app
grants by default.

The same boundary now applies to SIWC wallet capability discovery and
passkey-approved account-request lifecycle helpers. Runtime-agnostic wrappers
for `accounts/capabilities`, `accounts/requests/create`, and
`accounts/requests/get` belong in `@cubid/core`, while any browser-safe
Passport user-approval launcher or submission helper belongs in
`@cubid/browser`.

When those wrappers land, expose only redacted signing-request summaries:
`signingRequestId`, `status`, `chain`, `requestType`, `payloadHash`,
`payloadSummary`, `policyVersion`, `requiredAcr`, timestamps, and `result` only
after completion. Do not expose raw signing payloads, raw Cubid internal IDs,
private keys, encrypted key material, or private custody data.

SIWC05's additive transaction risk and policy fields should be modeled as
optional summary metadata in `@cubid/core` types, not as a signal that
transaction signing is enabled. Approval remains Passport-hosted, and dapp API
keys must not approve signing requests.

When Passport returns browser-safe SIWC error metadata, `@cubid/core` should
preserve it through structured SDK errors keyed by `details.siwcCode`,
`details.retryable`, and `details.userAction`. Wallet helpers should use that
stable SIWC metadata first and fall back to generic error codes only when the
extra details are absent.

`@cubid/browser` may depend on `@cubid/core`. It owns browser-safe hosted
verification helpers, OTP/browser flow orchestration, AllowPage URL/state
helpers, and other client helpers that do not require React.

That browser layer is also the right home for Passport-hosted SIWC account and
signing approval helpers. Those helpers may build browser-safe submission
inputs or other launcher-friendly request descriptors, but they must not imply
that dapp API keys or app server credentials can approve wallet actions.

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

The same boundary applies to the new flexible-messaging Passport user routes.
Signed-in channel and preference management belongs in a future `@cubid/comms`
package family rather than `@cubid/core`, because these are user-authenticated
account-management surfaces rather than dapp server APIs. The current send and
status backend routes are roadmap input only for now; when they are promoted in
the SDK, they should stay server-safe and land in `@cubid/core`, while
Passport-user history and channel-management routes remain outside the normal
dapp API surface. In particular, `POST /api/notifications/history/list`
belongs with signed-in profile management rather than the dapp-authenticated
core surface.

Allow Page category-grant routes should also remain Passport-hosted for now.
If the SDK later surfaces that state, expose only category permission metadata.
Do not expose raw destinations, channel selection, provider secrets, or
delivery capability through those grant helpers.

The recoverable-wallet direction supersedes the old Cubid-generated wallet and
normal Cubid-signing product path for new integrations. Cubid should be modeled
as an identity-bound recovery provider: host apps or specialist signing
infrastructure create wallet material, perform normal signing, enforce signing
policy, and broadcast transactions. Cubid stores and releases recovery bundle
material only through the documented recovery flow.

Runtime-agnostic, dapp-authenticated recovery bundle metadata helpers belong in
`@cubid/core`: enroll, status, release-start, rotate, and revoke. These helpers
must use the stable API v3 routes and return only safe metadata. They must not
return recovery material, ciphertext, Vault metadata, raw Cubid user ids,
private keys, seed material, key shares, or service-role fields.

Browser/client recovery helpers belong in `@cubid/wallet-recovery`, with React
ergonomics in `@cubid/wallet-recovery-react`. Those packages may launch
Passport-hosted recovery and complete user-authorized release. They must use
signed-in user bearer tokens, not Cubid dapp API keys. Recovery material may
appear only in the user-authenticated release-completion response and should
stay typed as opaque app-owned material.

Public app SDKs must not expose Passport's user-wide recovery-bundle list. A
dapp should only learn about recovery bundles that belong to its own app and
app-user context. Until Passport ships an app-scoped list contract, apps should
track their own app-scoped `recoveryBundleId` metadata and start recovery for an
exact bundle through `@cubid/core`. Cubid-owned hosted UI may show a broader
user-wide list, but that UI should include dapp names and must not leak the
list back to calling dapps.

`@cubid/core` now exposes runtime-agnostic webhook verification helpers. They
should keep verifying Cubid's exact raw-body signature contract and preserve
both canonical `eventType` and transition-friendly `legacyEventType` fields in
public types and examples.

`@cubid/auth` now owns the browser-safe Sign in with Cubid OIDC foundation. It
should stay runtime-agnostic and web-standard only: PKCE verifier and challenge
helpers, state and nonce generation, authorization URL builders, callback
parsing, token exchange and userinfo helpers, logout and session-clear helpers,
and structured auth errors. The stable production protocol boundary is the
Identity issuer at `https://id.cubid.me`; integrations should discover
authorization, token, UserInfo, JWKS, logout, revoke, and registration
endpoints from that issuer instead of calling Passport, Verify, Admin, or
internal OIDC interaction routes directly. It must not require a Cubid dapp API
key, client secret, service-role credential, Passport internal token, or any
other privileged material in browser code.

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

Chain packages own chain-specific public wallet metadata, provider-adapter, and
verification behavior. Each chain package should avoid cross-chain assumptions.
`@cubid/evm` may depend on `viem`; `@cubid/wagmi` is the only package that may
depend on `wagmi`.

Chain packages must remain provider-abstract under the recoverable-wallet
direction. They may help host apps persist and inspect public wallet metadata,
but they should not imply Cubid creates wallet keys, signs normal transactions,
operates an MPC provider, or broadcasts transactions for new integrations.

`@cubid/web3` should now be treated as a frozen legacy compatibility surface,
not as a growth package. It may preserve the old shared wallet adapter
boundary for existing consumers, but new chain-specific helpers, new stamp
shapes, and new chain families should land only in their dedicated packages.

Future smart-account, session-key, paymaster, and gas-sponsorship APIs should
also be capability-driven rather than universal. Keep app-scoped generated
custody accounts as the default public model unless Passport later exposes
explicit capability fields or feature gates for optional account modes.

`@cubid/near` now exists as a second chain-specific package on top of
`@cubid/core`. It should keep treating `accountId` as the primary public
identity for default NEAR stamp serialization while preserving optional wallet
metadata such as `address`, `networkId`, and explicit capability descriptors.

`@cubid/solana` now exists as another chain-specific package on top of
`@cubid/core`. It should keep treating `publicKey` as the primary public
identity for default Solana stamp serialization while preserving optional
wallet metadata such as `address`, `cluster`, and explicit capability
descriptors.

`@cubid/sui` now exists as another chain-specific package on top of
`@cubid/core`. It should keep treating canonical lowercase wallet `address`
values as the primary public identity for default Sui stamp serialization while
preserving optional wallet metadata such as `publicKey`, `networkId`, and
explicit capability descriptors.

`@cubid/cardano` now exists as another chain-specific package on top of
`@cubid/core`. It should keep treating wallet `address` as the primary public
identity for default Cardano stamp serialization while preserving optional
wallet metadata such as `stakeAddress`, `networkId`, and explicit capability
descriptors.

`@cubid/bitcoin` now exists as another chain-specific package on top of
`@cubid/core`. It should keep treating wallet `address` as the primary public
identity for default Bitcoin stamp serialization while preserving optional
wallet metadata such as `publicKey`, `networkId`, `scriptType`, and explicit
capability descriptors.

`@cubid/cosmos` now exists as another chain-specific package on top of
`@cubid/core`. It should keep treating wallet `address` as the primary public
identity for default Cosmos stamp serialization while preserving optional
wallet metadata such as `publicKey`, `chainId`, `bech32Prefix`, and explicit
capability descriptors.

`@cubid/starknet` now exists as another chain-specific package on top of
`@cubid/core`. It should keep treating wallet `address` as the primary public
identity for default Starknet stamp serialization while preserving optional
wallet metadata such as `publicKey`, `chainId`, `classHash`, and explicit
capability descriptors.

`@cubid/aptos` now exists as another chain-specific package on top of
`@cubid/core`. It should keep treating wallet `address` as the primary public
identity for default Aptos stamp serialization while preserving optional
wallet metadata such as `authenticationKey`, `chainId`, `networkId`, and
explicit capability descriptors.

`@cubid/polkadot` now exists as another chain-specific package on top of
`@cubid/core`. It should keep treating wallet `address` as the primary public
identity for default Polkadot stamp serialization while preserving optional
wallet metadata such as `genesisHash`, `publicKey`, `ss58Format`, and explicit
capability descriptors.

`@cubid/tezos` now exists as another chain-specific package on top of
`@cubid/core`. It should keep treating wallet `address` as the primary public
identity for default Tezos stamp serialization while preserving optional
wallet metadata such as `curve`, `networkId`, `publicKey`, and explicit
capability descriptors.

`@cubid/stellar` now exists as another chain-specific package on top of
`@cubid/core`. It should keep treating wallet `address` as the primary public
identity for default Stellar stamp serialization while preserving optional
wallet metadata such as `federationAddress`, `networkPassphrase`, `publicKey`,
and explicit capability descriptors.

Future SIWC transaction work should keep chain behavior explicit and
capability-driven: the EVM Admin-policy transaction pilot may surface typed
result metadata when policy enables it, while Solana transaction signing stays
disabled until Passport explicitly reports support through capabilities and
public route contracts.

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
- `@cubid/aptos`, `@cubid/bitcoin`, `@cubid/cardano`, `@cubid/cosmos`, `@cubid/near`, `@cubid/polkadot`, `@cubid/solana`, `@cubid/starknet`, `@cubid/stellar`, `@cubid/sui`, and `@cubid/tezos` now exist
  as additional chain-specific packages layered on top of `@cubid/core`.
- `@cubid/web3` now remains only as a frozen shared-wallet compatibility
  package with manual-only maintenance, and it should not absorb any new
  chain-specific behavior.

Live npm and JSR publication are complete for `@cubid/core`. See
`docs/engineering/package-migration-plan.md` for the rename and split plan.
Machine-readable API reference artifacts live under `docs/reference/api/` for
the primary public packages and should stay aligned with the package export
surfaces.
