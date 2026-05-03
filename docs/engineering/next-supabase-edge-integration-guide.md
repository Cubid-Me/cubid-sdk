# Next.js And Supabase Edge Integration Guide

This guide shows how downstream apps should consume `@cubid/core` from a
Next.js server and from Supabase Edge Functions. `@cubid/core` is
runtime-agnostic: keep it on the server, inject `fetch` when useful, and never
ship Cubid dapp API keys to browser bundles.

This guide belongs to the public SDK repo, `Cubid-Me/cubid-sdk`. Do not treat
`cubid-passport` as the package publication source.

## Server-Side Next.js Usage

Use `@cubid/core` from route handlers, server actions, or backend-only modules.
Browser components should call your app server, not Cubid directly.

```ts
import { createCubidApiClient } from "@cubid/core"

const cubid = createCubidApiClient({
  apiKey: process.env.CUBID_API_KEY!,
  baseUrl: process.env.CUBID_API_BASE_URL ?? "https://passport.cubid.me",
  dappId: process.env.CUBID_DAPP_ID!,
})

export async function ensureCubidUser(email: string) {
  return cubid.ensureUserByEmail({ email })
}
```

## Supabase Edge Usage

Use the JSR package directly:

```ts
import { createCubidApiClient } from "jsr:@cubid/core"

const cubid = createCubidApiClient({
  apiKey: Deno.env.get("CUBID_API_KEY")!,
  baseUrl: Deno.env.get("CUBID_API_BASE_URL") ?? "https://passport.cubid.me",
  dappId: Deno.env.get("CUBID_DAPP_ID")!,
  fetch,
})

Deno.serve(async (request) => {
  const { email } = await request.json()
  const user = await cubid.ensureUserByEmail({ email })
  const snapshot = await cubid.syncIdentitySnapshot({ userId: user.userId })

  return Response.json({
    score: snapshot.score.cubidScore,
    stamps: snapshot.stamps.allStamps.map((stamp) => stamp.stampType),
    userId: user.userId,
  })
})
```

The repo validates Deno compatibility before publish with
`pnpm --filter @cubid/core deno:check`. Live `jsr:@cubid/core` imports are now
available through trusted publishing.

## Secrets

Store these as server-side or Edge Function secrets only:

- `CUBID_API_KEY`
- `CUBID_DAPP_ID`
- `CUBID_API_BASE_URL`, optional and usually `https://passport.cubid.me`

Do not place Cubid dapp API keys in `NEXT_PUBLIC_*`, browser local storage, or
client-rendered JavaScript.

## Identity Snapshot Pattern

For signup or login flows, resolve the Cubid user first and then fetch a
snapshot for local app state.

```ts
const user = await cubid.ensureUserByEmail({ email: session.user.email })
const snapshot = await cubid.syncIdentitySnapshot({ userId: user.userId })

await saveLocalIdentitySnapshot({
  cubidUserId: user.userId,
  score: snapshot.score.cubidScore,
  stampTypes: snapshot.stamps.allStamps.map((stamp) => stamp.stampType),
  syncedAt: snapshot.syncedAt,
})
```

Apps should store the app-scoped `userId` returned by `@cubid/core` or the OIDC
pairwise `sub`, plus a refresh timestamp and only the claims or stamp summaries
that the user actually consented to disclose. Do not replace those app-scoped
handles with raw internal/global Cubid identifiers, dapp user UUIDs, or other
cross-app identifiers when building public app-facing identity records.

## Phone OTP And Provider Handoff

`@cubid/core` exposes low-level OTP wrappers for server-controlled flows:

```ts
await cubid.sendPhoneOtp({ phone: "+15555550123" })
const verified = await cubid.verifyPhoneOtp({
  otp: form.otp,
  phone: "+15555550123",
})
```

The OTP helpers return delivery or verification metadata only; they never return
raw OTP codes. React UI primitives, AllowPage helpers, and provider handoff
flows belong in later `@cubid/react` work, not in `@cubid/core`.

## API v3 Secrets And Custody Writes

`@cubid/core` now also exposes the first server-facing API v3 write helpers.
Keep these on trusted servers or Edge Functions only because they use the dapp
API key and can mutate app-owned data.

```ts
await cubid.saveSecret({
  secret: encryptedProfileBlob,
  userId: cubidUserId,
})

const generated = await cubid.generateAccount({
  chain: "sui",
  label: "Primary wallet",
  userId: cubidUserId,
})

const accounts = await cubid.listAccounts({
  chain: "sui",
  userId: cubidUserId,
})
```

