# `@cubid/web3`

Legacy wallet-oriented Cubid compatibility package while the chain-specific
split continues to close out.

## When To Choose This Package

Prefer `@cubid/evm` for new EVM integrations, `@cubid/wagmi` for
wagmi-specific React integrations, `@cubid/near` for new NEAR integrations,
`@cubid/polkadot` for new Polkadot integrations, `@cubid/aptos` for new
Aptos integrations, `@cubid/solana` for new Solana integrations, `@cubid/sui`
for new Sui integrations, `@cubid/cardano` for new Cardano integrations,
`@cubid/bitcoin` for new Bitcoin integrations, `@cubid/starknet` for new
Starknet integrations, and `@cubid/cosmos` for new Cosmos integrations. Use
`@cubid/web3` only when you still depend on the older shared wallet surface
while the split remains in progress. New chain-specific work should prefer the
dedicated chain packages instead of expanding this shared surface.

## Install

```sh
npm install @cubid/web3 @cubid/core
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/web3.json`
- Package matrix: `../../README.md`

## Capability Metadata

The interim wallet surface preserves optional `capabilities` metadata on
connections and verification results. Use that metadata for features such as
smart accounts, session keys, paymasters, or gas sponsorship instead of
assuming every wallet connection supports them.

The package exports `getCubidWalletCapabilities(...)` and
`hasCubidWalletCapability(...)` to keep those checks explicit while the chain
split continues.
