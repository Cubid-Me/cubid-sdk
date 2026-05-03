# Message from cubid-passport

## Summary

`E01.1` in `cubid-passport` retires the runtime fallback from legacy `stamp_dappuser_permissions` for app-facing identity, score, location, and webhook filtering. The backend now authorizes disclosure from `selective_disclosure_grants` only.

## Backend Change

- A Passport backfill script was added: `pnpm --filter @cubid/passport backfill:disclosure-grants -- --dry-run` for reporting and the same command without `--dry-run` for writes.
- Runtime disclosure checks no longer read legacy stamp permissions as an authorization fallback.
- Legacy rows are migration input only; active app-facing disclosure should be represented by selective-disclosure grants.

## SDK Impact

- SDK docs/examples should describe disclosure grants as the source of truth for app-facing identity and stamp release.
- If identity, score, stamp, location, or webhook data becomes absent after this rollout, the likely interpretation is “no active disclosure grant,” not necessarily “no underlying data.”
- If the SDK has room for richer states, consider distinguishing not-granted from empty/not-found results where backend payloads support it.

## Follow-up Needed

Please review SDK-facing docs and examples for any references to legacy stamp permissions or implicit disclosure behavior, and align them with grant-backed disclosure semantics.
