# 2026-07-16 — FriendR public contract SDK ingestion

## 2026-07-16T15:54:58Z — Codex — `codex/friendr-public-contract-sdk` — `7e19849a`

Summary:

- Created SDK GitHub issue #31 for the FriendR public claim/stamp/disclosure
  contract ingestion.
- Mirrored the FriendR cross-repo handoff note into the SDK repo.
- Added `@cubid/core` FriendR public-contract constants, types, and
  classification helpers for the actor alias, KYC-presence claim, aggregate
  stamp import type, and redacted stamp-summary claim.
- Added `@cubid/auth` FriendR OIDC claim classification helpers so consumers
  treat the new fields as UserInfo/disclosure-only and not redirect or default
  ID-token data.
- Updated package docs, focused tests, generated API reference artifacts, and a
  Changeset for `@cubid/core` and `@cubid/auth`.

Validation:

- `pnpm --filter @cubid/core test`
- `pnpm --filter @cubid/auth build`
- `pnpm exec vitest run --config vitest.config.ts packages/auth/src/index.test.ts packages/core/src/index.test.ts`
- `pnpm docs:api:build`
- `pnpm docs:api:check`
- `pnpm validate:yeet`
- `git diff --check`

Follow-ups:

- Open a PR from `codex/friendr-public-contract-sdk` into `dev`.
- Keep FriendR endpoint wrappers out of the public SDK unless a later handoff
  explicitly promotes a stable dapp-facing route.
