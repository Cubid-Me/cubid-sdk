# Cubid SDK Backgrounder For Agents

## Purpose

Cubid is a proof-of-personhood and identity protocol for app integrations.

This repo is the canonical public SDK home for Cubid. It should contain public
API clients, browser helpers, React bindings, chain integrations, developer
docs, and publish tooling. It should not contain private Passport runtime code.

The private parent repo lives separately in the `cubid-passport` repository.
That private repo owns hosted login, OIDC issuer endpoints, signing keys,
provider secrets, passkey verification, abuse controls, consent persistence,
service-role access, and database migrations.

## Product Model

Agents should treat Cubid as one identity protocol with a small set of coherent
integration layers:

- Runtime-agnostic core API access
- Headless browser integration helpers
- React bindings and components
- Chain-specific wallet packages
- Dedicated auth/OIDC client packages for Sign in with Cubid

Avoid treating Cubid as a pile of unrelated helpers.

## Current Public SDK Direction

Build toward this package ecosystem:

```txt
@cubid/core
@cubid/auth
@cubid/auth-react
@cubid/aptos
@cubid/browser
@cubid/react

@cubid/evm
@cubid/wagmi
@cubid/bitcoin
@cubid/cosmos
@cubid/solana
@cubid/starknet
@cubid/stellar
@cubid/cardano
@cubid/sui
@cubid/near
@cubid/polkadot
@cubid/tezos

(later, if backend contracts justify them)
@cubid/comms
@cubid/wallet-recovery
@cubid/wallet-recovery-react
@cubid/secrets
```

The current workspace now contains the target package names for the first
browser/React/EVM slices, while frozen compatibility packages remain:

```txt
@cubid/auth
@cubid/auth-react
@cubid/aptos
@cubid/browser
@cubid/comms
@cubid/react
@cubid/bitcoin
@cubid/cardano
@cubid/cosmos
@cubid/evm
@cubid/wagmi
@cubid/near
@cubid/polkadot
@cubid/solana
@cubid/starknet
@cubid/stellar
@cubid/sui
@cubid/tezos

(planned next)
@cubid/wallet-recovery
@cubid/wallet-recovery-react

@cubid/web2       -> frozen compatibility wrapper around @cubid/browser
@cubid/web2-react -> frozen compatibility wrapper around @cubid/react
@cubid/web3       -> frozen shared-wallet compatibility package
```

## Package Responsibilities

### `@cubid/core`

Own:

- Runtime-agnostic HTTP client wrappers
- Shared request/response and error types
- Identity, stamps, score, location, and other stable public API helpers
- Future dapp-facing signing-request lifecycle wrappers when the Passport API v3 contract is ready
- Data normalization around public Passport contracts

Do not add:

- React
- hosted-login UI
- Passport-hosted signing approval/rejection UX
- wagmi or chain SDK dependencies
- browser-only routing/storage assumptions
- private Passport runtime logic

### `@cubid/browser`

Own:

- Headless browser-safe helpers built on top of `@cubid/core`
- Hosted verification launcher helpers
- OTP/browser flow orchestration
- allow-flow and callback URL/state parsing
- Other browser integration helpers that are not React-specific

This layer exists because browser integration is not the same thing as React.

### `@cubid/react`

Own:

- React provider/context wrappers
- React hooks for browser/auth integration
- Focused Cubid components built on top of `@cubid/browser`

Do not duplicate flow logic that belongs in the headless browser layer.

### `@cubid/auth`

Own:

- Browser-safe OIDC and PKCE helpers for Sign in with Cubid
- Authorization URL builders and callback parsing
- Token exchange, userinfo, logout, and session-clear helpers
- Structured auth errors without React or private runtime dependencies

Do not put Cubid dapp API keys, client secrets, signing keys, service-role
credentials, or Passport internal tokens into this package's browser usage
model.

### Future `@cubid/comms`

Use a later `@cubid/comms` package family for signed-in messaging profile
management if Passport promotes the flexible messaging roadmap. That future
surface should cover user-authenticated channel metadata, verification, and
global preferences, not dapp server notification delivery.

If Passport later promotes the server-authenticated notification send and
status routes into the SDK roadmap, keep those helpers in `@cubid/core`
instead. Signed-in Passport profile management and dapp backend notification
delivery should remain separate surfaces.

Treat hosted Allow Page category grants as Passport-owned UX for now. If the
SDK later exposes them, model them only as permission state and never as
access to raw destinations or delivery capability.

### Future `@cubid/wallet-recovery`

Use a dedicated wallet-recovery package family for the recoverable-wallet
direction reset. Cubid is the recovery provider, not the wallet generator,
normal signer, transaction broadcaster, MPC provider, or server-side
recovery-material reader.

