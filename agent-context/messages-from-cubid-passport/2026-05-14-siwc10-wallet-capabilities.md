# Cubid Passport Handoff: SIWC10 Wallet Capability Discovery

Source repo: `Cubid-Me/cubid-passport`
Branch: `codex/siwc09-passkey-wallet-forward`
Date: 2026-05-14

## What Changed

Cubid Passport added a backend API v3 capability-discovery route:

- `POST /api/v3/accounts/capabilities`

This route lets an authenticated dapp discover wallet/account capabilities for
its app policy and optionally include app-scoped account lookup for one
`dapp_user_uuid`.

## SDK Impact

Please add runtime-agnostic SDK helpers for:

- fetching wallet capabilities for the authenticated dapp
- fetching wallet capabilities plus account lookup for a specific
  `dapp_user_uuid`
- presenting per-chain flags such as `passkeyApprovedCreation`,
  `directGeneration`, `messageSigning`, `typedDataSigning`, and
  `transactionSigning`
- exposing fail-closed policy fields for disabled/missing SIWC policies

## Contract Notes

This route intentionally does not support lookup by raw Cubid identity. SDK
helpers should require the app's own `dapp_user_uuid` for account lookup.

The response may include public account metadata when `dapp_user_uuid` is
provided, but it must never expose private keys, ciphertext, wrapped keys,
human subject keys, raw Cubid user ids, or cross-app accounts.

Transaction signing is still advertised as disabled by platform policy until a
future backend slice explicitly enables it.
