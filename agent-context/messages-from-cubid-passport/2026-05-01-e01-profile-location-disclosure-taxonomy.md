# Message from cubid-passport: E01 profile and location disclosure taxonomy

Timestamp: 2026-05-01T08:02:29Z
Source branch: codex/e01-disclosure-claim-taxonomy

Cubid Passport is tightening SDK-facing dapp routes so non-stamp identity data now follows explicit selective-disclosure grants.

New disclosure claim names used by Passport:

- `profile:name` releases user display/nickname fields.
- `profile:*` releases all current profile claims in the same namespace.
- `location:rough` releases country-level/rough location data.
- `location:approximate` releases approximate location and also satisfies rough location reads.
- `location:exact` releases exact address/coordinates and also satisfies approximate/rough reads.
- `location:*` releases all current location granularities.

Behavioral impact for SDK-facing routes:

- Legacy stamp grants still preserve stamp visibility during the rollout.
- Email/phone remain stamp-backed disclosures for now.
- Profile name/nickname is now null unless `profile:name`, `profile:*`, `profile`, or `cubid:profile` is granted.
- Exact, approximate, and rough location routes now return no location data unless a matching location claim is granted.
- Approximate location responses no longer include raw address payloads.
- Dapp `get_identity` sanitizes the legacy user object instead of spreading raw user rows back to callers.

SDK follow-up requested:

- Treat null/missing fields from these routes as `notGranted` where possible, not necessarily `notFound`.
- Add typed claim/granularity names to public SDK docs and response models.
- Avoid implying that location/profile fields are always available after user creation; they are consent-gated.
