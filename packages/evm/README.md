# `@cubid/evm`

EVM-oriented Cubid wallet helpers built on top of `@cubid/core`.

## When To Choose This Package

Use `@cubid/evm` when you need Cubid's EVM-specific custody, connection, and
verification helpers. Choose `@cubid/wagmi` only when your host app already
uses wagmi and needs React-friendly adapters on top of this package.

## Install

```sh
npm install @cubid/evm @cubid/core
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/evm.json`
- Package matrix: `../../README.md`

## Capability Metadata

EVM connections may expose optional `capabilities` metadata for features that
are not universal across Cubid custody accounts, such as:

- `smartAccount`
- `sessionKeys`
- `paymaster`
- `gasSponsorship`

These descriptors are intentionally opt-in and capability-driven. Do not assume
every EVM account supports those features by default.

The package exports `getCubidEvmCapabilities(...)` and
`hasCubidEvmCapability(...)` so host apps can read that metadata without
hard-coding smart-account assumptions into the integration path.
