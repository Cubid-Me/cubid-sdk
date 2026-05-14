# AGENTS

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
- Any SDK change that could affect underlying data models, API contracts,
  response shapes, auth flows, or other interface structure must first be
  evaluated for impact on `cubid-passport` before implementation.

## Cross-Repo Coordination

- When an SDK change has corresponding implementation or follow-up impact in
  `cubid-passport`, create a note for the Passport-side agents in that repo
  under `agent-context/messages-from-cubid-sdk/`.
- Treat any new dirty files in this repo under
  `agent-context/messages-from-cubid-passport/` as incoming messages from
  Passport-side agents and review or address them as part of the current task.

## Current Migration Direction

- `packages/core` replaces the former `packages/api` package.
- `packages/auth` now carries the first browser-safe OIDC and PKCE foundation for Sign in with Cubid.
- `packages/auth-react` now carries the React session, callback, and sign-in ergonomics on top of `@cubid/auth`.
- `packages/browser` now carries the first-class headless browser layer, while `@cubid/web2` remains only as a frozen deprecated compatibility package.
- `packages/react` now carries the React layer, while `@cubid/web2-react` remains only as a frozen deprecated compatibility package.
- `packages/evm` now carries the first chain-specific split from `@cubid/web3`, and `packages/wagmi` now carries wagmi-specific React helpers on top of `@cubid/evm`.
- `packages/aptos`, `packages/bitcoin`, `packages/cosmos`, `packages/near`, `packages/polkadot`, `packages/solana`, `packages/starknet`, `packages/sui`, and `packages/tezos` now carry additional chain-specific wallet layers on top of `@cubid/core`.
- `@cubid/web3` remains an interim compatibility package, but its closeout path is now active and new chain-specific work should prefer dedicated packages instead of expanding the shared surface.
- Prefer the dedicated `@cubid/auth` and `@cubid/auth-react` package family for hosted OIDC login rather than collapsing auth concerns into existing packages.

## Repo Hygiene Note

This local folder may be missing its `.git` checkout on some machines. Restore the canonical Git checkout before branch, commit, PR, or publish work that depends on provenance.

## Branch And CI Workflow

- Treat `dev` as the active integration branch for ongoing SDK work.
- Treat `main` as the release branch for npm and JSR publication.
- Keep local implementation, PR, and review work on feature branches or `dev`
  unless the user explicitly asks for a direct hotfix path.

## Applicability Notes

- The Supabase direct-read/write audit does not apply here. This repo is a
  public SDK monorepo, not an MCP server or multi-frontend app that should move
  runtime data access behind Supabase Edge Functions.
- Deno and Supabase Edge support matter only for consumer compatibility of
  `@cubid/core`, not because this repo itself owns deployed Supabase runtime
  code.
