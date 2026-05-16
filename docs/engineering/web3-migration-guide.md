# `@cubid/web3` Migration Guide

`@cubid/web3` is now a frozen compatibility package.

Use this guide when an existing integration still depends on the older shared
wallet surface and you want to move onto the dedicated chain packages.

## Current Status

- `@cubid/web3` stays installable for older imports.
- New chain-specific work should not land in `@cubid/web3`.
- Normal release planning should target the dedicated chain packages first.

## Package Mapping

Choose the dedicated package that matches the chain or framework you actually
use:

| Current need | Preferred package |
| --- | --- |
| EVM wallets and custody helpers | `@cubid/evm` |
| wagmi-based React integrations | `@cubid/wagmi` |
| NEAR wallets | `@cubid/near` |
| Solana wallets | `@cubid/solana` |
| Sui wallets | `@cubid/sui` |
| Cardano wallets | `@cubid/cardano` |
| Bitcoin wallets | `@cubid/bitcoin` |
| Starknet wallets | `@cubid/starknet` |
| Cosmos wallets | `@cubid/cosmos` |
| Polkadot wallets | `@cubid/polkadot` |
| Aptos wallets | `@cubid/aptos` |
| Tezos wallets | `@cubid/tezos` |
| Stellar wallets | `@cubid/stellar` |

## What Carries Over

These concepts still map cleanly from `@cubid/web3` into the dedicated chain
packages:

- adapter-owned `connect()` and optional `disconnect()` behavior
- adapter-owned optional `verify()` behavior
- capability metadata and capability helper functions
- default `verifyWallet(...)` flow that persists through `@cubid/core`

## What Does Not Carry Over

Do not expect `@cubid/web3` to learn the newer chain families or newer package
surface details.

- the shared `CubidWeb3StampType` union is intentionally frozen
- new chain-specific connection metadata belongs in dedicated packages
- new chain-specific helpers should not be added back into the shared package

## Review Order For Migrations

1. Replace the package import first.
2. Update the chain-specific connection type.
3. Replace any shared capability helper import with the dedicated package
   helper.
4. Re-run the local consumer or app-level wallet tests after the switch.

## Long-Term Policy

The current long-term policy is to keep `@cubid/web3` as a long-lived frozen
compatibility wrapper with manual-only maintenance, rather than treating it as
an active package family target.
