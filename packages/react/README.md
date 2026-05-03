# `@cubid/react`

React components and helpers for Cubid browser flows, built on top of
`@cubid/browser`.

## Install

```sh
npm install @cubid/react @cubid/browser
```

`react` and `react-dom` are peer dependencies. During the migration window,
`@cubid/web2-react` remains a compatibility wrapper, but new integrations
should import from `@cubid/react` directly.

## Usage

```tsx
import { CubidHostedVerificationWidget, EmailOtpForm } from "@cubid/react"
```

This package keeps the no-root-provider story intact for the hosted
verification widgets and focused OTP components.
