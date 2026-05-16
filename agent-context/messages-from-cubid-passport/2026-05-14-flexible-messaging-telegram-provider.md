# Cubid Passport update: flexible messaging Telegram provider

- Date: 2026-05-14
- Source repo: Cubid-Me/cubid-passport
- Passport branch/commit at handoff time: codex/vercel-app-root-cleanup / 887fd58 plus FM07 follow-up

## Summary

`cubid-passport` now supports Telegram as the second flexible messaging provider. Users can add a Telegram notification channel through Passport's channel setup flow, verify it with a one-time setup code, and receive app-originated API v3 notifications through the Cubid Telegram bot when app policy, user grant, preference, and verified-channel checks all pass.

## SDK impact

- No SDK implementation is required immediately unless flexible messaging helpers are being built.
- Future SDK channel-management helpers should treat Telegram destinations as user-owned Passport-managed data. Apps should never receive Telegram usernames, chat ids, ciphertext, or provider metadata.
- Send helpers should continue to model `/api/v3/notifications/send` as an accepted/routed event. Provider delivery status is separate and will be exposed through future status/history APIs.
- SDK examples should describe Telegram as a Cubid-routed notification channel, not as app-owned bot access or a chat product.

## Backend behavior to model

- Provider key: `telegram_bot`.
- Channel type: `telegram`.
- Required runtime secret: `TELEGRAM_BOT_TOKEN`; optional `TELEGRAM_BOT_API_BASE_URL` for non-standard test/proxy targets.
- Telegram chat identifiers remain encrypted in private notification destination storage and are decrypted only inside the backend provider adapter.
- Provider failures are recorded in delivery-attempt records with `telegram_delivery_failed` and do not leak chat ids in API responses.
