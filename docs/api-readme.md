# Cubid HTTP API Docs

This repo keeps lightweight HTTP API documentation directly in Git.

## Source Of Truth

The OpenAPI 3.1 source lives at:

```sh
api/openapi.yaml
```

Edit that file first. The Postman collection is generated from it and should
not be edited manually.

## Local Scalar Docs

Run the normal local dev command:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Then open:

```text
http://127.0.0.1:5173/docs/
```

The Scalar page loads `api/openapi.yaml` from the local Vite server.

## Validate The Spec

Run:

```sh
pnpm api:validate
```

CI runs the same command and fails if `api/openapi.yaml` is not valid.

## Regenerate Postman

Run:

```sh
pnpm api:postman
```

This writes:

```sh
api/postman_collection.json
```

Treat `api/postman_collection.json` as generated output. Regenerate it from
`api/openapi.yaml` whenever the OpenAPI spec changes.
