# Cubid Passport update: flexible messaging abuse controls

- Date: 2026-05-15
- Source repo: Cubid-Me/cubid-passport
- Passport branch/commit at handoff time: codex/vercel-app-root-cleanup / 1e1b409

## Summary

`cubid-passport` now enforces provider enablement and app/user quota controls in `POST /api/v3/notifications/send`.

## SDK impact

SDK notification send helpers should model these stable error codes:

- `notification_provider_disabled`: the selected user channel's provider is disabled or suspended by Admin/provider policy.
- `notification_quota_exceeded`: the app exceeded per-user minute or daily notification quota.

Both are hard backend denials. The SDK should surface them as policy/limit failures, not retryable provider outages. Apps should use `/api/v3/notifications/status` only for events that were accepted and returned an `eventId`; denied sends may still create internal redacted evidence but should not be treated as delivered events.

## Notes

A quota value of `0` currently means no explicit cap for an enabled policy row. Production app policies should use positive caps when Admin enables an app for flexible messaging.
