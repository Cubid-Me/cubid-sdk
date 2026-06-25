## 2026-06-24T20:45:23.300Z - GlobalPayTo Pay-To SDK roadmap intake

- agent: Codex
- branch: codex/globalpayto-cubid-mvp-dependencies
- head: c6119d30
- summary: Mirrored the PR22 Pay-To SDK handoff note, added S17 roadmap todos, documented SDK package ownership and redaction boundaries, and refreshed repo-status for the GlobalPayTo intake.
- validation: `git diff --check`; targeted `rg` for S17, GlobalPayTo, Pay-To, and planned helper references.
- follow-ups: Implement S17 runtime helpers only after Cubid monorepo PR22 lands on dev or is handed off as stable.

## 2026-06-24T20:56:09.300Z - Clarify GlobalPayTo SDK helper boundaries

- agent: Codex
- branch: codex/globalpayto-cubid-mvp-dependencies
- head: d79d4a65
- summary: Clarified that S17 core helpers should follow the initialized client/config pattern, deferred signed-in owner-management wrappers behind a ready user-session boundary, and added browser/React API-key rejection test expectations.
- validation: `git diff --check`; targeted `rg` for initialized client/config, user-session deferral, and browser/React API-key test expectations.
- follow-ups: None.

## 2026-06-25T21:10:10.300Z - GlobalPayTo Pay-To S17.1 handoff intake

- agent: Codex
- branch: codex/globalpayto-cubid-mvp-dependencies
- head: be0b4810
- summary: Ingested the updated Cubid monorepo PR22 handoff that marks Pay-To backend support merged to dev, completed S17.1, and updated architecture/package-boundary docs from prerequisite framing to implementation-ready framing.
- validation: `git diff --check`; targeted `rg` for S17.1, PR22 merged-to-dev, and ready-for-sdk-implementation references.
- follow-ups: Implement S17.2 and S17.3 as `@cubid/core` types and initialized-client methods.

## 2026-06-25T21:16:28.300Z - GlobalPayTo Pay-To S17.2/S17.3 core helpers

- agent: Codex
- branch: codex/globalpayto-cubid-mvp-dependencies
- head: efb299ce
- summary: Added `@cubid/core` Pay-To request/response types and initialized-client methods for eligibility checks, alias resolution, grant status, lifecycle events, hosted action start, and constrained payment-intent-created notification sends; bumped core to 0.1.8.
- validation: `pnpm --filter @cubid/core test`; `pnpm --filter @cubid/core typecheck`.
- follow-ups: Continue with S17.4 server-only idempotency/API-key boundary hardening, then S17.5 browser hosted action helpers.

## 2026-06-25T21:17:11.300Z - GlobalPayTo Pay-To S17.4 idempotency boundary

- agent: Codex
- branch: codex/globalpayto-cubid-mvp-dependencies
- head: b14af2ef
- summary: Added focused coverage that Pay-To write helpers auto-generate idempotency keys through the initialized core client and return the resolved keys, preserving the server-only API-key/idempotency boundary.
- validation: `pnpm --filter @cubid/core test`; `pnpm --filter @cubid/core typecheck`.
- follow-ups: Continue with S17.5 browser hosted action helper without accepting dapp API keys.
