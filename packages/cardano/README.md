# `@cubid/cardano`

Cardano-oriented Cubid wallet helpers built on top of `@cubid/core`.

## When To Choose This Package

Use `@cubid/cardano` when you need Cubid's Cardano-specific custody, connection, and
verification helpers. Choose `@cubid/web3` only when you still depend on the
older shared wallet surface.

## Install

```sh
npm install @cubid/cardano @cubid/core
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/cardano.json`
- Package matrix: `../../README.md`

## Connection Model

`@cubid/cardano` treats wallet `address` as the primary identity for default
stamp serialization. Optional `stakeAddress`, `networkId`, and `chainType`
metadata may be preserved on the connection when a host wallet exposes them.

## Capability Metadata

Cardano connections may expose optional `capabilities` metadata for features that
are not universal across Cubid custody accounts or wallet adapters, such as:

- `smartAccount`
- `sessionKeys`
- `paymaster`
- `gasSponsorship`

These descriptors are intentionally opt-in and capability-driven.

The package exports `getCubidCardanoCapabilities(...)` and
`hasCubidCardanoCapability(...)` so host apps can read that metadata without
assuming any advanced custody feature is universally available.
