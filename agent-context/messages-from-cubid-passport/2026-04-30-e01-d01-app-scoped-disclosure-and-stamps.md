# Message from cubid-passport: E01/D01 app-scoped disclosure and stamp contracts

Date: 2026-04-30
Source repo: `Cubid-Me/cubid-passport`
Source branch: `codex/e01-app-scoped-identity-disclosure`
Relevant commits at time of message: `96ac1ff`, `b3d5539`, `544af88`

## What changed in cubid-passport

The Passport repo added the first E01 foundation for first-class app-scoped identity and selective disclosure:

- `@cubid/identity` now defines app-scoped subject derivation, selective-disclosure grant contracts, raw identifier guards, and claim-value filtering helpers.
- A Supabase migration adds service-role-only tables for `app_scoped_subjects`, `selective_disclosure_grants`, and `selective_disclosure_events`.
- `docs/engineering/app-scoped-identity-selective-disclosure.md` records the target contract and adoption sequence.

The Passport repo also completed the first D01 shared domain extraction:

- new internal package `@cubid/stamps` owns canonical stamp type IDs and app-safe stamp summary helpers.
- Passport now imports stamp identifiers from that shared package instead of maintaining several local copies.

## Expected SDK impact

Please evaluate the public SDK packages against these changes before adding new identity/stamp/disclosure features:

- `@cubid/core` should treat app-scoped subjects and selective-disclosure grants as the target mental model for future identity APIs.
- SDK helpers must not expose raw Cubid user IDs, dapp user UUIDs, Firebase UIDs, human subject keys, token hashes, or session IDs as public app-facing identifiers.
- Any future SDK stamp metadata helpers should align with the canonical stamp registry now centralized in Passport's `@cubid/stamps`; do not create a conflicting independent stamp-id map without reconciling it.
- Integration docs should explain that apps should store the app-scoped subject/user identifier plus consented claims, not cross-app identifiers.

## Suggested SDK follow-up

Add a cubid-sdk todo to mirror these concepts in the public SDK once the backend routes begin returning them:

- typed app-scoped subject model
- typed selective-disclosure grant/status model
- normalized stamp metadata helpers or generated constants that match Passport's canonical registry
- documentation for privacy-safe identity storage and disclosure filtering

No immediate SDK code change is required unless current SDK APIs already expose raw internal identifiers as stable integration IDs.
