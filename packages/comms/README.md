# `@cubid/comms`

Signed-in messaging profile helpers for Cubid Passport notification channels and
preferences.

Use `@cubid/comms` when a Passport-authenticated user needs to manage
Cubid-owned notification channels, verification steps, or messaging
preferences without exposing raw destinations or provider internals to the app.

Choose this package instead of:

- `@cubid/core` for Passport-user profile management surfaces
- `@cubid/browser` for hosted browser flows
- `@cubid/react` for React-specific UI composition

Use `@cubid/core` later for server-authenticated dapp notification send and
status helpers. Those APIs stay separate from signed-in user channel
management.

## Install

```sh
pnpm add @cubid/comms
```

## Registry availability

- npm-only

## API reference

- Root package matrix: [/Users/botmaster/src/cubid/cubid-sdk-v2/README.md](/Users/botmaster/src/cubid/cubid-sdk-v2/README.md)
- Machine-readable API reference: [/Users/botmaster/src/cubid/cubid-sdk-v2/docs/reference/api/comms.json](/Users/botmaster/src/cubid/cubid-sdk-v2/docs/reference/api/comms.json)

## Current scope

This first package slice defines the signed-in Passport-user client boundary for
future flexible messaging helpers.

Current helpers:

- `createCubidCommsClient(...)`
- `client.channels.list()`
- `client.channels.startVerification(...)`
- `client.channels.completeVerification(...)`
- `client.channels.update(...)`
- `client.preferences.list()`
- `client.preferences.update(...)`

The channel helpers expose only redacted metadata:

- channel id and type
- provider key
- label
- masked display hint
- verification and lifecycle status flags
- timestamps

This package intentionally does not add:

- dapp-authenticated notification send helpers
- hosted Allow Page grant wrappers
- raw email addresses, Telegram identifiers, ciphertext, or provider secrets

Those behaviors remain deferred to later roadmap slices.
