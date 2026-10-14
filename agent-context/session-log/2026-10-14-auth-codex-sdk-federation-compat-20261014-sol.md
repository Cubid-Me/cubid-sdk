# SDK federation compatibility checkpoint

## 2026-10-14T07:36:22.626006+00:00 - Implementation and recovery checkpoint

- agent: Codex SDK stream
- branch: codex/sdk-federation-compat-20261014-sol
- head: b901a69f32313ab43046867d9c625085e8fb9101 (implementation uncommitted)
- summary: Added Identity contract v1 provider hints/discovery typing, scoped crypto, portable native encoding/callbacks, state/issuer/UserInfo binding checks, generic legacy email compatibility, docs/examples, offline harness and unit-CI runtime guard. Native PR #52 retained; main-only cross-app PR #58 preserved and not merged. One external SDK worktree; Starter untouched.
- validation: Auth and auth-react typechecks pass; focused auth/auth-react ESLint passes; offline synthetic native harness passes on Node 24 and 26; git diff --check passes. Direct Vitest, auth build and generated API references remain active with logs under .cache/logs/. No hosted login evidence.
- follow-ups: Resume processes from .cache/sdk-checkpoint.json without duplication or killing, inspect generated references, commit scoped changes, prepare required PR package versions, create/attach draft PR into dev, follow CI/review. SDK #40 remains dependent on runtime consent; #43/#44 addressed pending full test verification, #46/#48 docs/compatibility partial, #51 unit-CI guard. Native async storage/full Expo app remain separate follow-ups. Public issue #40 comment was denied by auto-review as not specifically authorized; known not posted and no retry. Parent approval queued through Identity.

Tracking: Cubid monorepo #185/#191, SDK #40/#43/#44/#46/#48/#51. Identity contract a8bcc3a and draft PR #193.

## 2026-10-14T07:50:03.580267+00:00 - Tested federation/native compatibility slice

- agent: Codex SDK stream
- branch: codex/sdk-federation-compat-20261014-sol
- head: b901a69f32313ab43046867d9c625085e8fb9101
- summary: Repaired independent-review findings for exact incoming callback destination, authorization nonce binding and mandatory nonempty token subject. Exposed optional expectedNonce, renamed the provider-choice type to CubidAuthProviderHint, corrected Vitest project inheritance to use source aliases, and isolated asynchronous masked-global smoke from Vitest RPC. Added native tool --built mode. Regenerated only auth/auth-react references; no unrelated generated drift.
- validation: 257 unit tests in 27 files pass; focused 90 auth/auth-react tests pass; auth/auth-react typechecks and scoped lint pass; auth/auth-react CJS/ESM/declaration builds pass; Node24 emitted-artifact native smoke passes; references regenerate and diff check pass. Independent reviewer rechecked all three repairs, with no further actionable findings. Original failed run is preserved in .cache/logs/auth-direct-tests.log; current passing run is full-unit-source.log.
- follow-ups: Prepare local expected PR package-version metadata in separate commit, check generated docs, open draft PR into dev and follow CI/review. Full hosted Google/consent and device/Expo acceptance remain gated on Identity. SDK40 public comment remains denied/not executed; no retry.

## 2026-10-14T07:53:57.460521+00:00 - Prepare required PR package versions

- agent: Codex SDK stream
- branch: codex/sdk-federation-compat-20261014-sol
- head: 69ac1e26
- summary: Ran .github/scripts/pr-version-bump.mjs --base dev after the implementation commit, preparing auth 0.2.1 and auth-react 0.1.2 and matching reference-manifest versions. No dependencies, lockfiles or releases changed.
- validation: Exact version-only manifest diff inspected; refreshed origin/dev remains b901a69f. Full source unit suite, scoped lint/typechecks/builds and emitted native smoke passed on implementation. Canonical generated-reference check and built-auth acceptance suite are active.
- follow-ups: Collect checks; open draft PR into dev and follow CI/review. No package publishing or main merge.
