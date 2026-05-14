| Requirement | Status |
| --- | --- |
| README quality | `Pass` Root README reflects the current package map, command set, and branch/release workflow. |
| License | `Pass` Apache-2.0 is present at the repo root and in published package manifests. |
| Session log hygiene | `Pass` `agent-context/session-log.md` is current through the latest `S03` package-slice work. |
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
| Active roadmap closeout | `Partial` Remaining non-closed roadmap item is still `S03` in `agent-context/todo.md`; `@cubid/aptos`, `@cubid/bitcoin`, `@cubid/cardano`, `@cubid/cosmos`, `@cubid/near`, `@cubid/polkadot`, `@cubid/solana`, `@cubid/starknet`, `@cubid/stellar`, `@cubid/sui`, and `@cubid/tezos` are extracted, and the `@cubid/web3` compatibility-closeout path is now broken into explicit freeze, migration, and release-policy follow-ups. |