`@cubid/core` should own only dapp-authenticated recovery bundle metadata
routes such as enroll, status, release-start, rotate, and revoke. Browser/client
helpers that launch Passport-hosted recovery or complete user-authorized
release should live in `@cubid/wallet-recovery`, with React ergonomics in
`@cubid/wallet-recovery-react`.

Do not expose Passport's user-wide recovery-bundle list through public app SDK
helpers. A calling dapp should only see bundles from its own dapp and dapp-user
context. Until Passport provides an app-scoped list contract, downstream apps
should store their own app-scoped recovery metadata and request recovery for an
exact `recoveryBundleId`.

Recovery material may be returned only by the user-authenticated browser/client
completion path. Backend dapp credentials must never retrieve bundle material,
ciphertext, Vault metadata, raw Cubid user ids, private keys, seed material, or
key shares.

### Chain Packages

Own:

- Chain-specific wallet and signing helpers
- Chain-specific adapters and types
- Optional framework integrations such as wagmi in their own packages

Keep chain assumptions isolated. Do not pile them back into one shared `web3`
blob once dedicated packages exist.

Treat `@cubid/web3` as a legacy shared-wallet compatibility surface now that
multiple dedicated chain packages exist. New chain-specific helpers should land
only in the dedicated package for that chain family.

Future smart-account, session-key, paymaster, or gas-sponsorship helpers must
be capability-driven and explicitly optional. Do not assume every Cubid account
supports those features by default.

Chain packages should remain provider-abstract. They may help host apps persist
or inspect public wallet metadata, but they should not imply that Cubid creates
wallets, signs normal transactions, or broadcasts transactions for new
integrations.

### `@cubid/auth-react`

Use the dedicated React auth package for Sign in with Cubid on top of
`@cubid/auth`.

- `@cubid/auth-react`: React session/provider/hooks for that auth surface
- sign-in launch and callback helpers
- logout/session-clear ergonomics and user-safe error states

Do not force OIDC/client-auth responsibilities into `@cubid/core` or
`@cubid/react`.

## Design Rules

When adding a feature:

1. Put it in `@cubid/core` only if it is runtime-agnostic, dependency-light,
   and backed by a stable public HTTP contract.
2. Put it in `@cubid/browser` if it is browser-specific but UI-framework
   agnostic.
3. Put it in `@cubid/react` if it is React-only.
4. Put it in a chain package if it depends on chain-specific tooling or wallet
   assumptions.
5. Use `@cubid/auth` if the feature belongs to OAuth/OIDC login rather than
   identity/stamp API access, and use `@cubid/auth-react` only for React
   session bindings on top of it.

Avoid:

- leaking framework dependencies into core
- duplicating logic across browser and React packages
- mixing unrelated chains into one package
- exposing raw internal identifiers in the public SDK
- copying private Passport runtime code into this repo
- inventing public SDK surfaces ahead of real backend contracts

## Public/Private Boundary

Before changing public SDK types, response models, auth flows, or other
contracts that may affect Passport internals:

1. Evaluate the impact on `cubid-passport`.
2. Keep the public SDK aligned with the real backend contract.
3. If follow-up is needed in Passport, create a note in the `cubid-passport`
   repo under `agent-context/messages-from-cubid-sdk/`.

Also treat any new dirty files in this repo under
`agent-context/messages-from-cubid-passport/` as incoming work.

## Current Product Reality

These capabilities are public-SDK-ready today or are already emerging in this
repo:

- Create users
- OIDC sign-in helpers
- Fetch identity and stamps
- Fetch humanity score
- Fetch location data
- Headless/browser verification helpers
- React verification components

These are likely future areas, but should not be over-promised in package
boundaries until their public contracts are real and stable:

- passkey/WebAuthn client helpers
- comms helpers for signed-in messaging profile management
- secrets helpers
- richer multi-chain wallet packages
- smart-account and paymaster helpers

The current flexible messaging Passport notes are roadmap input only. They do
not request immediate public SDK runtime helpers yet, even though the backend
now has early send, provider, and status contracts.

Passport-user notification history is still a separate boundary. Treat
`POST /api/notifications/history/list` as a signed-in profile route that stays
with `@cubid/comms`-style account management if it is exposed later, not as a
normal `@cubid/core` dapp server helper.

## Mental Model

Cubid should feel like:

> one identity protocol, exposed through a small number of clear SDK layers

Optimize for:

- clarity
- minimal installs
- strong package boundaries
- browser safety
- privacy-preserving defaults
- honest alignment with the private Passport backend
