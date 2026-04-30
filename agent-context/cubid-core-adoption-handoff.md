# Cubid SDK V2 Handoff: Adopt `@cubid/core` As Canonical Public SDK Foundation

## Purpose

This handoff is for the next coding agent working in
`/Users/botmaster/src/cubid/cubid-sdk-v2`.

Do not publish `@cubid/core` from `cubid-passport` yet. The stronger
implementation currently lives in the private/backend monorepo, but the
canonical public home for API and SDK packages should be this SDK repo, or a
renamed successor of it, because the SDK should be open-source while Passport,
Admin, OIDC, provider secrets, database migrations, and runtime auth logic
should remain private.

The task is not to keep the old SDK implementation as-is. The task is to make
this repo the public source of truth and import/adopt the stronger
`@cubid/core` implementation that was recently built in
`/Users/botmaster/src/cubid/cubid-passport/packages/core`.

## Decision To Preserve

Use this repo as the canonical public SDK home.

Keep `cubid-passport` as the private identity-provider/backend repo. It should
own hosted login, Passport UI, Admin, OIDC issuer endpoints, signing keys,
passkey verification, consent persistence, Supabase service-role access,
runtime abuse controls, and database migrations.

This repo should own public SDK packages and developer-facing examples:

- `@cubid/core`: runtime-agnostic API client and shared SDK types
- `@cubid/react`: React hooks/components and profile-completion primitives
- chain-specific packages such as `@cubid/evm`, `@cubid/wagmi`,
  `@cubid/solana`, `@cubid/cardano`, `@cubid/sui`, and `@cubid/near`
- future optional packages such as `@cubid/comms` and `@cubid/secrets`

The public SDK should consume stable HTTP contracts. It should not import
private Passport app code, service-role helpers, migrations, OIDC signing code,
or backend-only packages.

## Current State In This SDK Repo

This local folder currently appears not to be a Git checkout on this machine.
Before implementation, initialize or restore the correct Git remote/checkout so
branching, commits, PRs, and publishing provenance work normally.

Current package shape:

- `packages/api`: `@cubid/api`, older runtime-agnostic v2 API client
- `packages/web2`: headless OTP/AllowPage/OAuth stamp helpers
- `packages/web2-react`: React UI primitives for web2 flows
- `packages/web3`: wallet-oriented helpers built on `@cubid/api`

The old `@cubid/api` implementation already has useful ergonomics:

- `tsup` build output for ESM/CJS
- Deno check support
- normalized response helpers
- broader v2 route wrappers such as `addStamp`, location, user data,
  search-location, and OTP
- React package prototypes for OTP and provider connection flows

But package names and boundaries should be updated to the newer target model.
The intended foundation package is `@cubid/core`, not `@cubid/api`.

## Stronger Implementation To Import From `cubid-passport`

Source repo/path:

```txt
/Users/botmaster/src/cubid/cubid-passport/packages/core
```

Important source files/artifacts to port:

- `packages/core/src/index.ts`
- `packages/core/src/index.test.ts`
- `packages/core/README.md`
- `packages/core/jsr.json`
- `packages/core/package.json`
- `packages/core/LICENSE`
- `packages/core/deno/supabase-edge-smoke.ts`
- `packages/core/tsconfig.json`
- `packages/core/tsconfig.build.json`

Also review and selectively port supporting docs from `cubid-passport`:

- `docs/engineering/cubid-core-package.md`
- `docs/engineering/core-publishing-runbook.md`
- `docs/engineering/sdk-package-target-state.md`
- `docs/engineering/next-supabase-edge-integration-guide.md`
- relevant E02 todos from `agent-context/todo.md`

The newer `@cubid/core` implementation has the desired posture:

- package name `@cubid/core`
- Apache-2.0 package-local license
- ESM-only package metadata
- runtime-agnostic implementation using standard `fetch`, `Headers`,
  `RequestInit`, `URL`, and JSON
- no React, Next.js, Firebase, Supabase SDK, Node-only APIs, browser-only
  globals, wagmi, or chain SDK dependencies
- caller-injected `fetch`
- structured `CubidApiError` with category, code, endpoint, request ID, status,
  and details
- explicit malformed-success-response handling
- low-level wrappers for current Passport v2 routes
- high-level helpers:
  - `ensureUserByEmail`
  - `fetchIdentity`
  - `fetchScore`
  - `fetchStamps`
  - `syncIdentitySnapshot`
- normalized camelCase response models with raw payload retention
- OTP wrappers that do not expose raw OTP values
- Deno/Supabase Edge smoke validation
- npm pack and JSR dry-run scripts

