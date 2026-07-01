# `@cubid/browser`

Headless browser helpers for Cubid hosted verification, OTP, Allow Page,
ClearPass Verify, and provider handoff flows.

## When To Choose This Package

Use `@cubid/browser` when you need Cubid's browser-safe helper layer but do not
want a React dependency. Choose `@cubid/react` only when you need React
components or hooks on top of this package.

## Install

```sh
npm install @cubid/browser
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/browser.json`
- Package matrix: `../../README.md`

## Basic Usage

```ts
import { createCubidWeb2Client } from "@cubid/browser"
import { createCubidApiClient } from "@cubid/core"

const apiClient = createCubidApiClient({
  apiKey: process.env.CUBID_API_KEY!,
  dappId: process.env.CUBID_DAPP_ID!,
})

const browserClient = createCubidWeb2Client(apiClient)
```

This package is headless by design. It does not ship React components and does
not require a root provider.

## Hosted Flow Helpers

`@cubid/browser` keeps browser-safe hosted helpers out of `@cubid/core` and
out of React-specific packages. Today that includes:

- Allow Page URL helpers
- OTP flow orchestration
- hosted verification URL builders
- ClearPass Verify URL builders
- hosted SIWC approval/rejection request descriptors
- hosted paytag action opener

Use this package when your app needs browser-facing Cubid flow helpers but
should not embed Cubid API keys, server credentials, or private approval logic
in the browser bundle.

## Hosted SIWC Approval Descriptors

Passkey-approved wallet creation and signing approval remain Passport-hosted.
`@cubid/browser` now exposes descriptor builders for those hosted approval and
rejection routes:

```ts
import {
  buildHostedSiwcAccountRequestAction,
  buildHostedSiwcSigningRequestAction,
} from "@cubid/browser"

const approveAccount = buildHostedSiwcAccountRequestAction({
  accountRequestId: "siwc_acct_req_123",
  decision: "approve",
})

const rejectSigning = buildHostedSiwcSigningRequestAction({
  decision: "reject",
  signingRequestId: "siwc_req_456",
})
```

Each helper returns a launcher-ready descriptor with:

- `url`
- `method`
- `credentials`
- `headers`
- `body`

The descriptor currently sets `credentials: "include"` so a browser `fetch`
call will send the authenticated Passport session cookie during the hosted
approval or rejection step.

These helpers are intentionally thin. They prepare the browser-safe request
shape for Passport-hosted approval flows, but they do not bypass Passport user
authentication, fresh passkey step-up, or app policy checks.

Use them only in environments where the authenticated Passport user session is
already expected to perform the approval or rejection step.

## Hosted Paytag Actions

`@cubid/browser` exposes `openHostedPaytagAction(...)` for server-created
Cubid hosted paytag action URLs returned by `@cubid/core`'s
`startHostedPaytagAction(...)`.

```ts
import { openHostedPaytagAction } from "@cubid/browser"

openHostedPaytagAction(action.hostedUrl)
```

The helper only opens `/pay-to/actions/complete` URLs that already include a
server-created `action_token`, and it rejects URL query parameters that look
like dapp API keys. It never creates action tokens and does not accept dapp API
keys. Create hosted paytag actions server-side through `@cubid/core`. The
`/pay-to/actions/complete` path is backend wire compatibility; the public
browser SDK API is Paytag-only.

Signed-in owner-management wrappers for paytag stamp and grant routes remain
deferred until the SDK has a Cubid-authenticated user-session pattern ready for
bearer-token calls.
