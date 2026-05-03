# Message From cubid-passport: E01 Runtime Disclosure Filtering

Date: 2026-04-30
Source branch: `codex/e01-app-scoped-identity-disclosure`

## What changed in cubid-passport

Passport now uses persisted `selective_disclosure_grants` as an enforcement input for dapp-facing identity surfaces:

- `/api/v2/identity/fetch_identity` returns only stamps covered by active disclosure grants.
- `/api/v2/identity/fetch_stamps` returns only disclosed stamps and redacts email helper fields unless the email stamp is disclosed.
- Legacy `/api/dapp/get_identity`, `/api/dapp/fetch_score`, `/api/dapp/get_score_details`, `/api/dapp/get_score_details_cubid`, and `/api/v2/score/fetch_score` now calculate from disclosed stamps only.
- Internal webhook trigger paths skip delivery when the changed stamp has not been disclosed to the target dapp user.

The existing response shapes are mostly preserved, but callers should expect fewer stamps and lower/zero score outputs when a user has not granted the relevant stamp disclosure.

## SDK impact

Public SDK helpers should treat missing stamp data as a valid privacy outcome, not necessarily as an error or lack of user identity. Score helpers should document that scores are app/disclosure scoped and may differ from Cubid's internal full score.

Follow-up SDK work should consider explicit normalized states such as `notGranted`, `notVerified`, and `notFound` so downstream apps can explain privacy-limited results clearly.
