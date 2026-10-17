# SDK consumer contracts218–220

## 2026-10-17T14:33:27.837097+00:00 - Pin existing consumer identity boundaries

- agent: Codex SDK stream
- branch: codex/sdk-allocator-consumer-contracts-20261017-sol
- head: ae896ce479b0e3ae63d3dd9537b2542f1548d39a
- summary: Read all assigned Cubid218/219/220 and mirror334/335/336 issue bodies/comments, inspect existing private allocator and SET/email contracts, return inline consumer compatibility recommendations to parent. Add general public namespace/email/event guidance,13 existing-entrypoint consumer tests and links/status notes. No final resolver DTO, private signer/route, issuer field, runtime API, backend, migration or main-only backport implemented. Keep issues open for Noak's cross-project closure.
- validation: Auth/core CJS/ESM/declaration builds pass in this worktree.13 focused tests pass against these built public exports; focused ESLint/no-emit acceptance typecheck and11 relative-link/whitespace checks pass. Initial normal local resolution hit old compiled auth through canonical shared node_modules; isolated cache config selects this worktree's builds without changing canonical sources/deps. Fresh canonical CI will validate clean package resolution.
- follow-ups: Parent→Identity version decisions:218 immutable toe/re-consent ordering/ties/legacy policy;220 preserve existing strict uuid response version and announce requested uid version;219 derive companion only for same consented verified email under announced profile. Parent owns scoped SET backport direction; no main merge. Detailed private packet retained locally, not published as public SDK transport. Preserve one-Preview approval/candidate and dirty Starter; no hosted operations, credentials, initialization, release, external app changes or issue closure.

## 2026-10-17T14:45:59.473367+00:00 - Consume parent-reconciled contracts

- agent: Codex SDK stream
- branch: codex/sdk-allocator-consumer-contracts-20261017-sol
- head: 98bc8b5a2b8c41d6cabeece96125e641d81c58a7
- summary: Record parent's agreed persisted integer toe, strict2026-08-14/opt-in2026-10-17 target-field split and derived verified-email companion, distinguishing agreement from backend/hosted proof. Add missing-subject and UI-marker non-promotion consumer regressions. Retain70 synthetic owner test vectors privately for parent→Identity handoff, no private transport/schema client in public SDK and no backend edits.
- validation:16 focused tests pass against worktree-built public exports; focused lint/no-emit acceptance typecheck and11 relative links/whitespace pass. Original98bc8b5a canonicalCI39041319527 passed and automatic review completed with no findings/threads. Fresh checks required for this steering update; no rereview requested.70 vectors are test inputs, not executed backend evidence.
- follow-ups: Identity owns issuer/backend/migration rollout and cross-project verification; parent owns deferred SET integration. Preserve paired issues for Noak and the conditional one-Preview packet. No hosted, credentials, deployment or downstream app operation.
