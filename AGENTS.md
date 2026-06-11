# AGENTS

## Branch-Scoped Session Logs And Todos

- Use `agent-context/session-log/` for active session logs. Do not add new entries to legacy `agent-context/session-log.md` files.
- For feature branches, update the branch log immediately before each commit. Use `YYYY-MM-DD-featurebranch.md` in single-app repos and `YYYY-MM-DD-app-featurebranch.md` in monorepos.
- Direct work on `main` may use `agent-context/session-log/main.md`; direct work on `dev` may use `agent-context/session-log/dev.md` only when the user has explicitly authorized direct shared-branch work on that branch.
- Each entry must include UTC timestamp, agent, branch, head, summary, validation, and follow-ups.
- Keep `agent-context/todo.md` focused on roadmap items and active follow-ups. Completed work belongs in the current branch log.
- See `agent-context/session-log/README.md` for naming and archival rules.

This repo is the canonical public SDK home for Cubid and is intended to live at
`Cubid-Me/cubid-sdk`.

## Boundary Rules

- The private parent Cubid application/runtime repo lives separately in the
  `cubid-passport` repository.
- Keep private Passport/Admin/OIDC runtime code out of this repo.
- Do not add non-API or non-SDK product code to this repo.
- Do not publish public SDK packages from `cubid-passport`.
- This repo owns public SDK packages, developer-facing examples, and package publishing.
- `@cubid/core` is the public runtime-agnostic foundation package.
- Browser-safe hosted-flow and verification helpers belong in a headless browser package layer, not directly in React and not in core.
- React-specific logic belongs in a React package, not in core.
- Chain-specific logic should move toward dedicated chain packages rather than accumulate in shared packages.
- "Sign in with Cubid" OAuth/OIDC helpers should live in dedicated auth packages rather than being forced into `@cubid/core` or the generic React package.
- `https://id.cubid.me` is the target stable public Identity issuer for Sign in with Cubid. SDKs should use OIDC discovery and standard OIDC endpoints from that issuer rather than calling Passport, Verify, Admin, or internal OIDC interaction routes directly.
- Signed-in messaging channel and preference management should land in a future dedicated communications package family rather than being forced into `@cubid/core` or the browser layer.
- Future server-authenticated notification send or status helpers should stay in `@cubid/core` only when Passport promotes stable dapp-facing backend contracts for them.
- Recoverable wallet work should model Cubid as an identity-bound recovery
  provider, not as a wallet generator, normal signer, transaction broadcaster,
  MPC provider, or server-side recovery-material reader.
- Browser/client recovery helpers belong in dedicated wallet-recovery packages;
  dapp-authenticated recovery bundle metadata helpers belong in `@cubid/core`.
- Any SDK change that could affect underlying data models, API contracts,
  response shapes, auth flows, or other interface structure must first be
  evaluated for impact on `cubid-passport` before implementation.

## Cross-Repo Coordination

- When an SDK change has corresponding implementation or follow-up impact in
  `cubid-passport`, create or update a sibling thread in both repos under
  `agent-context/cross-repo-comms/`.
- Treat any new dirty files in this repo under
  `agent-context/cross-repo-comms/` as incoming sibling notes from Passport-side
  or downstream agents and review or address them as part of the current task.
- Keep legacy `messages-from-*` folders as archives. Do not create new live
  cross-repo notes there unless the user explicitly asks for the old path.
- Every live cross-repo note must have a sibling file in each corresponding repo
  with the same `thread_id`; when one sibling gets substantive prose, update the
  other sibling in the same working session so git status notifies both agents.
- When you update a sibling cross-repo note in another local repo, intentionally
  leave that other repo dirty unless the user explicitly asks you to switch over
  and commit it there too; the dirty state is the notification mechanism for the
  other repo's active agent.
- When cross-repo sibling notes or other inbound coordination files appear dirty
  in this repo, treat them as actionable inbox items: review them, address them
  if appropriate, and commit the resulting update in this repo rather than
  leaving the local inbox state unresolved.

## Current Migration Direction

- `packages/core` replaces the former `packages/api` package.
- `packages/auth` now carries the first browser-safe OIDC and PKCE foundation for Sign in with Cubid.
- `packages/auth-react` now carries the React session, callback, and sign-in ergonomics on top of `@cubid/auth`.
- `packages/browser` now carries the first-class headless browser layer, while `@cubid/web2` remains only as a frozen deprecated compatibility package.
- `packages/react` now carries the React layer, while `@cubid/web2-react` remains only as a frozen deprecated compatibility package.
- `packages/comms` now carries the signed-in Passport-user messaging profile layer for channels, verification, preferences, and permission metadata.
- `packages/wallet-recovery` and `packages/wallet-recovery-react` are the next
  dedicated package family for passkey-first, app-mediated recoverable wallet
  recovery UX once implemented.
- `packages/evm` now carries the first chain-specific split from `@cubid/web3`, and `packages/wagmi` now carries wagmi-specific React helpers on top of `@cubid/evm`.
- `packages/aptos`, `packages/bitcoin`, `packages/cosmos`, `packages/near`, `packages/polkadot`, `packages/solana`, `packages/starknet`, `packages/stellar`, `packages/sui`, and `packages/tezos` now carry additional chain-specific wallet layers on top of `@cubid/core`.
- `@cubid/web3` now remains only as a frozen compatibility package with manual-only maintenance, and new chain-specific work should prefer dedicated packages instead of expanding the shared surface.
- Prefer the dedicated `@cubid/auth` and `@cubid/auth-react` package family for hosted OIDC login rather than collapsing auth concerns into existing packages.
- Keep Passport-user notification history routes such as `POST /api/notifications/history/list` out of ordinary dapp SDK usage; they belong with signed-in profile management rather than `@cubid/core`.
- Treat legacy Cubid-generated wallet and normal Cubid-signing helpers as
  deprecated compatibility surfaces for new integrations. New wallet-adjacent
  work should use host-created wallet material, host/provider signing, and
  Cubid recovery bundles.

## Repo Hygiene Note

This local folder may be missing its `.git` checkout on some machines. Restore the canonical Git checkout before branch, commit, PR, or publish work that depends on provenance.

## Branch And CI Workflow

- Treat `dev` as the active integration branch for ongoing SDK work.
- Treat `main` as the release branch for npm and JSR publication.
- Do not implement or commit directly on shared branches, including `dev` and
  `main`, unless the user explicitly authorizes direct shared-branch work on
  that branch in the current task.
- Do implementation, review, and fix work on feature branches by default, using
  the `codex/` prefix unless the user requests a different branch name.
- Open pull requests from feature branches into `dev` so GitHub CI and code
  review run before integration.
- Open pull requests from `dev` into `main` for release promotion, rather than
  committing directly on `main`.
- Treat direct pushes to `dev` or `main` as exceptions for explicitly authorized
  emergency, cleanup, release, or operator-directed flows, not the normal yeet
  path.

## Applicability Notes

- The Supabase direct-read/write audit does not apply here. This repo is a
  public SDK monorepo, not an MCP server or multi-frontend app that should move
  runtime data access behind Supabase Edge Functions.
- Deno and Supabase Edge support matter only for consumer compatibility of
  `@cubid/core`, not because this repo itself owns deployed Supabase runtime
  code.
