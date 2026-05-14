# Message From cubid-passport: SIWC06 Wallet Webhook Contracts

Date: 2026-05-06
Source repo branch: `codex/siwc-roadmap-cleanup`

## Summary

`cubid-passport` is extending API v3 webhooks with SIWC custody and signing
events. This is a backend contract addition. Public SDK code still belongs in
`Cubid-Me/cubid-sdk`.

## New Canonical Event Names

- `wallet.created`
- `wallet.signing_request.created`
- `wallet.policy.denied`
- `wallet.signing_request.approved`
- `wallet.signing_request.rejected`
- `wallet.signing_request.cancelled`
- `wallet.signing_request.step_up_failed`
- `wallet.signature.completed`
- `wallet.signature.failed`

`wallet.transaction.submitted` and `wallet.transaction.failed` are still
deferred because transaction signing remains disabled.

## Payload Contract

SIWC events use the existing API v3 webhook envelope and headers:

- `apiVersion`, `payloadVersion`, `eventId`, `eventType`, `createdAt`,
  `requestId`, `dapp`, `subject`, and `data`
- `X-Cubid-Event-Id`, `X-Cubid-Timestamp`,
  `X-Cubid-Signature-Version`, and `X-Cubid-Signature`

The `data` object may include account id, chain, public address, dapp-user
account id, signing request id, request type, status, policy version, risk
summary, payload hash, and safe result metadata such as signature algorithm and
public address. It will not include raw signing payloads, signatures, private
keys, encrypted key material, Vault wrapping keys, human subject keys, raw Cubid
user ids, Firebase uid, or webhook signing secrets.

## SDK Follow-Up

Add or update webhook verification examples and types so SDK consumers can
handle the SIWC wallet event names. Treat this as additive. Do not expose
transaction signing UI or transaction webhook expectations until a future
backend note explicitly enables transaction signing.
