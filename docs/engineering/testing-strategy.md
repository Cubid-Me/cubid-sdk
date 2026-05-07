# Cubid SDK Testing Strategy

This monorepo uses one primary test runner, one acceptance harness, and one
coverage pipeline:

- Vitest is the standard test runner across the public SDK repo.
- `packages/acceptance` is the local consumer-style acceptance harness.
- coverage is reported from the package-level Vitest suites, not from the
  acceptance harness.

The goal is to keep merge and publish decisions grounded in the public package
surfaces that consumers actually install.

## Test Layers

### 1. Package unit and contract tests

Scope:

- `@cubid/core`

These tests cover:

- request construction
- response normalization
- malformed-success handling
- error mapping
- webhook verification
- API v3 helper semantics such as idempotency and redacted summaries

Run with:

```sh
pnpm --filter @cubid/core test
pnpm test:unit
```

### 2. Package integration tests

Scope:

- `@cubid/browser`
- `@cubid/evm`
- `@cubid/wagmi`
- `@cubid/web3`

These tests validate package-local orchestration and adapter behavior while
still running against source code in a controlled environment.

Run with:

```sh
pnpm test:unit
```

### 3. React component tests

Scope:

- `@cubid/react`

These tests validate user-facing React behavior such as OTP flows, hosted
verification launchers, provider-connect callbacks, and package-boundary
constraints like avoiding wallet dependencies.

Run with:

```sh
pnpm test:unit
```

### 4. Consumer-style acceptance tests

Scope:

- `packages/acceptance`

These tests behave like a local consumer:

- they import the public package names
- they run against built package exports
- they do not reach into `src` files directly

Current acceptance scenarios:

- server-oriented `@cubid/core` usage with injected `fetch`
- hosted/browser helper usage from `@cubid/browser`
- React composition through `@cubid/react`

These tests validate package-consumer behavior, not live Passport network
integration. They are intentionally mocked and local-first.

Run with:

```sh
pnpm build
pnpm test:acceptance
```

## Command Ownership

### Fast local validation

Use this while iterating on code:

```sh
pnpm lint
pnpm typecheck
pnpm test:unit
```

### Full local validation before publish or yeet

Use this before a release or review handoff:

```sh
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:acceptance
pnpm test:coverage
pnpm check:core-package
```

### CI-required validation

The main CI workflow should enforce:

```sh
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:acceptance
pnpm test:coverage
pnpm check:core-package
```

## Coverage Governance

Coverage is now reported on every CI run, but not used as a failing gate yet.

Current policy:

- generate a text summary in logs
- generate `lcov.info` for tooling
- generate `coverage-summary.json` for future gating
- write outputs under the repo-level `coverage/` directory

Coverage target scope:

- include `@cubid/core`
- include `@cubid/browser`
- include `@cubid/react`
- include `@cubid/evm`
- include `@cubid/wagmi`
- include `@cubid/web3`

Excluded from coverage targets:

- `@cubid/web2`
- `@cubid/web2-react`
- `packages/acceptance`

Provisional future thresholds:

- lines: 80%
- statements: 80%
- functions: 80%
- branches: 70%

These thresholds are documented now so reviewers have a shared target, but CI
does not fail on them yet. The first goal is visibility and trend tracking
without punishing the repo during the migration from mixed test styles.
