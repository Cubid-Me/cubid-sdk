# SDK Package Migration Plan

This plan turns the current interim package names into the longer-term public
SDK layout without breaking working integrations unnecessarily.

## Current Implementation Status

The first rename and split slices now exist in the workspace:

- `@cubid/browser` has been created from the former `@cubid/web2` surface
- `@cubid/aptos` now exists as another chain-specific package on top of `@cubid/core`
- `@cubid/bitcoin` now exists as another chain-specific package on top of `@cubid/core`
- `@cubid/cardano` now exists as another chain-specific package on top of `@cubid/core`
- `@cubid/cosmos` now exists as another chain-specific package on top of `@cubid/core`
- `@cubid/react` has been created from the former `@cubid/web2-react` surface
- `@cubid/web2` and `@cubid/web2-react` now act as compatibility re-export packages
- `@cubid/evm` has been created as the first chain-specific package
- `@cubid/near` now exists as the second chain-specific package on top of `@cubid/core`
- `@cubid/polkadot` now exists as another chain-specific package on top of `@cubid/core`
- `@cubid/solana` now exists as the third chain-specific package on top of `@cubid/core`
- `@cubid/starknet` now exists as another chain-specific package on top of `@cubid/core`
- `@cubid/stellar` now exists as another chain-specific package on top of `@cubid/core`
- `@cubid/sui` now exists as the fourth chain-specific package on top of `@cubid/core`
- `@cubid/tezos` now exists as another chain-specific package on top of `@cubid/core`
- `@cubid/wagmi` now exists as the wagmi-specific React integration layer on top of `@cubid/evm`
- `@cubid/web3` now remains only as a frozen shared-wallet compatibility package

The browser/React rename wave is now complete. The remaining work is
compatibility-package retirement, long-lived compatibility maintenance, and
later package-family expansion such as auth.

## Target Package Map

Current:

- `@cubid/core`
- `@cubid/web2`
- `@cubid/web2-react`
- `@cubid/web3`

Target:

- `@cubid/core`
- `@cubid/aptos`
- `@cubid/browser`
- `@cubid/bitcoin`
- `@cubid/cardano`
- `@cubid/cosmos`
- `@cubid/react`
- `@cubid/evm`
- `@cubid/near`
- `@cubid/polkadot`
- `@cubid/wagmi`
- `@cubid/solana`
- `@cubid/starknet`
- `@cubid/stellar`
- `@cubid/sui`
- `@cubid/tezos`
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
   `@cubid/browser`.
5. Freeze `@cubid/web2` as a deprecated compatibility wrapper once
   `@cubid/browser` is live and documented.

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
5. Freeze `@cubid/web2-react` as a deprecated compatibility wrapper once
   `@cubid/react` is live and documented.

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
- Optional capability metadata for features such as smart accounts, session
  keys, paymasters, and gas sponsorship
- optional lightweight `viem` integration when it adds real value

### Phase 3: create `@cubid/wagmi`

`@cubid/wagmi` should be the only place where:

- `wagmi`
- wallet React hooks
- connector-specific UI helpers

are allowed.

Keep any smart-account, session-key, paymaster, or gas-sponsorship support
capability-driven. Those features should surface as explicit optional metadata,
not as universal assumptions baked into every wagmi or EVM flow.

It should depend on:

- `@cubid/core`
- `@cubid/evm`
- `wagmi`

### Phase 4: add other chain packages only when real demand exists

Follow the same bounded pattern for later chain packages: real adapter
behavior, focused tests, publish wiring, and documentation in the same change.
Avoid publishing empty placeholders.

### Phase 5: close out `@cubid/web3` as a compatibility surface

Now that multiple dedicated chain packages exist, stop treating `@cubid/web3`
as an open-ended future surface.

Use this staged closeout path:

1. Freeze `@cubid/web3` to the already-supported legacy shared wallet surface.
2. Do not add newly extracted chain-specific helpers or stamp types to
   `@cubid/web3`.
3. Keep new docs and examples pointed at dedicated chain packages first.
4. Add explicit migration guidance for downstream `@cubid/web3` consumers.
5. Narrow release planning so `@cubid/web3` is treated as a compatibility
   package rather than an active growth surface.
6. Keep the end state as a long-lived frozen wrapper with manual-only
   maintenance unless a later deliberate deprecation decision is made.

### Compatibility rules

- Keep `@cubid/web3` as a compatibility package during the first split wave.
- Keep new chain-package extraction work out of `@cubid/web3` once a dedicated
  package exists for that chain family.
- Do not let `@cubid/wagmi` or any React-specific wallet helper leak into
  `@cubid/react`.
- Keep chain packages isolated from browser OTP and non-wallet verification
  flows.

## Recommended Release Order

1. Finish `@cubid/core` JSR setup and publication.
2. Publish `@cubid/browser`.
3. Publish `@cubid/react`.
4. Freeze `@cubid/web2` and `@cubid/web2-react` as deprecated compatibility packages.
5. Publish `@cubid/evm`.
6. Publish `@cubid/near`.
7. Publish `@cubid/solana`.
8. Publish `@cubid/polkadot`.
9. Publish `@cubid/aptos`.
10. Publish `@cubid/bitcoin`.
11. Publish `@cubid/cardano`.
12. Publish `@cubid/cosmos`.
13. Publish `@cubid/starknet`.
14. Publish `@cubid/stellar`.
15. Publish `@cubid/sui`.
16. Publish `@cubid/tezos`.
17. Publish `@cubid/wagmi`.
18. Freeze `@cubid/web3` to the legacy shared wallet surface.
19. Publish explicit `@cubid/web3` migration and deprecation guidance.
20. Keep `@cubid/web3` as a long-lived frozen compatibility wrapper with
    manual-only maintenance.

## Exit Criteria

The migration can be considered complete when:

- public docs no longer describe `web2`, `web2-react`, or `web3` as the target
  long-term package names
- `@cubid/browser` and `@cubid/react` are published and documented
- the first chain-specific packages, including `@cubid/aptos`, `@cubid/bitcoin`, `@cubid/cardano`, `@cubid/cosmos`, `@cubid/evm`, `@cubid/near`, `@cubid/polkadot`, `@cubid/solana`, `@cubid/starknet`, `@cubid/stellar`, `@cubid/sui`, `@cubid/tezos`, and `@cubid/wagmi`, are published with tests
- compatibility packages are clearly frozen and no longer treated as active release targets
- `@cubid/web3` is frozen with downstream migration guidance and a clear
  manual-only compatibility maintenance policy
