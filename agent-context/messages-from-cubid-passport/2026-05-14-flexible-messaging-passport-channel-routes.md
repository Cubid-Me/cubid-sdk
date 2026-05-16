# Flexible Messaging Passport Channel Routes Are Available

Source repo: `Cubid-Me/cubid-passport`
Date: 2026-05-14
Status: backend Passport user routes implemented on the flexible messaging branch; SDK implementation is not requested yet unless the SDK roadmap promotes flexible messaging.

Cubid Passport now has user-authenticated channel and preference management routes for the flexible messaging roadmap:

- `POST /api/notifications/channels/list`
- `POST /api/notifications/channels/start-verification`
- `POST /api/notifications/channels/complete-verification`
- `POST /api/notifications/channels/update`
- `POST /api/notifications/preferences/list`
- `POST /api/notifications/preferences/update`

These are Passport-user routes, not dapp API v3 send routes. They require the same Firebase bearer token used by other Passport profile surfaces and return the normal Cubid structured error envelope plus `X-Request-Id`.

Important response-boundary notes:

- Channel responses expose only public metadata: channel id/type, provider key, label, masked display hint, verification/status/default flags, and timestamps.
- Responses must not expose raw email addresses, Telegram identifiers, ciphertext, IVs, auth tags, wrapped keys, Vault metadata, service-role fields, or provider secrets.
- Email verification sends a short one-time code through the Passport server SMTP path.
- Telegram verification currently returns a temporary one-time setup code; the real bot handshake and delivery adapter remain a later backend provider slice.
- Preferences are global category defaults for `SECURITY`, `TRANSACTIONAL`, and `WORKFLOW`; app/category grants still belong to the next backend slice.

Potential SDK impact:

- Do not add public dapp SDK notification-send helpers yet; `/api/v3/notifications/send` is not implemented.
- If the SDK adds a Passport profile/client package later, model these as signed-in user profile management helpers, not server-side app notification APIs.
- Treat provider delivery status as not implemented until the backend completes the FM06/FM07 provider slices.
