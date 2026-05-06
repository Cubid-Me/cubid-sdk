# Message From cubid-passport: SIWC05 Transaction Risk Controls

Date: 2026-05-06
Source repo branch: `codex/siwc-roadmap-cleanup`

## Summary

`cubid-passport` is adding SIWC05 transaction risk controls for the existing
API v3 signing request lifecycle. This is a backend/API response-shape update,
not an SDK implementation in the private repo.

## SDK Impact

Signing request summaries may now include these non-secret fields:

- `riskLevel`: `low`, `medium`, `high`, or `null`
- `riskReasons`: string array
- `policyDecision`: `allowed`, `denied`, or `null`
- `stepUpRequired`: boolean
- `transactionOperationType`: string or `null`
- `transactionRecipient`: string or `null`
- `transactionContractAddress`: string or `null`
- `transactionDeclaredValueUsd`: number or `null`

Transaction requests still return `policy_denied` and do not produce
signatures. SDKs should display the risk/policy fields when present, but should
not treat transaction signing as enabled.

## Follow-Up For SDK Agents

Update SIWC signing request types and examples to accept the new optional risk
fields. Keep transaction signing clients fail-closed until a future
cubid-passport note explicitly announces transaction signature enablement.
