# `@cubid/solana`

Solana-oriented Cubid wallet helpers built on top of `@cubid/core`.

## When To Choose This Package

Use `@cubid/solana` when you need Cubid's Solana-specific custody, connection,
and verification helpers. Choose `@cubid/web3` only when you still depend on
the older shared wallet surface.

## Install

```sh
npm install @cubid/solana @cubid/core
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/solana.json`
- Package matrix: `../../README.md`

## Connection Model

`@cubid/solana` treats `publicKey` as the primary identity for default stamp
serialization. Optional `address`, `cluster`, and `chainType` metadata may be
preserved on the connection when a host wallet exposes them.

## Capability Metadata

Solana connections may expose optional `capabilities` metadata for features
that are not universal across Cubid custody accounts or wallet adapters, such
as:

- `smartAccount`
- `sessionKeys`
- `paymaster`
- `gasSponsorship`

These descriptors are intentionally opt-in and capability-driven.

The package exports `getCubidSolanaCapabilities(...)` and
`hasCubidSolanaCapability(...)` so host apps can read that metadata without
assuming any advanced custody feature is universally available.