`saveSecret` and `generateAccount` require idempotency under Passport's v3
contract. `@cubid/core` will generate an `Idempotency-Key` automatically when
you do not provide one, and it returns the resolved `idempotencyKey` on the
normalized SDK response so callers can correlate retries or replayed success.

Legacy `POST /api/v2/save_secret` is retired. Treat the v3 helper as the only
supported public SDK write path for dapp-user secrets.

When your app already has its own operation or job ID, prefer passing that as
`idempotencyKey` explicitly.

Supported custody chains on the public SDK surface are currently:

- `evm`
- `near`
- `solana`
- `sui`

The custody helpers return public metadata only. They never expose raw private
keys or custody secrets, and Sui public addresses are normalized to lowercase
`0x...` strings on the SDK surface.

The secret-write helper is also intentionally one-way from the public SDK's
perspective. Passport does not expose a public decrypt/read endpoint for stored
secrets, so app code should not expect a matching `readSecret` helper.

## Post-Return Refresh

After a user returns from an AllowPage or provider-stamp flow, refresh Cubid
state server-side and update the app's cached view.

```ts
const snapshot = await cubid.syncIdentitySnapshot({ userId: cubidUserId })

return {
  linked: snapshot.stamps.allStamps.map((stamp) => stamp.stampType),
  score: snapshot.score.cubidScore,
  syncedAt: snapshot.syncedAt,
}
```

Treat returned stamp and identity data as disclosure-filtered. Passport now
uses selective-disclosure grants from flows such as `allow_page` and `oidc` as
the runtime source of truth for what an app may see; legacy
`stamp_dappuser_permissions` rows are migration input only. An empty stamp
list, omitted identity items, redacted email helper fields, or a lower/zero
score can be a valid privacy-limited outcome for that app-scoped user, not just
a sync failure.

The same rule now applies to profile and location helpers. Treat these claims as
consent-gated:

- profile name: `profile:name`, `profile:*`, `profile`, `cubid:profile`
- rough location: `location:rough`, `location:approximate`, `location:exact`, `location:*`
- approximate location: `location:approximate`, `location:exact`, `location:*`
- exact location: `location:exact`, `location:*`

`@cubid/core` now exposes disclosure metadata on those response models so apps
can explain `notGranted` outcomes without implying the user record is missing.
For score, identity, and stamp routes, current v2 payloads still do not always
prove whether a sparse response means "no active disclosure grant" or "no
underlying data", so consumers should present those outcomes more cautiously.

For API v3 write errors, `CubidApiError` now preserves Passport conflict codes
such as `idempotency_conflict` and `request_in_progress` so app servers can
decide whether to retry, surface a duplicate-request message, or fetch the
result of the original operation.

## Webhook Receivers

`@cubid/core` now exposes runtime-agnostic webhook helpers for the v3 delivery
contract. Verify the raw body before you parse JSON:

```ts
import {
  parseCubidWebhookEvent,
  verifyCubidWebhookSignature,
} from "@cubid/core"

export async function POST(request: Request) {
  const rawBody = await request.text()

  await verifyCubidWebhookSignature({
    eventId: request.headers.get("X-Cubid-Event-Id") ?? "",
    payload: rawBody,
    secret: process.env.CUBID_WEBHOOK_SECRET!,
    signature: request.headers.get("X-Cubid-Signature") ?? "",
    signatureVersion:
      request.headers.get("X-Cubid-Signature-Version") ?? "v1",
    timestamp: request.headers.get("X-Cubid-Timestamp") ?? "",
  })

  const event = parseCubidWebhookEvent(JSON.parse(rawBody))

  return Response.json({
    eventId: event.eventId,
    eventType: event.eventType,
    legacyEventType: event.legacyEventType,
  })
}
```

The helper verifies the exact `eventId.timestamp.rawBody` HMAC input used by
Passport today. Keep replay protection enabled by validating the timestamp and
by storing recently-seen `eventId` values on your side before applying the
event's side effects.

Webhook payloads are still disclosure-filtered and app-scoped. A stamp or score
change event only represents data the target app is allowed to observe.

## Stability Notes

`@cubid/core` `0.x` is the pre-1.0 SDK foundation. The package should preserve
runtime-agnostic imports, structured `CubidApiError`, and the high-level helper
names introduced in E02.2. Breaking changes before `1.0` must be documented in
the package README and this guide before publication.
