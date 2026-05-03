# `@cubid/web2-react`

Deprecated compatibility wrapper around `@cubid/react`.

## Status

New integrations should use `@cubid/react` directly.

This package currently re-exports the same public surface so existing imports
can keep working during the rename window:

```ts
export * from "@cubid/react"
```

If you are starting fresh, install and import `@cubid/react` instead.
