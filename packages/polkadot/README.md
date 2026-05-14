# `@cubid/polkadot`

Polkadot-oriented Cubid wallet helpers built on top of `@cubid/core`.

## When To Choose This Package

Use `@cubid/polkadot` when you need Cubid's Polkadot-specific custody, connection, and
verification helpers. Choose `@cubid/web3` only when you still depend on the
older interim shared wallet surface while the chain split continues.

## Install

```sh
npm install @cubid/polkadot @cubid/core
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/polkadot.json`
- Package matrix: `../../README.md`

## Connection Model

`@cubid/polkadot` treats wallet `address` as the primary identity for default
stamp serialization. Optional `genesisHash`, `publicKey`, and `ss58Format`
metadata may be preserved on the connection when a host wallet exposes them.

## Capability Metadata

Polkadot connections may expose optional `capabilities` metadata for features that
are not universal across Cubid custody accounts or wallet adapters, such as:

- `smartAccount`
- `sessionKeys`
- `paymaster`
- `gasSponsorship`

These descriptors are intentionally opt-in and capability-driven.

The package exports `getCubidPolkadotCapabilities(...)` and
`hasCubidPolkadotCapability(...)` so host apps can read that metadata without
assuming any advanced custody feature is universally available.
