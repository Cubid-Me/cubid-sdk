# `@cubid/bitcoin`

Bitcoin-oriented Cubid wallet/provider helpers built on top of `@cubid/core`.

## When To Choose This Package

Use `@cubid/bitcoin` when you need Bitcoin-specific public wallet metadata,
provider-adapter, and verification helpers. Choose `@cubid/web3` only when you
still depend on the older shared wallet surface.

## Install

```sh
npm install @cubid/bitcoin @cubid/core
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/bitcoin.json`
- Package matrix: `../../README.md`

## Connection Model

`@cubid/bitcoin` treats wallet `address` as the primary identity for default
stamp serialization. Optional `networkId`, `publicKey`, and `scriptType`
metadata may be preserved on the connection when a host wallet exposes them.

## Capability Metadata

Bitcoin connections may expose optional `capabilities` metadata for features that
are not universal across host wallet providers or adapters, such as:

- `smartAccount`
- `sessionKeys`
- `paymaster`
- `gasSponsorship`

These descriptors are intentionally opt-in and capability-driven.

The package exports `getCubidBitcoinCapabilities(...)` and
`hasCubidBitcoinCapability(...)` so host apps can read that metadata without
assuming any advanced custody feature is universally available.

This package does not create wallet keys, perform normal transaction signing,
operate an MPC provider, or broadcast transactions. Host apps or specialist
wallet providers own those responsibilities.
