# `@cubid/starknet`

Starknet-oriented Cubid wallet helpers built on top of `@cubid/core`.

## When To Choose This Package

Use `@cubid/starknet` when you need Cubid's Starknet-specific custody, connection, and
verification helpers. Choose `@cubid/web3` only when you still depend on the
older interim shared wallet surface while the chain split continues.

## Install

```sh
npm install @cubid/starknet @cubid/core
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/starknet.json`
- Package matrix: `../../README.md`

## Connection Model

`@cubid/starknet` treats wallet `address` as the primary identity for default
stamp serialization. Optional `chainId`, `publicKey`, and `classHash`
metadata may be preserved on the connection when a host wallet exposes them.

## Capability Metadata

Starknet connections may expose optional `capabilities` metadata for features that
are not universal across Cubid custody accounts or wallet adapters, such as:

- `smartAccount`
- `sessionKeys`
- `paymaster`
- `gasSponsorship`

These descriptors are intentionally opt-in and capability-driven.

The package exports `getCubidStarknetCapabilities(...)` and
`hasCubidStarknetCapability(...)` so host apps can read that metadata without
assuming any advanced custody feature is universally available.
