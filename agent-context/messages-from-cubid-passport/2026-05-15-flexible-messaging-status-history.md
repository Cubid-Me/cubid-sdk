# Cubid Passport update: flexible messaging status and history APIs

- Date: 2026-05-15
- Source repo: Cubid-Me/cubid-passport
- Passport branch/commit at handoff time: codex/vercel-app-root-cleanup / 840a15b plus FM09 follow-up

## Summary

`cubid-passport` now exposes redacted flexible messaging status/history surfaces:

- User-facing Passport route: `POST /api/notifications/history/list`
- Dapp-facing API v3 route: `POST /api/v3/notifications/status`

## SDK impact

Additive SDK work may model the dapp-facing status lookup after the send helper exists. This should remain server-side / dapp-authenticated because it requires the dapp API key.

Suggested helper shape:

```ts
getNotificationStatus({ dappUserUuid, eventId })
```

The helper should return event status, selected channel type, latest delivery status, and redacted delivery attempts. It must not expect raw user ids, email addresses, Telegram chat ids, provider secrets, ciphertext, or cross-app data.

## Backend contract

`POST /api/v3/notifications/status` request body:

```json
{
  "apikey": "cubid_live_...",
  "dapp_user_uuid": "00000000-0000-4000-8000-000000000000",
  "event_id": "notification event id"
}
```

A valid event id belonging to another dapp returns `404` rather than revealing whether the event exists.

`POST /api/notifications/history/list` is Passport-user authenticated and intended for Passport/Profile UI, not ordinary dapp SDK usage.
