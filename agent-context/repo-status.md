| Requirement | Status |
| --- | --- |
| README quality | `Pass` Root README reflects the current package map, command set, and branch/release workflow. |
| License | `Pass` Apache-2.0 is present at the repo root and in published package manifests. |
| Session log hygiene | `Pass` Branch-scoped logs under `agent-context/session-log/` are the active audit trail; legacy monolithic logs are archive material only. |
| AGENTS guidance | `Pass` `AGENTS.md` covers repo boundaries, cross-repo coordination, migration direction, branch flow, and Supabase applicability. |
| Repo status snapshot | `Pass` This file now provides the lightweight repo-health snapshot for cleanup work. |
| Deferred ideas file | `Pass` `agent-context/future-ideas.md` exists and is explicitly not active roadmap work. |
| Docs placement | `Pass` Current-state engineering docs live under `docs/engineering/`; no separate target-state subtree is currently needed because target-state guidance is consolidated in package-boundary docs. |
| Cubid architecture docs | `Pass` The public/private Cubid boundary and package direction are documented in `README.md`, `AGENTS.md`, `agent-context/backgrounder-for-agents.md`, and `docs/engineering/sdk-package-target-state.md`. |
| Testing strategy | `Pass` `docs/engineering/testing-strategy.md` now defines the package-unit, package-integration, React, and consumer-acceptance layers plus local and CI command ownership. |
| Local acceptance harness | `Pass` `packages/acceptance` now validates built-package consumer flows for `@cubid/core`, `@cubid/browser`, and `@cubid/react`. |
| Coverage governance | `Pass` Vitest coverage now reports to the repo-level `coverage/` directory with documented future thresholds and a report-now/gate-later policy. |
| CI validation | `Pass` `.github/workflows/ci.yml` now runs lint, typecheck, unit tests, build, acceptance tests, coverage reporting, and core package dry-runs on PRs and `main`. |
| Publishing workflow | `Pass` `.github/workflows/publish.yml` supports trusted npm publication for the live package set and JSR publication for `@cubid/core` from `main`. |
| Supabase direct-access rule | `Not applicable` This repo ships SDK packages and examples; it does not own deployed Supabase runtime code. |
| Environment and script conventions | `Pass` Root scripts cover install/build/test/lint/typecheck/core Deno checks, and `.gitignore` excludes local env files and build outputs. |
| Developer-ingestion publishing | `Pass` Registry policy, machine-readable API reference artifacts, package metadata, and public entrypoint docs now align with the primary published SDK package surfaces. |
| Active roadmap closeout | `Pass` The current `S03` roadmap is fully represented in dedicated chain packages, and `@cubid/web3` is now documented as a frozen compatibility package with manual-only maintenance. |
| Next expansion area | `Pass` S14 is implemented as the current recoverable-wallet SDK baseline: `@cubid/core` owns server-safe recovery bundle metadata helpers, `@cubid/wallet-recovery` owns browser/client recovery UX, `@cubid/wallet-recovery-react` owns React ergonomics, chain packages remain provider-abstract, and legacy Cubid-generated wallet/signing helpers are deprecated compatibility surfaces. |
| MyPayTag paytag realignment | `Pass` S18 replaces the old Pay-To public SDK surface with Paytag-only helpers: server/Edge identity and consent helpers in `@cubid/core`, hosted action launch in `@cubid/browser`, no payment-intent helper in the paytag surface, and no list-all-paytags resolver helper. |
