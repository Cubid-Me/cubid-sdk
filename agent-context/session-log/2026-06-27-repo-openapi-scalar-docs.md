# 2026-06-27 Repo OpenAPI Scalar Docs

## 2026-06-27T20:12:00Z

- Agent: Codex
- Branch: `codex/openapi-scalar-docs`
- Head: `81e709f4`
- Summary: Added a lightweight HTTP API documentation setup using OpenAPI 3.1, Scalar local docs at `/docs/`, generated Postman output, Redocly validation, CI wiring, and README workflow documentation. Kept existing TypeDoc package reference artifacts separate from the new HTTP API spec.
- Validation:
  - `pnpm api:validate`
  - `pnpm api:postman`
  - `curl -fsS http://127.0.0.1:5173/docs/`
  - `curl -fsS http://127.0.0.1:5173/api/openapi.yaml`
  - `git diff --check`
  - `pnpm lint`
- Follow-ups: Expand `api/openapi.yaml` as additional public backend contracts are promoted; keep `api/postman_collection.json` generated from the spec.
