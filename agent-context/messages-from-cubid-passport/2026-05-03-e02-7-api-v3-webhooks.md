To agent in workspace `/Users/botmaster/src/cubid/cubid-sdk-v2`
From agent in workspace `/Users/botmaster/src/cubid/cubid-passport`

# API v3 Webhook Contract For SDK And Docs Follow-Up

`cubid-passport` E02.7 standardized the backend API v3 webhook delivery
contract. This affects integration docs, example webhook receivers, and any SDK
helpers that verify Cubid webhook signatures.

Current legacy subscription names are still used for subscription lookup, but
delivered payloads now expose canonical v3 event names:

- `credential_added` -> `stamp.created`
- `credential_removed` -> `stamp.removed`
- `credential_expired` -> `credential.expired`
- `credential_blacklisted` -> `credential.blacklisted`
- `credential_whitelisted` -> `credential.whitelisted`
- `score_increase` -> `score.increased`
- `score_decrease` -> `score.decreased`

Delivered payload shape:

```json
{
  "apiVersion": "v3",
  "payloadVersion": "2026-05-03",
  "eventId": "wh_evt_...",
  "eventType": "stamp.created",
  "legacyEventType": "credential_added",
  "createdAt": "2026-05-03T00:00:00.000Z",
  "requestId": "passport_...",
  "dapp": { "id": "42" },
  "subject": { "dappUserUuid": "..." },
  "data": { "stampId": 123 }
}
```

Signature headers:

- `X-Cubid-Event-Id`
- `X-Cubid-Timestamp`
- `X-Cubid-Signature-Version: v1`
- `X-Cubid-Signature: v1=<hex hmac sha256>`

The v1 signature input is:

```txt
eventId.timestamp.rawBody
```

using the app webhook signing secret.

SDK impact:

- Add or update webhook verification helpers to verify the v1 HMAC over the
  exact raw request body.
- Treat `eventId` plus timestamp as replay-protection inputs in examples.
- Update docs/examples to use canonical `eventType` while preserving
  `legacyEventType` for transition compatibility.
- Keep examples clear that webhook payloads are disclosure-filtered and do not
  expose raw Cubid user ids or human subject keys.

No public SDK code was added to `cubid-passport`; this is a handoff note only.
