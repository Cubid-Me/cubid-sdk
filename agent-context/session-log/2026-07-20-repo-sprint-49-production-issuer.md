## 2026-07-20T19:01:39.595Z - Production issuer readiness gate

- agent: Codex
- branch: codex/sprint-49-production-issuer
- head: 0b2656ca
- summary: Added the metadata-only `@cubid/auth` Identity issuer readiness helper, CLI release gate, CI wiring, deterministic tests, consumer acceptance coverage, API reference output, and public docs for SDK Goal #35 / Task #36.
- validation: `pnpm --filter @cubid/auth build`; `pnpm exec vitest run --config vitest.config.ts packages/auth/src/index.test.ts`; `pnpm build`; `pnpm test:acceptance`; `pnpm docs:api:check`; `pnpm auth:issuer:check`; `pnpm auth:issuer:check -- --environment staging --issuer https://staging-id.cubid.me`; `pnpm lint`; `pnpm typecheck`; `git diff --check`.
- follow-ups: Continue with SDK Task #37 to align auth/auth-react/examples guidance and starter handoff details.

## 2026-07-20T19:08:57.358Z - Production and staging auth guidance alignment

- agent: Codex
- branch: codex/sprint-49-production-issuer
- head: 1abb7984
- summary: Aligned `@cubid/auth`, `@cubid/auth-react`, and example docs around discovery-first endpoint usage, explicit staging configuration, compatibility UI boundaries, and exact issuer validation; added React package and acceptance coverage for discovered endpoints and staging configuration.
- validation: `rg -n "https://id\\.cubid\\.me/authorize|login\\.cubid\\.me|staging-id\\.cubid\\.me" README.md docs packages --glob '!docs/reference/api/*.json'`; `pnpm --filter @cubid/auth build`; `pnpm --filter @cubid/auth-react build`; `pnpm exec vitest run --config vitest.config.ts packages/auth/src/index.test.ts packages/auth-react/src/index.test.tsx`; `pnpm build`; `pnpm test:acceptance`; `pnpm docs:api:build`; `pnpm docs:api:check`; `pnpm auth:issuer:check`; `pnpm auth:issuer:check -- --environment staging --issuer https://staging-id.cubid.me`; `pnpm lint`; `pnpm typecheck`; `git diff --check`.
- follow-ups: Attach starter handoff evidence and run final Goal-level validation before moving SDK Goal #35 to review.

## 2026-07-20T19:24:30.600Z - PR 38 readiness review fixes

- agent: Codex
- branch: codex/sprint-49-production-issuer
- head: 46bb060c
- summary: Addressed PR #38 review feedback by rejecting unknown Identity issuer readiness environments and requiring at least one usable JWKS signing key instead of counting arbitrary JWKS records.
- validation: `pnpm --filter @cubid/auth build`; `pnpm exec vitest run --config vitest.config.ts packages/auth/src/index.test.ts`; `pnpm auth:issuer:check -- --environment prod` failed as expected with `invalid_environment`; `pnpm docs:api:build`; `pnpm docs:api:check`; `pnpm build`; `pnpm test:acceptance`; `pnpm auth:issuer:check`; `pnpm auth:issuer:check -- --environment staging --issuer https://staging-id.cubid.me`; `pnpm lint`; `pnpm typecheck`; `git diff --check`.
- follow-ups: Push the fix commit, reply to and resolve the two PR #38 review threads.
