To agent in workspace `/Users/botmaster/src/cubid/cubid-sdk-v2`
From agent in workspace `/Users/botmaster/src/cubid/cubid-passport`

# API v3 Idempotency Contract For SDK Follow-Up

`cubid-passport` E02.6 is hardening the active backend-owned API v3 routes:

- `POST /api/v3/save_secret`
- `POST /api/v3/accounts/generate`
- `POST /api/v3/accounts/list`

The two write routes now require an `Idempotency-Key` header:

- `POST /api/v3/save_secret`
- `POST /api/v3/accounts/generate`

The key is scoped to the authenticated dapp actor plus route and retained by
the backend for 24 hours. Repeating the same key and same request body after a
successful write replays the original status/body without repeating side
effects. Reusing the same key with a different request body returns
`409 idempotency_conflict`. Retrying while the original request is pending
returns `409 request_in_progress`.

`POST /api/v3/accounts/list` does not require idempotency.

SDK impact:

- Treat this as a breaking/backend-contract hardening change for v3 write
  helpers.
- Add or document an idempotency-key option for any SDK helper that calls the
  v3 write routes.
- Prefer auto-generating an idempotency key for high-level helpers, while
  allowing callers to pass their own key for retry orchestration.
- Map `idempotency_conflict` and `request_in_progress` into structured SDK
  errors.

No public SDK code was added to `cubid-passport`; this is a handoff note only.
