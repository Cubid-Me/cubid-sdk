| Requirement | Status |
| --- | --- |
| README quality | `Pass` Root README reflects the current package map, command set, and branch/release workflow. |
| License | `Pass` Apache-2.0 is present at the repo root and in published package manifests. |
| Session log hygiene | `Pass` `agent-context/session-log.md` is current through `s34-repo-cleanup-control-plane`. |
| AGENTS guidance | `Pass` `AGENTS.md` covers repo boundaries, cross-repo coordination, migration direction, branch flow, and Supabase applicability. |
| Repo status snapshot | `Pass` This file now provides the lightweight repo-health snapshot for cleanup work. |
| Deferred ideas file | `Pass` `agent-context/future-ideas.md` exists and is explicitly not active roadmap work. |
| Docs placement | `Pass` Current-state engineering docs live under `docs/engineering/`; no separate target-state subtree is currently needed because target-state guidance is consolidated in package-boundary docs. |
| Cubid architecture docs | `Pass` The public/private Cubid boundary and package direction are documented in `README.md`, `AGENTS.md`, `agent-context/backgrounder-for-agents.md`, and `docs/engineering/sdk-package-target-state.md`. |
| Testing strategy | `Partial` Unit and component-level validation exist through `pnpm test`, but the explicit testing strategy is still open as `S09` in `agent-context/todo.md`. |
| Local acceptance harness | `Missing` There is no dedicated local end-to-end acceptance harness documented for package-consumer flows; tracked by `S09.2` in `agent-context/todo.md`. |
| Coverage governance | `Missing` No coverage thresholds or coverage-report workflow are documented yet; tracked by `S09.3` in `agent-context/todo.md`. |
| CI validation | `Pass` `.github/workflows/ci.yml` runs lint, typecheck, test, core package dry-runs, and build on PRs and `main`. |
| Publishing workflow | `Pass` `.github/workflows/publish.yml` supports trusted npm publication for the live package set and JSR publication for `@cubid/core` from `main`. |
| Supabase direct-access rule | `Not applicable` This repo ships SDK packages and examples; it does not own deployed Supabase runtime code. |
| Environment and script conventions | `Pass` Root scripts cover install/build/test/lint/typecheck/core Deno checks, and `.gitignore` excludes local env files and build outputs. |
| Developer-ingestion publishing | `Partial` npm and JSR publication exist, but broader developer-ingestion distribution work is still open as `S10` in `agent-context/todo.md`. |
| Active roadmap closeout | `Partial` Remaining non-closed roadmap items are `S02`, `S03.6`, `S04`, `S09`, and `S10` in `agent-context/todo.md`. |
