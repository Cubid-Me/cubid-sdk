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
