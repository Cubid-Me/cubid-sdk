# `@cubid/web2`

Deprecated compatibility wrapper around `@cubid/browser`.

## Status

New integrations should use `@cubid/browser` directly.

This package currently re-exports the same public surface so existing imports
can keep working during the rename window:

```ts
export * from "@cubid/browser"
```

If you are starting fresh, install and import `@cubid/browser` instead.
