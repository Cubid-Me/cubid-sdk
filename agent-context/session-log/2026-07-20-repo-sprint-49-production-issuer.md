## 2026-07-20T19:01:39.595Z - Production issuer readiness gate

- agent: Codex
- branch: codex/sprint-49-production-issuer
- head: 0b2656ca
- summary: Added the metadata-only `@cubid/auth` Identity issuer readiness helper, CLI release gate, CI wiring, deterministic tests, consumer acceptance coverage, API reference output, and public docs for SDK Goal #35 / Task #36.
- validation: `pnpm --filter @cubid/auth build`; `pnpm exec vitest run --config vitest.config.ts packages/auth/src/index.test.ts`; `pnpm build`; `pnpm test:acceptance`; `pnpm docs:api:check`; `pnpm auth:issuer:check`; `pnpm auth:issuer:check -- --environment staging --issuer https://staging-id.cubid.me`; `pnpm lint`; `pnpm typecheck`; `git diff --check`.
- follow-ups: Continue with SDK Task #37 to align auth/auth-react/examples guidance and starter handoff details.
