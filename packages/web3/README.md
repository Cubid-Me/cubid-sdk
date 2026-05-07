# `@cubid/web3`

Interim shared wallet package during the chain split.

## Status

New EVM integrations should prefer `@cubid/evm`, and wagmi-specific React
helpers should prefer `@cubid/wagmi`.

`@cubid/web3` remains in the repo while the chain-specific split continues, but
it is no longer the long-term target package shape.

## Capability Metadata

The interim wallet surface now preserves optional `capabilities` metadata on
connections and verification results. Use that metadata for features such as
smart accounts, session keys, paymasters, or gas sponsorship instead of
assuming every wallet connection supports them.

The package exports `getCubidWalletCapabilities(...)` and
`hasCubidWalletCapability(...)` to keep those checks explicit while the chain
split continues.
