# Future Ideas

This file is not an active roadmap.

Use it only as a last resort when the active roadmap in
`todo.md` is depleted and the user explicitly asks what to do next.

Do not treat anything here as approved implementation work by default.

## Deferred Ideas

- Add a package-consumer local acceptance harness that exercises the published
  `@cubid/core`, `@cubid/browser`, and `@cubid/react` surfaces in a small demo
  workspace.
- Add coverage reporting and thresholds for the workspace so test-governance is
  visible in CI instead of inferred from passing suites alone.
- Add example applications that demonstrate the recommended server-only
  `@cubid/core` path and the separate browser/React integration path.
- Revisit whether deprecated compatibility packages should eventually move to a
  formal end-of-life schedule once downstream adopters have migrated.
