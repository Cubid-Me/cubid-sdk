# `@cubid/web3`

Legacy shared-wallet Cubid compatibility package for older installs that still
depend on the pre-split wallet surface.

## When To Choose This Package

Prefer `@cubid/evm` for new EVM integrations, `@cubid/wagmi` for
wagmi-specific React integrations, `@cubid/near` for new NEAR integrations,
`@cubid/polkadot` for new Polkadot integrations, `@cubid/aptos` for new
Aptos integrations, `@cubid/solana` for new Solana integrations, `@cubid/sui`
for new Sui integrations, `@cubid/cardano` for new Cardano integrations,
`@cubid/bitcoin` for new Bitcoin integrations, `@cubid/starknet` for new
Starknet integrations, `@cubid/stellar` for new Stellar integrations,
`@cubid/tezos` for new Tezos integrations, and `@cubid/cosmos` for new Cosmos
integrations. Use `@cubid/web3` only when you still depend on the older shared
wallet surface. New chain-specific work should prefer the dedicated chain
packages instead of expanding this shared surface.

## Install

```sh
npm install @cubid/web3 @cubid/core
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## Maintenance Status

`@cubid/web3` is now a frozen compatibility package.

- The supported shared-wallet surface is intentionally limited to the existing
  `evm`, `near`, `near-wallet`, and `solana` stamp families.
- New chain-specific helpers and new chain families should land only in their
  dedicated packages.
- If `@cubid/web3` ever needs another release, treat it as a manual
  compatibility exception rather than a normal forward-looking package update.

## API Reference

- JSON reference: `../../docs/reference/api/web3.json`
- Package matrix: `../../README.md`

## Capability Metadata

The legacy wallet surface preserves optional `capabilities` metadata on
connections and verification results. Use that metadata for features such as
smart accounts, session keys, paymasters, or gas sponsorship instead of
assuming every wallet connection supports them.

The package exports `getCubidWalletCapabilities(...)` and
`hasCubidWalletCapability(...)` to keep those checks explicit while the chain
split continues.
