# Cubid SDK Package Publishing Policy

This document is the operator runbook for publishing the public Cubid SDK
package family from `Cubid-Me/cubid-sdk`.

The repo is already wired for tokenless publishing from GitHub Actions. npm
bootstrap publication, npm trusted publishing, and the first live JSR
publication are complete. Do not publish public SDK packages from
`cubid-passport`.

## Package Distribution Matrix

| Package | Registries | Notes |
| --- | --- | --- |
| `@cubid/core` | npm + JSR | The only package with an explicit Deno and Supabase Edge contract. |
| `@cubid/auth` | npm-only | Browser-safe OIDC and PKCE helper layer for public clients. |
| `@cubid/auth-react` | npm-only | React auth/session bindings on top of `@cubid/auth`. |
| `@cubid/aptos` | npm-only | Chain-specific Aptos package built for the npm ecosystem. |
| `@cubid/browser` | npm-only | Browser-oriented helper layer; not marketed as a Deno or JSR surface. |
| `@cubid/bitcoin` | npm-only | Chain-specific Bitcoin package built for the npm ecosystem. |
| `@cubid/cardano` | npm-only | Chain-specific Cardano package built for the npm ecosystem. |
| `@cubid/cosmos` | npm-only | Chain-specific Cosmos package built for the npm ecosystem. |
| `@cubid/react` | npm-only | React package with peer dependency assumptions. |
| `@cubid/evm` | npm-only | Chain-specific package built for the npm ecosystem. |
| `@cubid/near` | npm-only | Chain-specific NEAR package built for the npm ecosystem. |
| `@cubid/polkadot` | npm-only | Chain-specific Polkadot package built for the npm ecosystem. |
| `@cubid/solana` | npm-only | Chain-specific Solana package built for the npm ecosystem. |
| `@cubid/starknet` | npm-only | Chain-specific Starknet package built for the npm ecosystem. |
| `@cubid/sui` | npm-only | Chain-specific Sui package built for the npm ecosystem. |
| `@cubid/wagmi` | npm-only | wagmi-specific React integration package. |
| `@cubid/web3` | npm-only | Transitional umbrella package while the chain split continues. |
| `@cubid/web2` | npm-only | Deprecated compatibility wrapper; not a normal release target. |
| `@cubid/web2-react` | npm-only | Deprecated compatibility wrapper; not a normal release target. |
| `@cubid/acceptance` | Private | Local-only workspace for acceptance tests. Never publish. |

This policy is deliberate, not an incidental workflow limitation. JSR is for
runtime-agnostic packages with a real Deno or Edge value proposition, which
currently means `@cubid/core` only.

## Release Contract

- GitHub repository: `Cubid-Me/cubid-sdk`
- Workflow: `.github/workflows/publish.yml`
- Release branch: `main`
- Release workflow trigger: manual `workflow_dispatch`
- npm organization: `cubid`
- Normal package release path: trusted publishing from GitHub Actions

Before a release, verify the current registry and local-auth state instead of
relying on old notes:

```sh
npm view @cubid/core version
npm whoami
```

If `npm view` returns a 404, the package has not been published yet. If
`npm whoami` fails, the local machine is not authenticated to npm.

## Current Verified Registry State

Current verified state as of 2026-05-14:

- npm:
  - `@cubid/core@0.1.3`
  - `@cubid/auth@0.1.0`
  - `@cubid/auth-react@0.1.0`
  - `@cubid/aptos` is not published yet
  - `@cubid/browser@0.1.3`
  - `@cubid/bitcoin` is not published yet
  - `@cubid/cardano` is not published yet
  - `@cubid/cosmos` is not published yet
  - `@cubid/react@0.1.2`
  - `@cubid/evm@0.1.2`
  - `@cubid/near@0.1.0`
  - `@cubid/polkadot` is not published yet
  - `@cubid/solana@0.1.0`
  - `@cubid/starknet` is not published yet
  - `@cubid/sui` is not published yet
  - `@cubid/wagmi@0.1.2`
  - `@cubid/web3@0.1.1`
- npm trusted publishing: configured for `Cubid-Me/cubid-sdk`
- JSR:
  - `@cubid/core` is live at `https://jsr.io/@cubid/core`
  - no other Cubid SDK packages are JSR targets by policy

