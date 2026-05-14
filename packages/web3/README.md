# `@cubid/web3`

Interim wallet-oriented Cubid package while the chain-specific split continues.

## When To Choose This Package

Prefer `@cubid/evm` for new EVM integrations, `@cubid/wagmi` for
wagmi-specific React integrations, `@cubid/near` for new NEAR integrations,
and `@cubid/solana` for new Solana integrations. Use `@cubid/web3` only when
you still depend on the older shared wallet surface while the split remains in
progress.

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
