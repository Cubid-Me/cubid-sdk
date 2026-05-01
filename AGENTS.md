# AGENTS

This repo is the canonical public SDK home for Cubid and is intended to live at
`Cubid-Me/cubid-sdk`.

## Boundary Rules

- The private parent Cubid application/runtime repo lives separately at
  `/Users/botmaster/src/cubid/cubid-passport`.
- Keep private Passport/Admin/OIDC runtime code out of this repo.
- Do not add non-API or non-SDK product code to this repo.
- Do not publish public SDK packages from `cubid-passport`.
- This repo owns public SDK packages, developer-facing examples, and package publishing.
- `@cubid/core` is the public runtime-agnostic foundation package.
- Browser-safe hosted-flow and verification helpers belong in a headless browser package layer, not directly in React and not in core.
- React-specific logic belongs in a React package, not in core.
- Chain-specific logic should move toward dedicated chain packages rather than accumulate in shared packages.
- Future "Sign in with Cubid" OAuth/OIDC helpers should live in dedicated auth packages rather than being forced into `@cubid/core` or the generic React package.
- Any SDK change that could affect underlying data models, API contracts,
  response shapes, auth flows, or other interface structure must first be
  evaluated for impact on `cubid-passport` before implementation.

## Cross-Repo Coordination

- When an SDK change has corresponding implementation or follow-up impact in
  `cubid-passport`, create a note for the Passport-side agents in
  `/Users/botmaster/src/cubid/cubid-passport/agent-context/messages-from-cubid-sdk`.
- Treat any new dirty files in
  `/Users/botmaster/src/cubid/cubid-sdk-v2/agent-context/messages-from-cubid-passport`
  as incoming messages from Passport-side agents and review or address them as
  part of the current task.

## Current Migration Direction

- `packages/core` replaces the former `packages/api` package.
- `@cubid/web2` is an interim package and should migrate toward a clearer headless browser package, likely `@cubid/browser`.
- `@cubid/web2-react` is an interim package and should migrate toward `@cubid/react`.
- `@cubid/web3` is an interim package and should split over time into chain-specific packages.
- When hosted OIDC login becomes public, prefer a dedicated `@cubid/auth` and optional `@cubid/auth-react` package family rather than collapsing auth concerns into existing packages.

## Repo Hygiene Note

This local folder may be missing its `.git` checkout on some machines. Restore the canonical Git checkout before branch, commit, PR, or publish work that depends on provenance.
