# Cubid Passport update: flexible messaging email provider

- Date: 2026-05-14
- Source repo: Cubid-Me/cubid-passport
- Passport branch/commit at handoff time: codex/vercel-app-root-cleanup / 975fe58 plus FM06 follow-up

## Summary

`cubid-passport` now attempts SMTP email delivery for accepted API v3 flexible messaging events when the selected verified channel uses provider `email_smtp`. This does not change the public `/api/v3/notifications/send` request shape or success envelope.

## SDK impact

- No SDK implementation is required immediately beyond knowing that email is now a real provider path.
- The send helper should continue to treat `status: "accepted"` as Cubid accepting/routing the event, not as guaranteed provider delivery.
- Future delivery-status helpers should expect provider attempts to record `sent` or `failed` separately from the initial send response.
- SDK examples should not expose or request raw email addresses from apps. Channel destinations remain user-owned and encrypted server-side.

## Backend behavior to model

- Email delivery uses the user's verified email notification channel and encrypted private destination storage.
- SMTP failure records provider failure evidence but does not expose the destination or turn the API response into a raw mail-provider response.
- Telegram remains deferred to FM07.
