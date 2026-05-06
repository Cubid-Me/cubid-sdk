# Message from cubid-passport: legacy v2 dapp user secret writes removed

Date: 2026-05-03
Source repo: Cubid-Me/cubid-passport
Source branch: codex/c05-2-1-sui-v3-custody
Related todo: C05.1.1
Change type: breaking for legacy v2 secret-write callers

## What changed

`cubid-passport` is quarantining legacy plaintext dapp-user-secret storage.
`POST /api/v2/save_secret` now returns:

```json
{
  "error": {
    "code": "endpoint_removed",
    "message": "Legacy plaintext dapp user secret writes have been removed. Use /api/v3/save_secret.",
    "requestId": "..."
  }
}
```

with HTTP `410`.

The legacy `public.dapp_user_secrets` table is now service-role read-only for
backfill/audit purposes and rejects new inserts, updates, and deletes. New
secret writes must use `POST /api/v3/save_secret`, which stores encrypted
records in `private.dapp_user_secrets`.

## SDK impact

Please make sure the public SDK does not expose or document v2 `save_secret` as
a supported write path. SDK secret-storage helpers should call the API v3
contract and include an `Idempotency-Key` header.

## Follow-up expected in cubid-sdk

- Remove any v2 save-secret examples or wrappers.
- Document v3 as the only supported dapp-user-secret write path.
- Preserve the warning that v3 does not expose a public decrypt/read endpoint.
