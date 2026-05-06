# Message From cubid-passport: SIWC04 Signing Request Lifecycle

- Date: 2026-05-06
- Source repo: `Cubid-Me/cubid-passport`
- Source branch: `codex/siwc-roadmap-cleanup`
- Related todo: `SIWC04`
- Status: backend implementation in progress

## Summary

`cubid-passport` is adding the first API v3 Sign In With Cubid signing request
lifecycle. This is backend/API contract work only; public SDK support should
live in `Cubid-Me/cubid-sdk`.

New dapp-facing API v3 routes:

- `POST /api/v3/signing/requests/create`
- `POST /api/v3/signing/requests/get`
- `POST /api/v3/signing/requests/list`
- `POST /api/v3/signing/requests/cancel`

New Passport user-facing routes:

- `POST /api/siwc/signing/requests/list`
- `POST /api/siwc/signing/requests/approve`
- `POST /api/siwc/signing/requests/reject`

## SDK Impact

Please add SDK follow-ups for typed API v3 wrappers around the dapp-facing
routes. The create route requires `Idempotency-Key`, just like other API v3
write routes.

Initial request body shape:

```json
{
  "api_key": "cubid_live_...",
  "dapp_user_uuid": "uuid",
  "user_account_id": "uuid",
  "request_type": "message",
  "payload": { "message": "Sign in to Example" },
  "payload_summary": { "kind": "message", "preview": "Sign in to Example" }
}
```

Initial response shape is `{ "data": { ... } }` with redacted request metadata:
`signingRequestId`, `status`, `chain`, `requestType`, `payloadHash`,
`payloadSummary`, `policyVersion`, `requiredAcr`, timestamps, and `result` only
after completion.

## Boundaries

- Do not expect raw private keys, encrypted key material, human subject keys,
  raw Cubid user ids, or raw `payload` in public responses.
- Message signing is supported for EVM, NEAR, Solana, and Sui.
- EVM typed-data signing is supported.
- Transaction signing is intentionally policy-denied with
  `transaction_signing_deferred` until SIWC05 risk controls land.
- Approval is Passport-hosted and may require passkey ACR; dapp API keys cannot
  approve signing.