## Recommended Implementation Plan

### 1. Restore Repo Hygiene First

Before touching package code:

1. Confirm this folder is the intended SDK repo.
2. Restore or clone the Git repository if `.git` is missing.
3. Create a feature branch from the canonical base branch.
4. Add an `AGENTS.md` if missing, or update it to say:
   - this repo is the canonical public SDK home
   - do not put private Passport/Admin/OIDC runtime code here
   - do not publish from `cubid-passport`
   - public package PRs target this SDK repo's main development branch
5. Create or update `agent-context/todo.md` and `agent-context/session-log.md`
   if this repo does not already have those planning artifacts.

### 2. Rename Or Replace `@cubid/api` With `@cubid/core`

Recommended path:

1. Rename `packages/api` to `packages/core`.
2. Change package name from `@cubid/api` to `@cubid/core`.
3. Decide whether this repo should keep ESM/CJS dual output from the older SDK
   or adopt the ESM-only output from `cubid-passport`.
4. Default recommendation: preserve the stronger runtime-agnostic source from
   `cubid-passport`, but keep any older build/release ergonomics that make
   public SDK publishing easier.
5. Update root scripts:
   - `deno:check:api` should become `deno:check:core`
   - references to `@cubid/api` should become `@cubid/core`
6. Update workspace dependencies:
   - `@cubid/web2` should depend on `@cubid/core`
   - `@cubid/web3` should depend on `@cubid/core`
   - future React package should depend on `@cubid/core`

Do not publish both `@cubid/api` and `@cubid/core` unless there is a deliberate
compatibility plan. Since `@cubid/core` is not yet published, this is the clean
moment to make `@cubid/core` the public foundation.

### 3. Preserve The Best Old SDK Ergonomics

When replacing the implementation, do not discard the useful old SDK work.
Compare the older files under `packages/api/src/` and port anything still
valuable:

- endpoint coverage beyond the current core implementation
- normalized response model details
- custom header support if it remains safe
- endpoint-aware error metadata
- Deno check conventions
- `tsup` release output if this repo prefers dual ESM/CJS packages

Do not port weaker or unsafe behavior:

- plaintext OTP exposure
- broad legacy defaults that hide the target origin
- framework dependencies in core
- Node-only assumptions
- chain SDKs or React dependencies inside core
- browser-sign-in OAuth helpers that use dapp API keys

### 4. Update Package Ecosystem Names

The target package names should move away from the old `web2/web2-react/web3`
mental model where appropriate:

- `@cubid/api` -> `@cubid/core`
- `@cubid/web2-react` -> likely `@cubid/react`
- `@cubid/web3` -> split into chain-specific packages over time:
  - `@cubid/evm`
  - `@cubid/wagmi`
  - `@cubid/solana`
  - `@cubid/cardano`
  - `@cubid/sui`
  - `@cubid/near`

This renaming does not all need to happen in one PR. The first release blocker
is `@cubid/core`. Add follow-up todos for React and chain packages.

### 5. Recreate The Publishing Setup Here

Port/adapt the publishing work from `cubid-passport` into this repo:

- package-local `packages/core/LICENSE` with Apache-2.0
- `package.json` license `Apache-2.0`
- `jsr.json` license `Apache-2.0`
- npm `publishConfig.access = "public"`
- npm pack dry-run script
- JSR dry-run script
- Deno/Supabase Edge smoke script
- GitHub Actions publish workflow using trusted publishing
- publishing runbook

Important: publishing should now happen from this SDK repo, not from
`cubid-passport`.

The npm package `@cubid/core` was checked during the passport work and was not
published at that time. A local npm publish attempt from `cubid-passport` was
blocked by npm 2FA before publication, so there should still be no public
`@cubid/core@0.1.0` unless someone published it after this handoff was written.
Verify with:

```sh
npm view @cubid/core version
```

If it returns 404, publish from this repo after the package migration is ready.

### 6. Add SDK Repo Todos

Create/update `agent-context/todo.md` in this SDK repo with todos like:

#### S01 Adopt `@cubid/core` As Canonical API Package

Rename or replace `packages/api` with `packages/core`, port the stronger
runtime-agnostic implementation from `cubid-passport`, preserve valuable old SDK
ergonomics, update workspace dependencies, and ensure `@cubid/core` is the only
foundation package targeted for first public release.

#### S01.1 Reconcile Old `@cubid/api` With New `@cubid/core`

