# `@cubid/aptos`

Aptos-oriented Cubid wallet/provider helpers built on top of `@cubid/core`.

## When To Choose This Package

Use `@cubid/aptos` when you need Aptos-specific public wallet metadata,
provider-adapter, and verification helpers. Choose `@cubid/web3` only when you
still depend on the older shared wallet surface.

## Install

```sh
npm install @cubid/aptos @cubid/core
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/aptos.json`
- Package matrix: `../../README.md`

## Connection Model

`@cubid/aptos` treats wallet `address` as the primary identity for default
stamp serialization. Optional `authenticationKey`, `chainId`, `networkId`, and `publicKey`
metadata may be preserved on the connection when a host wallet exposes them.

## Capability Metadata

Aptos connections may expose optional `capabilities` metadata for features that
are not universal across host wallet providers or adapters, such as:

- `smartAccount`
- `sessionKeys`
- `paymaster`
- `gasSponsorship`

These descriptors are intentionally opt-in and capability-driven.

The package exports `getCubidAptosCapabilities(...)` and
`hasCubidAptosCapability(...)` so host apps can read that metadata without
assuming any advanced custody feature is universally available.

This package does not create wallet keys, perform normal transaction signing,
operate an MPC provider, or broadcast transactions. Host apps or specialist
wallet providers own those responsibilities.
