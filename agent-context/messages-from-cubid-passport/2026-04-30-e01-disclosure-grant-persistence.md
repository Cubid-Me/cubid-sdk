# Message From cubid-passport: E01 Disclosure Grant Persistence

Date: 2026-04-30
Source branch: `codex/e01-app-scoped-identity-disclosure`

## What changed in cubid-passport

Passport now persists the shared selective-disclosure contract for the two existing user approval paths:

- OIDC consent approval mirrors `oidc_consents` into `public.app_scoped_subjects`, `public.selective_disclosure_grants`, and `public.selective_disclosure_events` with source `oidc`.
- Allow Page stamp permissions create or reuse app-scoped subjects for `dapp:<id>` and persist source `allow_page` disclosure grants for the `cubid:stamps` scope.
- Passport uses `PASSPORT_APP_SCOPED_SUBJECT_SECRET` for Allow Page app-scoped subject derivation.
- OIDC uses its existing pairwise subject custody secret for the broader OIDC app-scoped subject row in this slice.

## SDK impact

The public SDK should treat app-scoped identity and disclosure grants as first-class concepts for future high-level helpers. In particular:

- Do not expose raw Cubid user IDs, dapp user UUIDs, human subject keys, or internal consent IDs as public identity handles.
- Prefer app-scoped subjects and OIDC pairwise `sub` as public stable identifiers.
- Future identity/stamps helpers should assume disclosed stamp data may be filtered by persisted grants, not merely by legacy `stamp_dappuser_permissions`.
- If the SDK adds grant/consent status helpers, model `source` as at least `allow_page` and `oidc`.

No immediate SDK code change is mandatory unless E02 helpers currently assume legacy permission rows are the only disclosure source.
