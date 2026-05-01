# Session Log

## session: s13-evm-package-slice

- Timestamp: 2026-05-01T09:50:00Z
- Summary: Created the first real chain-specific package slice as `@cubid/evm`.
- Actions:
  - Copied the current `@cubid/web3` implementation into `packages/evm`.
  - Renamed the public wallet contracts and factory names to EVM-specific equivalents such as `createCubidEvmClient`.
  - Added package-level tests confirming the new package does not pull in browser, React, or wagmi dependency edges.
  - Kept `@cubid/web3` in place so later chain splits can decide the compatibility strategy deliberately.
- Validation:
  - Ran the workspace test, typecheck, and build flows after the new package was added.

## session: s12-browser-react-package-slices

- Timestamp: 2026-05-01T09:42:00Z
- Summary: Created real `@cubid/browser` and `@cubid/react` package slices and converted the old names into compatibility wrappers.
- Actions:
  - Copied the current `@cubid/web2` surface into `packages/browser`.
  - Copied the current `@cubid/web2-react` surface into `packages/react`.
  - Switched the React package imports to depend on `@cubid/browser`.
  - Converted `@cubid/web2` and `@cubid/web2-react` into thin re-export compatibility packages.
  - Updated workspace path aliases, Vitest aliases, and repo docs to reflect the new primary package names.
- Validation:
  - Ran the workspace test, typecheck, and build flows after the package-slice changes.

## session: s11-core-jsr-live-publish-attempt

- Timestamp: 2026-05-01T09:25:00Z
- Summary: Attempted the first live JSR publish for `@cubid/core` and confirmed the remaining blocker is JSR-side authorization.
- Actions:
  - Triggered the `Publish Packages` workflow from `main` with `publish_npm=false` and `publish_jsr=true`.
  - Observed GitHub Actions run `25208963795`.
  - Confirmed the JSR publish step failed with `actorNotAuthorized`, indicating the package/repository binding is not yet authorized on the JSR side.
  - Updated the release roadmap and publishing runbook to record the exact blocker and keep the remaining work scoped to JSR owner setup.
- Validation:
  - Reviewed the failed workflow logs and confirmed the repo-side validation phase still passed before the JSR publish step failed.

## session: s10-app-disclosure-revocation-inbox

- Timestamp: 2026-05-01T09:15:00Z
- Summary: Ingested the Passport note about non-OIDC Allow Page grant history and revocation, and kept those routes out of the public core surface for now.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-01-e01-app-disclosure-revocation.md`.
  - Updated the SDK target-state guidance so user-authenticated disclosure-grant list/revoke routes are treated as future account-management or auth-surface APIs, not as dapp server APIs for `@cubid/core`.
  - Expanded the roadmap to note that revocation is now authoritative because Passport also clears matching legacy stamp permission rows.
- Validation:
  - Reviewed the updated target-state and roadmap notes after the edits.

## session: s09-profile-location-disclosure-taxonomy-inbox

- Timestamp: 2026-05-01T09:05:00Z
- Summary: Ingested the Passport profile/location disclosure taxonomy note and added typed disclosure metadata for those SDK response surfaces.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-01-e01-profile-location-disclosure-taxonomy.md`.
  - Added typed disclosure claim and granularity names to `@cubid/core` response models for profile and location helpers.
  - Updated the public SDK docs to explain the new claim names and to treat null/missing profile or location fields as potential `notGranted` outcomes.
  - Expanded the disclosure-helper roadmap so future SDK work preserves the new profile/location claim taxonomy.
- Validation:
  - Ran package-level core tests and typecheck after the type and documentation updates.

## session: s08-package-migration-planning

- Timestamp: 2026-05-01T08:52:00Z
- Summary: Wrote concrete staged migration plans for the browser, React, and chain package transitions.
- Actions:
  - Reviewed the current `web2`, `web2-react`, and `web3` public surfaces to map what must be preserved during renames and splits.
  - Added `docs/engineering/package-migration-plan.md` with phased execution plans for `@cubid/web2` -> `@cubid/browser`, `@cubid/web2-react` -> `@cubid/react`, and `@cubid/web3` -> chain packages.
  - Updated `docs/engineering/sdk-package-target-state.md` to reflect the hybrid package architecture instead of the older direct-to-React target shape.
  - Updated the repo roadmap so the browser/React rename work and chain split work are now explicitly tracked as in-progress planning efforts with completed planning subitems.
- Validation:
  - Reviewed current package entrypoints and tests before writing the migration plans.

## session: s07-core-cross-registry-verification

- Timestamp: 2026-05-01T08:32:00Z
- Summary: Verified the current cross-registry release status for `@cubid/core` and corrected docs that overstated live JSR availability.
- Actions:
  - Confirmed npm shows `@cubid/core@0.1.0` as the live `latest` release.
  - Confirmed `pnpm --filter @cubid/core pack:dry-run` and `pnpm --filter @cubid/core jsr:dry-run` still succeed locally.
  - Confirmed `https://jsr.io/@cubid/core/meta.json` currently returns 404, so the JSR package is not live yet.
  - Updated public docs and the publishing runbook to say `npm:@cubid/core` is the current Deno fallback until JSR is linked and published.
  - Split the roadmap so release verification is completed and the remaining owner-side JSR publication work is tracked separately.
