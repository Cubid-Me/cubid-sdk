# SDK Package Migration Plan

This plan turns the current interim package names into the longer-term public
SDK layout without breaking working integrations unnecessarily.

## Current Implementation Status

The first rename and split slices now exist in the workspace:

- `@cubid/browser` has been created from the former `@cubid/web2` surface
- `@cubid/react` has been created from the former `@cubid/web2-react` surface
- `@cubid/web2` and `@cubid/web2-react` now act as compatibility re-export packages
- `@cubid/evm` has been created as the first chain-specific package
- `@cubid/wagmi` now exists as the wagmi-specific React integration layer on top of `@cubid/evm`
- `@cubid/web3` still remains in place while later chain splits continue

The remaining work is publication, deprecation messaging, API cleanup where
justified, and additional chain-package extraction.

## Target Package Map

Current:

- `@cubid/core`
- `@cubid/web2`
- `@cubid/web2-react`
- `@cubid/web3`

Target:

- `@cubid/core`
- `@cubid/browser`
- `@cubid/react`
- `@cubid/evm`
- `@cubid/wagmi`
- later: `@cubid/solana`, `@cubid/cardano`, `@cubid/sui`, `@cubid/near`
- later: `@cubid/auth`, `@cubid/auth-react`

## Principles

- Keep `@cubid/core` runtime-agnostic and dependency-light.
- Preserve a first-class headless browser layer separate from React.
- Move chain logic into isolated packages rather than growing a shared `web3`
  bucket.
- Prefer temporary compatibility packages over abrupt removals.
- Do not invent new public behavior while renaming or splitting packages.

## Plan A: `@cubid/web2` -> `@cubid/browser`

Current `@cubid/web2` owns:

- OTP orchestration
- allow-flow URL/state helpers
- hosted verification URL helpers
- provider stamp-sync helpers

That is the right responsibility set for a headless browser package.

### Execution phases

1. Create `packages/browser` as a near-copy of the current `packages/web2`
   public surface.
2. Keep the runtime behavior the same while changing only the package name and
   internal import paths.
3. Publish `@cubid/browser` first.
4. Convert `@cubid/web2` into a compatibility package that re-exports
   `@cubid/browser` for at least one release window.
5. Deprecate `@cubid/web2` in docs and package metadata after consumers have a
   clear upgrade path.

### Compatibility rules

- Preserve function names such as `createCubidWeb2Client` until a deliberate
  API rename is justified.
- Preserve `CubidWidget` compatibility behavior for hosted verification users.
- Do not move React context/provider code into `@cubid/browser`.

### Follow-up rename options

After package migration, decide whether to:

- keep `createCubidWeb2Client` as a compatibility name, or
- add `createCubidBrowserClient` and deprecate the old factory name later

Prefer keeping the old factory during the first rename release to reduce churn.

## Plan B: `@cubid/web2-react` -> `@cubid/react`

Current `@cubid/web2-react` owns:

- OTP form components
- provider connect button
- hosted verification widget
- React context/provider helpers

That is a good base for `@cubid/react`, but it should depend on the renamed
headless browser package rather than on `@cubid/web2`.

### Execution phases

1. Create `packages/react` by porting the current `packages/web2-react`
   surface.
2. Change package imports from `@cubid/web2` to `@cubid/browser`.
3. Preserve existing component names during the first rename release.
4. Publish `@cubid/react`.
5. Convert `@cubid/web2-react` into a compatibility re-export package for at
   least one release window.

### Compatibility rules

- Keep `react` and `react-dom` as peer dependencies only.
- Keep the “no root provider required” story intact.
- Keep `CubidHostedVerificationWidget`, `CubidWidget`, `EmailOtpForm`,
  `PhoneOtpForm`, and `ProviderConnectButton` available in the renamed package.
- Do not reimplement flow logic in React that already exists in the headless
  browser layer.

### Planned cleanup after rename

- Revisit names like `Provider` and `Web2ConnectPanel` for clearer `react`
  package terminology.
- Add package-level deprecation notices to `@cubid/web2-react`.

## Plan C: `@cubid/web3` -> chain packages

Current `@cubid/web3` is intentionally minimal:

- wallet adapter boundary
- connect/disconnect helpers
- verify-and-persist stamp flow
- default wallet stamp serialization

That small surface is a good staging area, but it should not remain the final
public package shape.

### Phase 1: extract chain-neutral interfaces

1. Keep the current adapter contracts as the shared model for chain packages.
2. Decide whether those contracts stay in a small compatibility `@cubid/web3`
   package or move into the first real chain package.
3. Keep `@cubid/core` as the only required dependency below chain packages.

### Phase 2: create `@cubid/evm`

`@cubid/evm` should become the first real chain package because the current
stamp types and app demand are EVM-oriented.

It should own:

- EVM wallet connection types
- EVM stamp serialization defaults
- EVM verification adapter contracts
- optional lightweight `viem` integration when it adds real value

### Phase 3: create `@cubid/wagmi`

`@cubid/wagmi` should be the only place where:

- `wagmi`
- wallet React hooks
- connector-specific UI helpers

are allowed.

It should depend on:

- `@cubid/core`
- `@cubid/evm`
- `wagmi`

### Phase 4: add other chain packages only when real demand exists

Create `@cubid/solana`, `@cubid/cardano`, `@cubid/sui`, and `@cubid/near`
only when the package can be backed by real adapter behavior and tests.

Avoid publishing empty placeholders.

### Compatibility rules

- Keep `@cubid/web3` as a compatibility package during the first split wave.
- Do not let `@cubid/wagmi` or any React-specific wallet helper leak into
  `@cubid/react`.
- Keep chain packages isolated from browser OTP and non-wallet verification
  flows.

## Recommended Release Order

1. Finish `@cubid/core` JSR setup and publication.
2. Publish `@cubid/browser`.
3. Publish `@cubid/react`.
4. Convert `@cubid/web2` and `@cubid/web2-react` into compatibility packages.
5. Publish `@cubid/evm`.
6. Publish `@cubid/wagmi`.
7. Decide whether `@cubid/web3` remains as a temporary compatibility wrapper or
   is deprecated immediately after the first chain-specific release wave.

## Exit Criteria

The migration can be considered complete when:

- public docs no longer describe `web2`, `web2-react`, or `web3` as the target
  long-term package names
- `@cubid/browser` and `@cubid/react` are published and documented
- the first chain-specific packages, including `@cubid/evm` and `@cubid/wagmi`, are published with tests
- compatibility packages clearly signal deprecation status
