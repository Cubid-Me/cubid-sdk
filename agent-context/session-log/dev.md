# Dev Session Log

## 2026-06-11T19:27:19.000Z - Roadmap intake for Identity boundary and assurance ergonomics

- agent: Codex
- branch: dev
- head: 8ca64752
- summary: Ingested the new Identity protocol boundary cross-repo handoff and added roadmap items for passkey-first auth assurance ergonomics, app-recoverable-wallet hosted smoke gaps, SIWC guide refresh, and Identity issuer documentation alignment.
- validation: `git diff --check`
- follow-ups: Implement S16 before S15.5 so the SIWC guide refresh treats `https://id.cubid.me` as the long-term issuer boundary rather than preserving `https://login.cubid.me` as the default.

## 2026-06-11T19:29:30.000Z - S16 Identity protocol boundary docs

- agent: Codex
- branch: dev
- head: 02d5393a
- summary: Completed S16 by updating public SDK docs, examples, agent guidance, and generated API reference text so `https://id.cubid.me` is the stable SIWC/OIDC issuer boundary, while `https://login.cubid.me` is documented only as a temporary compatibility host.
- validation: `pnpm docs:api:build`; `pnpm docs:api:check`; `git diff --check`
- follow-ups: Implement S15 assurance ergonomics and then refresh the SIWC guide with the now-proven hosted QR handoff and lost-passkey recovery behavior.

## 2026-06-11T19:34:08.000Z - S15.1 recoverable wallet hosted smoke strategy

- agent: Codex
- branch: dev
- head: efec4a65
- summary: Completed S15.1 by adding a recoverable-wallet hosted smoke strategy, linking it from package and integration docs, and adding a consumer-style acceptance test that stitches `@cubid/core` enrollment/release-start to `@cubid/wallet-recovery` hosted launch and release completion.
- validation: `pnpm docs:api:build`; `pnpm exec vitest run --config vitest.config.ts src/wallet-recovery-hosted-path.acceptance.test.ts src/wallet-recovery.acceptance.test.ts` from `packages/acceptance`; `pnpm exec vitest run packages/wallet-recovery/src/index.test.ts`; `pnpm docs:api:check`; `git diff --check`
- follow-ups: Run a real hosted app-recoverable-wallet smoke against Cubid Identity/Passport with a marked throwaway relying app before calling production recovery UX complete.

## 2026-06-11T19:35:28.000Z - S15.2 typed auth assurance claims

- agent: Codex
- branch: dev
- head: 38ba0aac
- summary: Completed S15.2 by adding typed optional `acr` and `amr` fields to `CubidIdTokenClaims`, documenting the fields in `@cubid/auth`, and adding a focused decode test for passkey-backed assurance claims.
- validation: `pnpm docs:api:build`; `pnpm exec vitest run packages/auth/src/index.test.ts`; `pnpm --filter @cubid/auth typecheck`; `pnpm docs:api:check`; `git diff --check`
- follow-ups: Implement S15.3 passkey-assurance inspection helpers on top of the typed claim surface.
