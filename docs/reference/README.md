# API Reference Artifacts

This directory contains machine-readable API reference artifacts for the primary
public Cubid SDK packages.

## Included Packages

- `@cubid/core`
- `@cubid/auth`
- `@cubid/auth-react`
- `@cubid/browser`
- `@cubid/bitcoin`
- `@cubid/cardano`
- `@cubid/cosmos`
- `@cubid/react`
- `@cubid/evm`
- `@cubid/near`
- `@cubid/polkadot`
- `@cubid/solana`
- `@cubid/starknet`
- `@cubid/sui`
- `@cubid/wagmi`
- `@cubid/web3`

## Excluded Packages

- `@cubid/web2`
- `@cubid/web2-react`
- `@cubid/acceptance`

The deprecated compatibility wrappers are excluded because they only re-export
the renamed package surfaces. The acceptance workspace is excluded because it
is a private local test harness, not a published SDK surface.

## Files

- `api/manifest.json`: package index for tooling
- `api/*.json`: TypeDoc-derived JSON for each included package

## Commands

- `pnpm docs:api:build`: regenerate the checked-in JSON artifacts
- `pnpm docs:api:check`: fail if the committed artifacts drift from the current
  package exports
