# Session Log

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
