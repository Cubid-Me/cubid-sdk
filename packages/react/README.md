# `@cubid/react`

React components and hooks for Cubid browser flows, built on top of
`@cubid/browser`.

## When To Choose This Package

Use `@cubid/react` when you want ready-made React components or hooks for Cubid
flows. Choose `@cubid/browser` instead when you need the same hosted-flow logic
without a React dependency.

## Install

```sh
npm install @cubid/react @cubid/browser
```

`react` and `react-dom` are peer dependencies.

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/react.json`
- Package matrix: `../../README.md`

## Basic Usage

```tsx
import { ClearPassVerifyButton, CubidHostedVerificationWidget, EmailOtpForm } from "@cubid/react"
```

This package keeps the no-root-provider story intact for hosted verification
widgets and focused OTP components.
