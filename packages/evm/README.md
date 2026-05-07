# `@cubid/evm`

EVM-oriented Cubid wallet helpers built on top of `@cubid/core`.

## Install

```sh
npm install @cubid/evm @cubid/core
```

This package owns the EVM-specific wallet adapter boundary and the
verify-and-persist helper flow. It is the first chain-specific replacement for
the older shared `@cubid/web3` package.

## Capability Metadata

EVM connections may now expose optional `capabilities` metadata for features
that are not universal across Cubid custody accounts, such as:

- `smartAccount`
- `sessionKeys`
- `paymaster`
- `gasSponsorship`

These descriptors are intentionally opt-in and capability-driven. Do not assume
every EVM account supports those features by default.

The package exports `getCubidEvmCapabilities(...)` and
`hasCubidEvmCapability(...)` so host apps can read that metadata without
hard-coding smart-account assumptions into the integration path.
