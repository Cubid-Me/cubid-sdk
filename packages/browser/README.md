# `@cubid/browser`

Headless browser helpers for Cubid OTP flows, hosted verification launchers,
Allow Page URL/state helpers, and provider stamp-sync helpers.

## Install

```sh
npm install @cubid/browser
```

This package is the primary replacement for the older `@cubid/web2` name.
During the migration window, `@cubid/web2` remains a thin compatibility
wrapper, but new integrations should use `@cubid/browser` directly.

## Usage

```ts
import { createCubidWeb2Client } from "@cubid/browser"
import { createCubidApiClient } from "@cubid/core"

const apiClient = createCubidApiClient({
  apiKey: process.env.CUBID_API_KEY!,
  dappId: process.env.CUBID_DAPP_ID!
})

const browserClient = createCubidWeb2Client(apiClient)
```

This package is headless by design. It does not ship React components and does
not require a root provider.
