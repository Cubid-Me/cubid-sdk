# `@cubid/core` Publishing Runbook

This runbook is the operator checklist for publishing `@cubid/core` to npm and
JSR. The repo is already wired for tokenless publishing from GitHub Actions.
npm bootstrap publication, npm trusted publishing, and the first live JSR
publication are complete.

The canonical public SDK home is `Cubid-Me/cubid-sdk`. Do not publish
`@cubid/core` from `cubid-passport`.

## Release Contract

- npm package: `@cubid/core`
- JSR package: `@cubid/core`
- GitHub repository: `Cubid-Me/cubid-sdk`
- Workflow: `.github/workflows/publish.yml`
- Release branch: `main`
- Release workflow trigger: manual `workflow_dispatch`

Before a release, verify the current registry and local-auth state instead of
relying on old notes:

```sh
npm view @cubid/core version
npm whoami
```

If `npm view` returns a 404, the package has not been published yet. If
`npm whoami` fails, the local machine is not authenticated to npm.

Current verified state as of 2026-05-02:

- npm: `@cubid/core@0.1.0` is live
- npm trusted publishing: configured for `Cubid-Me/cubid-sdk`
- JSR dry-run: passes locally from `packages/core`
- JSR package page: live at `https://jsr.io/@cubid/core`
- Earlier GitHub Actions JSR publish attempt from `main` failed in run `25208963795`
  with `actorNotAuthorized`, which points to missing JSR-side package/repo
  authorization rather than a repo-side build failure
- JSR publish succeeded from GitHub Actions run `25265529712` after the package
  was linked to `Cubid-Me/cubid-sdk`

Do not publish from a personal npm account as a routine release path. Official
Cubid packages should be owned by the npm `cubid` organization and released
through trusted publishing from GitHub Actions.

## Repo-Side Tasks

- Keep the package runtime-agnostic and publishable.
- Run npm pack and JSR dry-runs to validate release artifacts.
- Keep the GitHub Actions workflow ready for trusted publishing.
- Open PRs that update package code, docs, and release automation.
- Run the publish workflow from GitHub Actions for future releases.

## What Needs A Human Account Owner

You or another npm/JSR owner must handle registry ownership and repo-link setup
because those depend on account permissions. This should be done with the
official Cubid org accounts, not an agent-owned or personal workaround.

## npm Setup

1. Sign in at `https://www.npmjs.com/`.
2. Confirm the npm organization `cubid` exists.
3. Confirm your account is a member of the `cubid` organization.
4. Confirm the `developers` team exists and has package publish/admin access for
   Cubid SDK packages.
5. Search for `@cubid/core`.
6. If `@cubid/core` exists, open package settings and configure Trusted
   Publishing:
   - Provider: `GitHub Actions`
   - Organization or user: `Cubid-Me`
   - Repository: `cubid-sdk`
   - Workflow filename: `publish.yml`
   - Environment name: leave blank
7. In the package settings, set publishing access to require 2FA and disallow
   tokens after trusted publishing is confirmed working.

### If npm Says The Package Does Not Exist

npm's trusted-publisher UI is package-settings based. If npm does not let you
configure Trusted Publishing before the first package version exists, use this
bootstrap path:

1. Make sure this publishing setup PR has merged to `main`.
2. Use the official npm org owner account, not an agent or personal automation
   token.
3. Publish version `0.1.0` once from the clean `main` release commit with:

   ```sh
   pnpm --filter @cubid/core build
   cd packages/core
   pnpm publish --access public --no-git-checks
   ```

4. Immediately configure Trusted Publishing with the fields above.
5. Immediately restrict publishing access to require 2FA and disallow tokens.
6. Future releases must use the GitHub Actions workflow, not local publish.

This one-time bootstrap is only acceptable if npm does not support creating the
trusted-publisher binding for an unpublished package. Do not store a long-lived
npm automation token in this repository.

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
JSR supports tokenless publishing from GitHub Actions after the package is
linked to the repository.

If the first live publish fails from GitHub Actions with
`actorNotAuthorized`, treat that as confirmation that the JSR package is not
yet authorized for `Cubid-Me/cubid-sdk`. Fix the JSR package/repository
binding first, then re-run the publish workflow from `main`.

## Release Steps After Setup

1. Ensure the release commit is merged to `main`.
2. Open GitHub Actions for `Cubid-Me/cubid-sdk`.
3. Select workflow `Publish Packages`.
4. Click `Run workflow`.
5. Select branch `main`.
6. Set `package_name` to `@cubid/core`.
7. Set `publish_npm` and/or `publish_jsr` to `true`.
8. Run the workflow.
9. Confirm the workflow passes and the package pages show the new version.

For workspace packages beyond `@cubid/core`, keep the publish path on
`pnpm publish` so internal workspace dependencies are rewritten to real
published versions in the package metadata. The release workflow should not use
`npm publish` for packages that depend on other `@cubid/*` workspace packages.

The workflow fails intentionally if a publish is dispatched from any branch
other than `main`.

## Verification Commands

Run these before a release PR:

```sh
pnpm --filter @cubid/core test
pnpm --filter @cubid/core typecheck
pnpm --filter @cubid/core deno:check
pnpm --filter @cubid/core build
pnpm --filter @cubid/core pack:dry-run
pnpm --filter @cubid/core jsr:dry-run
```

After publication:

```sh
npm view @cubid/core
```

Also confirm JSR shows `@cubid/core` and that a Deno/Supabase Edge import can
use `jsr:@cubid/core`.

## License

`@cubid/core` is licensed as Apache-2.0. The license applies to the public SDK
package in `packages/core`, not automatically to every package in this public
monorepo or to private backend services such as `cubid-passport`.
