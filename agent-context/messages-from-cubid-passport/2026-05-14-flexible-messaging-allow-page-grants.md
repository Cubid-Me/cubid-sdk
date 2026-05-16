# Flexible Messaging Allow Page Category Grants

Source repo: `Cubid-Me/cubid-passport`
Date: 2026-05-14
Status: backend Allow Page grant routes implemented on the flexible messaging branch; no SDK implementation requested until flexible messaging is promoted in the SDK roadmap.

Cubid Passport now lets users grant app notification categories on the hosted Allow Page. This is separate from stamp/profile disclosure grants.

Routes:

- `POST /api/notifications/grants/allow-page/list`
- `POST /api/notifications/grants/allow-page/update`

Request shape:

- `uid`: app-scoped dapp user UUID from the Allow Page URL.
- `pageId`: dapp page id from the Allow Page URL.
- `categories`: update route only; array of `SECURITY`, `TRANSACTIONAL`, and/or `WORKFLOW`.

Behavior:

- Passport validates that `uid` and `pageId` belong to the same dapp.
- Update is replace-style: selected categories become active, omitted categories are revoked.
- Responses expose category grant metadata only.
- Responses do not expose user notification channels, raw destinations, provider secrets, or delivery capability.
- These grants are necessary but not sufficient for delivery. Future send routes must also enforce app policy, verified channels, user preferences, provider status, idempotency, and rate limits.

SDK impact:

- Public app SDKs should not call these routes directly for now; the hosted Allow Page owns the user permission flow.
- When SDK notification helpers are added later, represent category permission as a capability/permission state, not as access to channel addresses.
