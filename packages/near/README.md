# `@cubid/near`

NEAR-oriented Cubid wallet helpers built on top of `@cubid/core`.

## When To Choose This Package

Use `@cubid/near` when you need Cubid's NEAR-specific custody, connection, and
verification helpers. Choose `@cubid/web3` only when you still depend on the
older interim shared wallet surface while the chain split continues.

## Install

```sh
npm install @cubid/near @cubid/core
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/near.json`
- Package matrix: `../../README.md`

## Connection Model

`@cubid/near` treats `accountId` as the primary identity for default stamp
serialization. Optional `address`, `networkId`, and `chainType` metadata may
be preserved on the connection when a host wallet exposes them.

The package supports both `near` and `near-wallet` stamp types without forcing
host apps to choose a heavier chain SDK up front.

## Capability Metadata

NEAR connections may expose optional `capabilities` metadata for features that
are not universal across Cubid custody accounts or wallet adapters, such as:

- `smartAccount`
- `sessionKeys`
- `paymaster`
- `gasSponsorship`

These descriptors are intentionally opt-in and capability-driven.

The package exports `getCubidNearCapabilities(...)` and
`hasCubidNearCapability(...)` so host apps can read that metadata without
assuming any advanced custody feature is universally available.