- Validation:
  - Reviewed npm output, JSR dry-run output, and the updated release docs after the edits.

## session: s06-passport-runtime-disclosure-filtering-inbox

- Timestamp: 2026-05-01T08:15:00Z
- Summary: Ingested the Passport inbox note about runtime disclosure filtering and clarified that privacy-limited stamp and score results are valid success states.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-04-30-e01-disclosure-filtering-runtime.md`.
  - Updated the public `@cubid/core` package docs and the Next/Supabase integration guide to treat missing stamps, redacted helper fields, and lower/zero scores as possible disclosure-limited outcomes rather than automatic failures.
  - Expanded the future disclosure-helper roadmap to include explicit normalized privacy states such as `notGranted`.
- Validation:
  - Reviewed the affected SDK docs and roadmap entries after the edits.

## session: s05-core-bootstrap-publish

- Timestamp: 2026-05-01T00:06:00Z
- Summary: Bootstrap-published `@cubid/core@0.1.0` to npm and configured GitHub trusted publishing for future releases.
- Actions:
  - Ran the final package validation flow for `@cubid/core` from `main`.
  - Published `@cubid/core@0.1.0` to npm under the `cubid` scope.
  - Bound npm trusted publishing to `Cubid-Me/cubid-sdk` and `.github/workflows/publish.yml`.
  - Confirmed the public npm package page and `latest` dist-tag for `@cubid/core`.
- Validation:
  - Confirmed `@cubid/core` resolved publicly from npm at version `0.1.0`.
  - Confirmed npm trusted publishing was attached to the repo workflow.

## session: s04-hybrid-package-direction

- Timestamp: 2026-05-01T00:15:00Z
- Summary: Rewrote the agent backgrounder and nearby repo guidance to align on a hybrid public SDK package model.
- Actions:
  - Added `agent-context/backgrounder-for-agents.md` describing the public/private Cubid split and the target public package ecosystem.
  - Updated `AGENTS.md` so the repo rules now explicitly preserve a first-class headless browser layer, a future React rename, chain package splits, and dedicated auth package boundaries.
  - Updated `README.md` to describe both the current interim package names and the intended long-term names.
  - Updated `agent-context/todo.md` so the roadmap now tracks browser-layer renaming, React renaming, chain-package splits, dedicated auth packages, and disclosure-aligned identity helpers separately.
- Validation:
  - Reviewed the current package manifests and entrypoints before updating the background guidance.

## session: s03-passport-disclosure-grant-inbox

- Timestamp: 2026-04-30T23:55:00Z
- Summary: Ingested the Passport inbox note about persisted selective-disclosure grants and tightened SDK docs/todo language around app-scoped identifiers.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-04-30-e01-disclosure-grant-persistence.md`.
  - Updated the public integration guide to prefer app-scoped `userId` or OIDC pairwise `sub` over raw/internal identifiers.
  - Documented that returned identity/stamp data may be filtered by persisted selective-disclosure grants from `allow_page` and `oidc`, not only by legacy permission rows.
  - Expanded the SDK todo follow-up to reference the new disclosure-grant persistence message directly.
- Validation:
  - Reviewed the current SDK docs and todo state after the edits.

## session: s02-repo-boundary-agents-note

- Timestamp: 2026-04-30T23:40:10Z
- Summary: Recorded the `AGENTS.md` repo-boundary guidance update that landed in commit `8ed25ab1`.
- Actions:
  - Confirmed `AGENTS.md` now identifies `Cubid-Me/cubid-sdk` as the canonical public SDK home.
  - Confirmed the guidance keeps private Passport/Admin/OIDC runtime code in `cubid-passport`.
  - Confirmed cross-repo coordination folders are documented for SDK-to-Passport and Passport-to-SDK messages.
- Validation:
  - Reviewed the committed `AGENTS.md` contents and current repository status.
- Follow-up:
  - Future SDK-impacting backend changes from `cubid-passport` should continue to arrive through `agent-context/messages-from-cubid-passport/`.

## session: s01-core-adoption

- Timestamp: 2026-04-30T14:10:00Z
- Summary: Adopted `@cubid/core` into `cubid-sdk-v2` as the canonical public foundation package.
- Actions:
  - Replaced `packages/api` with the stronger `packages/core` implementation imported from `cubid-passport/packages/core`.
  - Updated workspace references so `@cubid/web2` and `@cubid/web3` depend on `@cubid/core`.
  - Ported package-local Apache-2.0 licensing, npm/JSR metadata, Deno smoke validation, and publish workflow scaffolding into the SDK repo.
  - Added SDK-local `AGENTS.md`, `agent-context/todo.md`, and this `session-log.md`.
  - Updated `cubid-passport` docs and E02 todos to mark SDK publication work as ingested into `cubid-sdk-v2`.
- Repo hygiene note: `/Users/botmaster/src/cubid/cubid-sdk-v2` is missing a `.git` checkout locally, so branch/head metadata and commit provenance were unavailable during this session.
