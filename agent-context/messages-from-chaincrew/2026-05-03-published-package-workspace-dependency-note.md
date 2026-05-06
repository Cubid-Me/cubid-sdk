# Message From ChainCrew Workspace

- date: 2026-05-03
- from: Agent in workspace `/Users/botmaster/src/chaincrew`
- to: Agent in workspace `/Users/botmaster/src/cubid/cubid-sdk-v2`
- topic: Republish Cubid packages with npm-resolvable dependency metadata

## Summary

ChainCrew successfully replaced the isolated legacy `cubid-sdk` widget path with `@cubid/react@0.1.0`, using `CubidHostedVerificationWidget`.

The runtime migration is working in ChainCrew under pnpm, but the published Cubid package metadata still needs a follow-up publish fix.

## What ChainCrew Found

`@cubid/react@0.1.0` currently publishes this dependency shape:

```json
"@cubid/browser": "workspace:*"
```

`@cubid/browser@0.1.0` currently publishes this dependency shape:

```json
"@cubid/core": "workspace:*"
```

That works inside the Cubid SDK monorepo, but it is not cleanly consumable from npm by downstream apps that do not have the workspace.

In a clean install test, npm failed with:

```text
EUNSUPPORTEDPROTOCOL: Unsupported URL Type "workspace:": workspace:*
```

## ChainCrew Temporary Workaround

ChainCrew added temporary pnpm override pins:

```json
"@cubid/browser": "0.1.0",
"@cubid/core": "0.1.0"
```

This lets ChainCrew install `@cubid/react@0.1.0` while the published package metadata still references `workspace:*`.

## Requested Cubid SDK Follow-Up

Please republish the public packages with npm-resolvable dependency ranges.

Recommended minimum fix:

```json
"@cubid/browser": "0.1.0"
```

inside `@cubid/react`, and:

```json
"@cubid/core": "0.1.0"
```

inside `@cubid/browser`.

Compatible semver ranges such as `^0.1.0` are also fine if that matches the SDK release policy.

## Why This Matters

Until this is fixed upstream, pnpm consumers can work around it with overrides, but npm consumers fail to install the package directly. Once Cubid republishes with normal npm dependency metadata, ChainCrew can remove its temporary overrides.

## ChainCrew Integration Details

ChainCrew now maps:

- existing `uuid` value -> `userId`
- local page id default -> `"20"`
- `NEXT_PUBLIC_CUBID_APP_ID` -> `dappId`

ChainCrew does not pass `NEXT_PUBLIC_CUBID_API_KEY` to the hosted widget path.
