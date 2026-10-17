# SDK consumer contracts218–220

## 2026-10-17T14:33:27.837097+00:00 - Pin existing consumer identity boundaries

- agent: Codex SDK stream
- branch: codex/sdk-allocator-consumer-contracts-20261017-sol
- head: ae896ce479b0e3ae63d3dd9537b2542f1548d39a
- summary: Read all assigned Cubid218/219/220 and mirror334/335/336 issue bodies/comments, inspect existing private allocator and SET/email contracts, return inline consumer compatibility recommendations to parent. Add general public namespace/email/event guidance,13 existing-entrypoint consumer tests and links/status notes. No final resolver DTO, private signer/route, issuer field, runtime API, backend, migration or main-only backport implemented. Keep issues open for Noak's cross-project closure.
- validation: Auth/core CJS/ESM/declaration builds pass in this worktree.13 focused tests pass against these built public exports; focused ESLint/no-emit acceptance typecheck and11 relative-link/whitespace checks pass. Initial normal local resolution hit old compiled auth through canonical shared node_modules; isolated cache config selects this worktree's builds without changing canonical sources/deps. Fresh canonical CI will validate clean package resolution.
- follow-ups: Parent→Identity version decisions:218 immutable toe/re-consent ordering/ties/legacy policy;220 preserve existing strict uuid response version and announce requested uid version;219 derive companion only for same consented verified email under announced profile. Parent owns scoped SET backport direction; no main merge. Detailed private packet retained locally, not published as public SDK transport. Preserve one-Preview approval/candidate and dirty Starter; no hosted operations, credentials, initialization, release, external app changes or issue closure.
