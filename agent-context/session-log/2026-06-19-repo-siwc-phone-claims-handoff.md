# 2026-06-19 siwc phone claims handoff

## 2026-06-19T20:04:12Z - SIWC phone claims SDK pickup

- agent: Codex
- branch: codex/siwc-phone-claims-handoff
- head: 5bbc5380
- summary:
  - Picked up the monorepo SIWC phone-claims handoff in the public SDK repo.
  - Updated the passkey-first SIWC guide so developers request `phone` only
    when they need `phone_number` / `phone_number_verified` or when Admin SIWC
    page policy requires a verified phone identifier.
  - Reaffirmed that verified email and phone values are released only through
    consented OIDC claims/UserInfo, never redirect parameters.
- validation:
  - `pnpm docs:api:check`
  - `git diff --check`
- follow-ups:
  - Commit this docs-only SDK pickup and reference it from the monorepo Sprint
    10 blocker evidence.
