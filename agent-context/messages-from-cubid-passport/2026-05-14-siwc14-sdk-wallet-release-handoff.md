# Cubid Passport SIWC14: SDK Wallet Helper And Release Handoff

This is the consolidated handoff for the SmarTrust-oriented SIWC wallet work
implemented in `cubid-passport`. Public SDK code belongs in `Cubid-Me/cubid-sdk`,
not in `cubid-passport`.

## Backend Surfaces To Wrap

Add ergonomic SDK helpers around these API v3 / Passport-hosted flows:

- `POST /api/v3/accounts/requests/create`
- `POST /api/v3/accounts/requests/get`
- `POST /api/v3/accounts/capabilities`
- `POST /api/v3/accounts/list`
- `POST /api/v3/signing/requests/create`
- `POST /api/v3/signing/requests/get`
- `POST /api/v3/signing/requests/list`
- `POST /api/v3/signing/requests/cancel`
- hosted Passport approval/rejection routes for user passkey approval:
  - `/api/siwc/accounts/requests/approve`
  - `/api/siwc/accounts/requests/reject`
  - `/api/siwc/signing/requests/approve`
  - `/api/siwc/signing/requests/reject`

## Helper Shape Requested

Please add SDK helpers for:

- wallet capability discovery
- app-scoped account lookup by `dapp_user_uuid`
- passkey-approved account creation request create/get flows
- signing request create/get/list/cancel flows
- hosted Passport approval launcher helpers
- browser-safe SIWC error classes using `details.siwcCode`,
  `details.retryable`, and `details.userAction`
- typed result handling for:
  - message signatures
  - EVM typed-data signatures
  - EVM signed transaction pilot results

The SDK should not expose private-key handling, seed phrases, key shares,
ciphertext, Vault metadata, or browser-side chain key material.

## Release Expectations

Target a public SDK release that can unblock SmarTrust’s fail-closed wallet
scaffolding:

- account creation request helpers for EVM and Solana UX, with NEAR/Sui clearly
  marked as backend-supported but secondary for SmarTrust
- capability checks before rendering signing or transaction actions
- stable error mapping for user cancellation, expiry, wrong user, stale passkey,
  policy denial, unsupported chain/action, rate limit, and provider outage
- documentation warning that EVM transaction signing is a limited Admin-policy
  pilot and that Cubid does not broadcast the signed transaction
- Solana transaction signing remains disabled; only readiness summaries exist

## Notes

Related handoff notes in this folder provide detail for SIWC09, SIWC10,
SIWC12, and SIWC13. This note is the release-coordination index for SDK agents.
