# `@cubid/web2`

Frozen deprecated compatibility wrapper around `@cubid/browser`.

## Status

`@cubid/web2` is retired as an active package surface.

New integrations should use `@cubid/browser` directly, and future releases will
target `@cubid/browser` instead of this wrapper name.

This package currently re-exports the same public surface so existing imports
can keep working while consumers migrate:

```ts
export * from "@cubid/browser"
```

If you are starting fresh, install and import `@cubid/browser` instead.

- Primary package: `@cubid/browser`
- Root package matrix: `README.md`
- Migration notes: `docs/engineering/package-migration-plan.md`
