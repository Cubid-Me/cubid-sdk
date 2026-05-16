# Cubid Passport Note: API v3 Notification Send Route

Created: 2026-05-14
Source repo: `Cubid-Me/cubid-passport`
Feature: `FM05`

## Summary

Passport now exposes the backend-owned API v3 flexible messaging send contract:

```txt
POST /api/v3/notifications/send
```

This is a server-to-server/dapp-authenticated route. SDK/browser helpers must
not put Cubid dapp API keys in browser code.

## Request Contract

Headers:

- `Idempotency-Key`: required for retry-safe writes.

Body:

```json
{
  "apikey": "cubid_live_...",
  "dapp_user_uuid": "00000000-0000-4000-8000-000000000000",
  "category": "TRANSACTIONAL",
  "priority": "HIGH",
  "title": "Milestone approved",
  "body": "Milestone #4 was approved.",
  "deep_link": "smartrust://milestone/4",
  "metadata": {
    "contract_id": "contract_123"
  }
}
```

Supported categories:

- `SECURITY`
- `TRANSACTIONAL`
- `WORKFLOW`

Supported priorities:

- `LOW`
- `NORMAL`
- `HIGH`
- `CRITICAL`

## Response Contract

Accepted response:

```json
{
  "data": {
    "eventId": "notification event id",
    "status": "accepted",
    "category": "TRANSACTIONAL",
    "priority": "HIGH",
    "selectedChannelType": "email",
    "createdAt": "2026-05-14T00:00:00.000Z"
  }
}
```

The route creates a notification event and queues a provider delivery attempt.
Real SMTP/Telegram provider delivery remains deferred to `FM06`/`FM07`, so
`accepted` means Cubid accepted and routed the event, not that a provider has
delivered it.

Errors use the Passport structured envelope:

```json
{
  "error": {
    "code": "notification_grant_required",
    "message": "...",
    "requestId": "passport_..."
  }
}
```

Important error codes to model:

- `unauthorized`
- `invalid_request`
- `idempotency_conflict`
- `request_in_progress`
- `not_found`
- `notification_policy_disabled`
- `notification_category_denied`
- `notification_priority_denied`
- `notification_grant_required`
- `notification_muted`
- `no_eligible_notification_channel`
- `rate_limit_exceeded`

## SDK Impact

Please add server-safe helpers only. A good SDK shape would be something like:

- `sendNotification`
- `createNotificationIdempotencyKey`
- typed `NotificationCategory`
- typed `NotificationPriority`
- typed notification send errors

Do not add browser-only flows that require a Cubid dapp API key. Browser apps
should call their own backend, and that backend should call Cubid.
