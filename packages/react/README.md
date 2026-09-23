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

## Look And Feel

Every form takes an optional, typed look, so it can sit inside your app as if
it were your own. Set it once on `CubidWeb2Provider` (or `CubidThemeProvider`
without a client), or per component; the component's props win.

```tsx
<CubidWeb2Provider
  client={client}
  theme={{ accent: "#5b3df5", text: "#1a1a1a", border: "#d0d0d0", radius: 12, fontFamily: "Inter", spacing: 14 }}
  classNames={{ button: "btn btn-primary", input: "field" }}
  styles={{ status: { fontStyle: "italic" } }}
  labels={{ email: "E-post", sendEmailCode: "Skicka kod" }}
>
  <EmailOtpForm />
</CubidWeb2Provider>
```

- `theme`: a handful of tokens the kit draws itself from with inline styles.
  Without a theme the forms stay unstyled, as they always were.
- `classNames`: a class per slot, for apps that style with CSS. Slots:
  `container`, `field`, `label`, `input`, `actions`, `button`,
  `buttonSecondary`, `status`.
- `styles`: inline `CSSProperties` per slot, laid over the theme.
- `labels`: every string the forms show, for wording and translation.

The same three layers exist in `@cubid/react-native`, with `styles` typed as
React Native styles instead of class names.
