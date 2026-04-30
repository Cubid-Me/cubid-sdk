# AGENTS

This repo is the canonical public SDK home for Cubid and is intended to live at
`Cubid-Me/cubid-sdk`.

## Boundary Rules

- Keep private Passport/Admin/OIDC runtime code out of this repo.
- Do not publish public SDK packages from `cubid-passport`.
- This repo owns public SDK packages, developer-facing examples, and package publishing.
- `@cubid/core` is the public runtime-agnostic foundation package.
- React-specific logic belongs in a React package, not in core.
- Chain-specific logic should move toward dedicated chain packages rather than accumulate in shared packages.

## Current Migration Direction

- `packages/core` replaces the former `packages/api` package.
- `@cubid/web2-react` is an interim package and should migrate toward `@cubid/react`.
- `@cubid/web3` is an interim package and should split over time into chain-specific packages.

## Repo Hygiene Note

This local folder may be missing its `.git` checkout on some machines. Restore the canonical Git checkout before branch, commit, PR, or publish work that depends on provenance.