Compare `packages/api/src/*` against the new `@cubid/core` implementation.
Cherry-pick complementary wrappers and error details, but reject unsafe legacy
behavior. Decide whether to keep a compatibility alias later or skip it because
`@cubid/api` was not the chosen public name.

#### S01.2 Add Deno, Supabase Edge, npm, and JSR Release Validation

Port Deno smoke checks, npm pack dry-runs, JSR dry-runs, and GitHub Actions
trusted publishing into this SDK repo. Validate importability in Node, Deno,
and Supabase-Edge-like environments.

#### S01.3 Publish `@cubid/core@0.1.0`

After review and merge, publish `@cubid/core` from this public SDK repo using
npm/JSR owner-controlled or trusted publishing flow. Verify npm and JSR package
pages, install/import examples, and provenance links point to this SDK repo.

#### S02 Rename/Adapt React Package

Plan the migration from `@cubid/web2-react` to `@cubid/react`. Preserve useful
components such as phone OTP, provider connect buttons, callback parsing, and
profile-completion helpers while keeping React-specific logic out of core.

#### S03 Split Chain Packages

Plan the migration from `@cubid/web3` into chain-specific packages. Start with
lightweight type/contracts packages and only introduce heavier dependencies,
such as `viem` or chain SDKs, inside the relevant chain package.

### 7. Mark Passport Todos As Ingested

After the SDK repo has adopted these todos, update
`/Users/botmaster/src/cubid/cubid-passport/agent-context/todo.md` so the
passport roadmap no longer implies that SDK publication lives there.

In `cubid-passport`, mark or annotate these todos as **ingested into
`cubid-sdk-v2`**:

- `E02.1 Publish @cubid/core as a dual-target runtime-agnostic package`
- `E02.1.1 Complete @cubid/core registry-side first release`
- `E02.2 Add a stable server-facing identity sync contract to @cubid/core`
- `E02.2.1 Port the best runtime-agnostic SDK ergonomics from cubid-sdk-v2`
- `E02.3 Publish @cubid/react and chain SDK packages with profile-completion primitives`
- `E02.3.1 Adapt the older web2, React, and wallet SDK prototypes into the new package model`
- `E02.4 Add Deno validation, integration guides, examples, and stability notes`

Recommended passport wording:

```txt
Status: Ingested into cubid-sdk-v2
Timestamp completed: <UTC timestamp>
Feature branch: <sdk repo branch or handoff branch>
Head: <sdk repo commit>
Session-log reference(s): <sdk repo session refs>
```

If the existing status enum does not allow that exact value, keep the status as
`Completed` and add a first line to the todo body:

```txt
Ingested into /Users/botmaster/src/cubid/cubid-sdk-v2 on <date>; do not
continue SDK publication from cubid-passport.
```

Also update passport docs to say:

- `cubid-passport` is the private backend/identity-provider repo
- the public SDK canonical home is `cubid-sdk-v2` or its renamed successor
- package publication happens from the SDK repo

### 8. Validation Expectations

At minimum, the SDK repo should pass:

```sh
pnpm install
pnpm --filter @cubid/core test
pnpm --filter @cubid/core typecheck
pnpm --filter @cubid/core deno:check
pnpm --filter @cubid/core build
pnpm --filter @cubid/core pack:dry-run
pnpm --filter @cubid/core jsr:dry-run
pnpm test
pnpm typecheck
pnpm build
```

If the repo keeps `vitest`/`tsup`, adapt scripts accordingly. Do not weaken the
runtime-agnostic guarantee just to preserve an older build setup.

## Publishing Warning

Do not run:

```sh
cd /Users/botmaster/src/cubid/cubid-passport/packages/core
npm publish --access public
```

That was the temporary bootstrap path before deciding on the canonical SDK home.
Now that the canonical home is this SDK repo, publish only after `@cubid/core`
has been adopted here.

## Suggested First Commit Sequence

1. `docs: add sdk adoption roadmap`
   - add this handoff to repo docs/agent context
   - add SDK repo todos/session log
2. `refactor(core): adopt cubid core package`
   - rename/import package code and update workspace dependencies
3. `test(core): port runtime sdk coverage`
   - port and reconcile tests
4. `docs(core): add publishing and edge guides`
   - add README/runbook/integration docs
5. `ci(core): validate npm and jsr release artifacts`
   - add publish/dry-run workflows
6. `chore(passport): mark sdk todos ingested`
   - in the private repo, update E02 todos so future agents skip SDK
     publication work there

Keep these as separate reviewable commits or PRs if the diff gets large.

