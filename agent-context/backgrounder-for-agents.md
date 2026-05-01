# Cubid SDK Backgrounder For Agents

## Purpose

Cubid is a proof-of-personhood and identity protocol for app integrations.

This repo is the canonical public SDK home for Cubid. It should contain public
API clients, browser helpers, React bindings, chain integrations, developer
docs, and publish tooling. It should not contain private Passport runtime code.

The private parent repo lives separately at:

```txt
/Users/botmaster/src/cubid/cubid-passport
```

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
- Future auth/OIDC client packages when the hosted auth surface is ready

Avoid treating Cubid as a pile of unrelated helpers.

## Current Public SDK Direction

Build toward this package ecosystem:

```txt
@cubid/core
@cubid/browser
@cubid/react

@cubid/evm
@cubid/wagmi
@cubid/solana
@cubid/cardano
@cubid/sui
@cubid/near

(later, if backend contracts justify them)
@cubid/auth
@cubid/auth-react
@cubid/comms
@cubid/secrets
```

The current workspace still uses these interim names:

```txt
@cubid/web2       -> future @cubid/browser
@cubid/web2-react -> future @cubid/react
@cubid/web3       -> future chain-specific packages
```

## Package Responsibilities

### `@cubid/core`

Own:

- Runtime-agnostic HTTP client wrappers
- Shared request/response and error types
- Identity, stamps, score, location, and other stable public API helpers
- Data normalization around public Passport contracts

Do not add:

- React
- hosted-login UI
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

### Chain Packages

Own:

- Chain-specific wallet and signing helpers
- Chain-specific adapters and types
- Optional framework integrations such as wagmi in their own packages

Keep chain assumptions isolated. Do not pile them back into one shared `web3`
blob once dedicated packages exist.

### Future `@cubid/auth` Packages

Use dedicated auth packages for "Sign in with Cubid" when the hosted auth
surface is ready.

- `@cubid/auth`: PKCE, state, callback parsing, token exchange, userinfo, and
  browser-safe auth helpers
- `@cubid/auth-react`: React session/provider/hooks for that auth surface

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
5. Create a dedicated auth package if the feature belongs to OAuth/OIDC login
   rather than identity/stamp API access.

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

1. Evaluate the impact on `cubid-passport`
2. Keep the public SDK aligned with the real backend contract
3. If follow-up is needed in Passport, create a note in:

```txt
/Users/botmaster/src/cubid/cubid-passport/agent-context/messages-from-cubid-sdk
```

Also treat any new dirty files in this repo's Passport inbox as incoming work:

```txt
/Users/botmaster/src/cubid/cubid-sdk-v2/agent-context/messages-from-cubid-passport
```

## Current Product Reality

These capabilities are public-SDK-ready today or are already emerging in this
repo:

- Create users
- Fetch identity and stamps
- Fetch humanity score
- Fetch location data
- Headless/browser verification helpers
- React verification components

These are likely future areas, but should not be over-promised in package
boundaries until their public contracts are real and stable:

- OIDC sign-in helpers
- passkey/WebAuthn client helpers
- comms helpers
- secrets helpers
- richer multi-chain wallet packages

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
