# Fresh Cubid step-up for identity-level actions

This guide implements [SDK #50](https://github.com/Cubid-Me/cubid-sdk/issues/50)
against the already merged issuer contract [#134 / PR #157](https://github.com/Cubid-Me/cubid-monorepo/pull/157)
and [federation contract v1](./federated-siwc.md). No new issuer capability,
package release, client registration or production enablement is implied.

Use a Cubid ceremony sparingly for identity-level changes such as linking a device
or changing recovery. Routine device-biometric elevation is a separate app policy;
it is not Cubid passkey assurance. A trip through the system browser is visible to
the person. This guide does not assume silent mobile authentication works.

## What counts as a successful step-up

The helper requests `prompt=login`, S256 PKCE, a new state/nonce, `max_age` and only
`openid`. It checks the signed Cubid ID token against discovery/JWKS, the original
nonce, single app audience, optional authorized-party value, exact issuer and the
existing app-specific pairwise subject. A recent signed `iat` is required; it is
not a substitute for `auth_time`. It
then requires a signed integer `auth_time`, a fresh ceremony time, and the requested
passkey assurance. A provider hint is never proof. Optional email/profile claims
are unnecessary and are not requested.

Default policy is `maxAge: 60`, `requirePasskey: true`, a five-minute one-use
transaction and five seconds of clock tolerance. Authentication must be no earlier
than the request minus tolerance, no later than completion plus tolerance, and no
older than `maxAge + tolerance` at completion. `maxAge: 0` is supported but even a
short callback/verification delay can exceed it; it fails closed. Clock tolerance
can be set to 0–60 seconds and does not extend transaction or ID-token expiry.
Synchronize the trusted server clock; never use a device-supplied time for a
server authorization decision.

This follows [OIDC authorization parameters](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
and [ID-token validation](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation):
`max_age` requires `auth_time`, and freshness and requested assurance must be
checked on the result. A recent token issue time alone is insufficient.

## Server-mediated native flow

Use the existing authenticated app session as the source of the current client,
issuer and pairwise subject. This helper supports registered public PKCE clients,
including native clients whose exchange/validation is performed on the app server.
It does not add confidential-client secrets or internal Cubid interaction APIs.
Register the exact callback separately using the [native registration guide](./native-siwc.md).

On the app server, prepare a request and persist its transaction privately before
returning only the authorization URL:

```ts
import { createCubidReauthenticationRequest } from "@cubid/auth";

const request = await createCubidReauthenticationRequest({
  session: currentAppIdentity, // trusted { clientId, issuer, subject }
  discoveryDocument: cubidDiscovery,
  redirectUri: registeredNativeCallback,
  maxAge: 60,
  requirePasskey: true,
});
await privateTransactions.put({
  transaction: request.transaction,
  ownerAppSessionId: authenticatedAppSession.id,
  action: "link-device",
});
return { authorizationUrl: request.authorizationUrl };
```

`privateTransactions` is a host-owned store, not an SDK-provided database. The
transaction contains private state/nonce/verifier and expected subject; do not
send it to the device, put it in a URL, or log it. Enforce its expiry. Bind it to
the authenticated app session and the particular action, never to an untrusted
subject or action supplied by the callback.

The native app opens the URL in the system browser, for example using
`WebBrowser.openAuthSessionAsync(authorizationUrl, registeredNativeCallback)`.
On success, forward the callback URL over TLS only to the app's authenticated
completion route. On `cancel`/`dismiss`, cancel the pending app action and discard
the server transaction through the authenticated app's own cancellation route.
Keep Cubid tokens and the transaction on the server. Do not log callback URLs.

On the completion route:

```ts
import { completeCubidReauthentication } from "@cubid/auth";

const result = await completeCubidReauthentication({
  callbackUrl: validatedRequestBody.callbackUrl,
  session: currentAppIdentity,
  discoveryDocument: cubidDiscovery,
  redirectUri: registeredNativeCallback,
  consumeTransaction: async (state) => {
    // Atomically verify owner/session/action and claim AND delete once.
    // Replays/absence return null. A plain get followed by delete is insufficient.
    return privateTransactions.takeForSessionAndAction(
      state, authenticatedAppSession.id, "link-device"
    );
  },
});
if (result.status !== "authenticated") {
  return { allowed: false, reason: result.status };
}
// Authorize only the bound link-device action on this backend, once.
// Apply normal app authorization and a one-use action permit/transaction.
return finishBoundAction(result.subject);
```

All error callbacks require the original state and callback destination. Cubid's
cancel response `login_required`, along with `access_denied`, `interaction_required`
and `consent_required`, produces `status: "denied"`. Other protocol, storage,
network, signature, freshness or binding errors reject the operation. Neither a
denial nor an exception changes the existing app session. A consumed transaction
cannot be retried; begin a new ceremony instead of replaying its code.

A returned JavaScript result is not a signed portable credential. Never trust a
device-submitted `status`, subject, `authTime` or assurance object to authorize an
API call. Complete validation and the action gate on the trusted backend, bound
to the same authenticated app session/action, with any subsequent permit one-use
and short-lived. Do not infer successful step-up from `isAuthenticated`, an old
session's assurance, a provider hint or merely closing the browser.

## Same-process host adapter

For an approved public-client architecture where the host itself owns the
exchange/validation boundary, the convenience function runs the same protocol:

```ts
import { reauthenticateCubidSession } from "@cubid/auth";

const result = await reauthenticateCubidSession({
  session: currentAppIdentity,
  discoveryDocument: cubidDiscovery,
  redirectUri: registeredCallback,
  crypto: hostCrypto,
  maxAge: 60,
  openAuthorizationSession: async (url) => {
    const response = await WebBrowser.openAuthSessionAsync(url, registeredCallback);
    return response.type === "success" ? response.url : null;
  },
});
if (result.status !== "authenticated") return; // cancelled or denied: no action
// Use only within this host's trusted authorization boundary.
```

A `null` handoff result means `status: "cancelled"`; a thrown adapter error remains
an error. The helper does not persist the new tokens, replace/refresh the existing
session, fetch UserInfo, create a Cubid account, link a factor or publish anything.
An RP server can instead use the split functions across separate HTTP requests.
Keep browser/native and server trust boundaries explicit.

## Validation and deployment limits

Offline tests use locally signed synthetic Cubid tokens and private in-memory
one-use stores. They cover same-subject success, stale/missing/future times,
wrong signature/nonce/client/issuer/subject, unmet passkey assurance, replay,
expiry, cancellation and callback binding. Existing React callback tests cover the
shared destination assertion. Source and built native compatibility checks remain
separate from real device/hosted acceptance.

A working browser handoff, registered client and deployed issuer honoring #134
must still be verified in the intended environment. This SDK change does not
assert that a fresh hosted passkey ceremony or silent mobile login was observed.
