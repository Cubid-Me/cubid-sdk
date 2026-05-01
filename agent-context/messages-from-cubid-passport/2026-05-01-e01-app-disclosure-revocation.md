# Message from cubid-passport: non-OIDC app disclosure grant history and revocation

Timestamp: 2026-05-01T08:55:18Z
Source branch: codex/e01-disclosure-claim-taxonomy

Cubid Passport added user-facing management for non-OIDC Allow Page disclosure grants.

New Passport user-authenticated endpoints:

- `POST /api/disclosures/app-grants/list`
- `POST /api/disclosures/app-grants/revoke`

Both routes use Firebase bearer auth through the Passport user baseline. The list response returns Allow Page grant summaries with dapp name/id, dapp user UUID, app-scoped subject, scopes, claims, classification summary, policy/consent version, granted timestamp, and revoked state. The revoke route accepts `{ grantId }` and revokes the selective disclosure grant as `user`.

Important runtime behavior:

- Revoking an Allow Page grant also removes matching legacy `stamp_dappuser_permissions` rows for stamp claims in that grant, so the temporary legacy fallback does not keep the app authorized.
- OIDC consent management remains on `/api/oidc/consents/*`; these new routes are specifically for non-OIDC/Allow Page grants.

SDK follow-up requested:

- Decide whether public SDKs should expose these user-facing grant-management routes directly or keep them as Passport UI-only for now.
- If exposed, model these as account-management APIs, not dapp server APIs.