## Repo-Side Tasks

- Keep public packages publishable from the canonical SDK repo.
- Run package validation before release.
- Keep the GitHub Actions workflow aligned with the package matrix above.
- Keep public package metadata, READMEs, and machine-readable reference
  artifacts current.
- Use `pnpm publish` for workspace packages so internal dependency ranges are
  rewritten to real published versions in packed metadata.

## What Needs A Human Account Owner

You or another npm or JSR owner must handle registry ownership and repo-link
setup because those depend on account permissions. This should be done with the
official Cubid org accounts, not an agent-owned or personal workaround.

## npm Setup

1. Sign in at `https://www.npmjs.com/`.
2. Confirm the npm organization `cubid` exists.
3. Confirm your account is a member of the `cubid` organization.
4. Confirm the `developers` team exists and has package publish and admin access
   for Cubid SDK packages.
5. Configure trusted publishing per package where needed.
6. Set package publishing access to require 2FA and disallow tokens after
   trusted publishing is confirmed working.

Trusted publishing should be attached to the public package family in this repo,
not to a private runtime repo.

## JSR Setup

1. Sign in at `https://jsr.io/` using the Cubid-maintained GitHub identity.
2. Create or open scope `@cubid`.
3. Create or open package `@cubid/core`.
4. In the package settings, link the GitHub repository:
   - Repository: `Cubid-Me/cubid-sdk`
5. Keep tokenless GitHub Actions publishing as the release path.

JSR's current linked-repository UI may not expose a separate workflow-file
field. That is fine. The successful publish from run `25265529712` confirms the
repo link plus GitHub Actions OIDC permissions were sufficient for this repo's
`.github/workflows/publish.yml`.

If a future JSR publish fails from GitHub Actions with `actorNotAuthorized`,
treat that as a JSR package or repository authorization problem first, not as a
reason to widen JSR support to the rest of the package family.

## Release Steps

1. Ensure the release commit is merged to `main`.
2. Open GitHub Actions for `Cubid-Me/cubid-sdk`.
3. Select workflow `Publish Packages`.
4. Click `Run workflow`.
5. Select branch `main`.
6. Set `package_name` to the package you are releasing.
7. Set `publish_npm` and, for `@cubid/core` only, `publish_jsr` to `true` as
   needed.
8. Run the workflow.
9. Confirm the workflow passes and the registry page shows the new version.

The workflow intentionally rejects any JSR publish request for non-core package
names. That is the expected steady state.

The workflow also fails intentionally if a publish is dispatched from any
branch other than `main`.

## Compatibility Package Retirement

`@cubid/web2` and `@cubid/web2-react` are frozen deprecated compatibility
wrappers, not active package surfaces. Keep them installable for older imports,
but do not treat them as normal publish targets in `.github/workflows/publish.yml`.

If the old names still need an operator-side retirement signal on npm, deprecate
the entire packages instead of unpublishing them:

```sh
npm deprecate @cubid/web2 "Deprecated: use @cubid/browser instead. @cubid/web2 is a frozen compatibility wrapper and will not receive new releases."
npm deprecate @cubid/web2-react "Deprecated: use @cubid/react instead. @cubid/web2-react is a frozen compatibility wrapper and will not receive new releases."
```

Treat those commands as manual operator actions rather than a normal workflow
path. If an emergency metadata correction is ever needed later, handle it as a
manual exception, not as a supported steady-state release target.

## Verification Commands

Run these before a release PR:

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:acceptance
pnpm test:coverage
pnpm docs:api:check
pnpm check:core-package
```

For a direct `@cubid/core` release check, the core-specific dry-runs remain:

```sh
pnpm install --frozen-lockfile
pnpm --filter @cubid/core test
pnpm --filter @cubid/core typecheck
pnpm --filter @cubid/core deno:check
pnpm --filter @cubid/core build
pnpm --filter @cubid/core pack:dry-run
pnpm --filter @cubid/core jsr:dry-run
```

After publication, confirm the registry page shows the expected version:

```sh
npm view @cubid/core
```

Also confirm JSR shows `@cubid/core` when that package is part of the release.

## License

`@cubid/core` is licensed as Apache-2.0. The license applies to the public SDK
package in `packages/core`, not automatically to every package in this public
monorepo or to private backend services such as `cubid-passport`.
