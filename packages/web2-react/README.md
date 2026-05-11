# `@cubid/web2-react`

Frozen deprecated compatibility wrapper around `@cubid/react`.

## Status

`@cubid/web2-react` is retired as an active package surface.

New integrations should use `@cubid/react` directly, and future releases will
target `@cubid/react` instead of this wrapper name.

This package currently re-exports the same public surface so existing imports
can keep working while consumers migrate:

```ts
export * from "@cubid/react"
```

If you are starting fresh, install and import `@cubid/react` instead.

- Primary package: `@cubid/react`
- Root package matrix: `../../README.md`
- Migration notes: `../../docs/engineering/package-migration-plan.md`
