# Measure native session renewal before choosing a refresh policy

[SDK #49](https://github.com/Cubid-Me/cubid-sdk/issues/49) asks to measure ordinary
system-browser reauthentication before building refresh tokens. This offline kit
prepares that measurement and can be reused by the future [Expo example #47](https://github.com/Cubid-Me/cubid-sdk/issues/47).
It does not open a browser, register a client, contact an issuer or prove that
silent mobile login works. No refresh grant or new Identity contract is added.

The runnable app's owner/location remains a parent decision. Recommended ownership
is the Starter/adopting team, with SDK examples and protocol helpers consumed here.
A full app needs a separately authorized isolated Starter checkout, an already
registered native client, and device acceptance. Preserve the existing dirty
Starter checkout; this kit needs no second worktree or Expo dependencies.

## Run the offline example

From this SDK checkout, using Node 24 or later:

```sh
node scripts/summarize-native-session-measurements.mjs examples/native-session-measurement.synthetic.json
# Or provide a closed-schema JSON array on stdin:
node scripts/summarize-native-session-measurements.mjs - < observations.json
```

The bundled rows are **synthetic**; their example 900-second lifetime is invented
fixture data, not a claim about the current issuer. Reports contain observation
counts and sanitized rows. They always state `observations_only` and
`not_proven_by_this_report`; they never recommend refresh tokens or declare hosted
acceptance. Non-synthetic labels are self-reported, not authenticated evidence.
Keep any locally captured input/output/logs on the authorized external workspace.

The tool accepts at most 500 rows and 1 MiB of input. It rejects unknown fields,
free text, identifiers, arbitrary strings, callback/authorization URLs, tokens and
raw error descriptions. Failure prints a fixed error and no partial report. This
closed schema reduces accidental disclosure; it is not a general secret scanner.
Do not feed real tokens or private values into the tool to test that boundary.

## Request settings and observations are separate

`examples/native-session-measurement.mts` has no runtime dependencies. Copy it as
`native-session-measurement.ts` into a coordinated Expo example; `.mts` makes the
offline Node tool explicitly ESM without changing the SDK root package manifest. `describeNativeSessionRequest(url)`
extracts four coarse settings from the actual authorization URL, then discards
the URL. It does not validate an authorization endpoint, create PKCE/state/nonce,
or replace the backend's protocol validation.

- `promptMode` distinguishes an omitted parameter from `none`, `login` and other
  prompts. `prompt=none` is a separate protocol diagnostic, not an ordinary request.
- `maxAgeRequested` excludes freshness-constrained requests from ordinary session
  reuse counts. A forced [step-up control](./step-up-siwc.md) stays a control.
- `passkeyRequested` and `providerHintPresent` record request configuration only.
  A provider hint never proves authentication or enabled primary Google login.

Use the same configured client, callback, scopes and required assurance throughout
a comparison. Do not weaken passkey, consent or other app policy to obtain a quiet
result. The ordinary trial should omit `prompt` and `max_age`; the configured
issuer may still require visible authentication. Standard [OIDC prompt semantics](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
do not guarantee reuse of a mobile browser session.

A browser `success` response and a short duration prove neither authentication nor
lack of interaction. Completion must run on the app backend using the
[native protocol guide](./native-siwc.md): one-use transaction bound to the app
session, exact callback/state/issuer, PKCE exchange, signed ID-token validation,
nonce/client/expiry, and existing pairwise-subject comparison. The backend can
report `same_subject`, `initial_subject`, `subject_mismatch`, `denied`,
`validation_failed` or `not_attempted` for this trial. The device must not supply
its own subject or a trusted authentication verdict.

Record browser/OS authentication prompts, Cubid authentication UI and consent UI
separately as `observed`, `not_observed` or `unknown`. A renewal row is counted as
`same_subject_no_interaction_observed` only after a same-subject backend outcome,
an ordinary request and three explicit `not_observed` observations. Unknown UI
remains incomplete. Timing never determines this classification. These are human
observations for analysis; the report is not a signed credential or an action gate.

## Expo host wiring

Use [Expo WebBrowser's `openAuthSessionAsync`](https://docs.expo.dev/versions/latest/sdk/webbrowser/)
for authentication. The browser may display platform permission UI independently
of Cubid's UI. Its iOS `preferEphemeralSession` option requests a private session;
the browser decides whether to honor it. Record the requested preference, never
claim actual cookie sharing from that option. Keep iOS and Android observations
separate. Choose dependencies compatible with the adopting app's existing Expo SDK.

This is a host integration sketch, not a new Cubid endpoint or runnable Expo app:

```ts
import * as WebBrowser from "expo-web-browser";
import {
  describeNativeSessionRequest, collectNativeSessionObservation,
} from "./native-session-measurement";

// appApi is YOUR authenticated backend. It stores PKCE/state/nonce privately.
const pending = await appApi.startNativeMeasurement({ trial: "ordinary" });
const request = describeNativeSessionRequest(pending.authorizationUrl);
// The trusted backend also enforces the requested trial settings.
const browser = await WebBrowser.openAuthSessionAsync(
  pending.authorizationUrl, registeredCallback,
  { preferEphemeralSession: false },
);
if (browser.type !== "success") {
  await appApi.cancelNativeMeasurement({ handle: pending.handle });
  // Record cancel/dismiss, backendOutcome:"not_attempted", no token metadata.
  return;
}
const completion = await appApi.finishNativeMeasurement({
  handle: pending.handle, callbackUrl: browser.url,
});
if (!["same_subject", "initial_subject"].includes(completion.measurement.backendOutcome)) {
  // Record the coarse denial/validation outcome, with no session or token metadata.
  return;
}
await hostSessionStore.save(completion.appSession); // accepted app credentials stay private
const ui = await hostObserver.recordThisTrial(); // three explicit UI observations
const observation = collectNativeSessionObservation({
  schemaVersion: 1,
  environment: "staging", platform: "ios", build: "development",
  scenario: "warm_session", delivery: "browser_result",
  cookiePreference: "platform_default", ...request,
  browserOutcome: "success",
  backendOutcome: completion.measurement.backendOutcome,
  browserUi: ui.browserUi,
  authenticationUi: ui.authenticationUi,
  consentUi: ui.consentUi,
  elapsed: "unknown", // or a coarse elapsed-time bucket; not an auth verdict
});
// Export only observation. Never export pending, browser, completion or appSession.
```

The backend response, cancellation endpoint, session store and observer above are
host-owned interfaces. Only persist an accepted completion's app session. For
errors/denials, record the coarse outcome without attempting to save a session.
Catch adapter/network exceptions and record `error`/`validation_failed` as
appropriate; never pass raw exceptions to the report. Do not log authorization or
callback URLs, opaque handles, codes, nonce, verifier, subject, claims or tokens.

For process death, the host restores only its opaque pending handle and uses
[`Linking.getInitialURL`](https://docs.expo.dev/versions/latest/sdk/linking/)
to deliver the launch callback to the same authenticated backend completion path.
Record `delivery:"cold_start"`. Keep app-session credentials in the app's selected
secure storage. The backend must consume once even if two delivery paths race.
Follow the target platform's auth-session behavior; do not add a second live
Linking listener to iOS `openAuthSessionAsync` merely to duplicate its callback.
Use a development or standalone build with the exact registered callback; Expo Go
URLs are not a substitute for stable native-client registration.

Optional `accessTokenExpiresInSeconds` and `refreshTokenReturned` come only from
this accepted trial's backend token response. Omit unavailable metadata; do not
assume false or guess a lifetime. Never send the actual refresh/access/ID token.
Cubid token expiry and the app backend's own session expiry are separate policies.

## Device matrix and interpretation

Run only after the owner has approved the app/environment and an existing client
is available. No new credentials or registration are required by this offline kit.

| Trial | Request / setup | Record |
| --- | --- | --- |
| Initial new user | Ordinary request, no established app identity | Initial subject, passkey/consent UI; no renewal conclusion |
| Returning warm session | Existing app identity, immediately repeat ordinary login | Same-subject comparison and all three UI observations |
| App restart | Restore the host app session, repeat ordinary login | Storage restoration, browser result or cold-start delivery |
| Browser restart | Existing app identity after browser lifecycle change | Explicit UI observations; do not assume cookie retention |
| Issuer session expiry | Wait for the authorized test session to expire | Distinguish visible reauthentication, denial and validation errors |
| Forced control | Existing SDK #50 step-up policy | Signed freshness/assurance checked by backend; excluded from ordinary counts |
| Optional `prompt=none` | Separate authorized diagnostic | Success/error outcome; excluded from ordinary counts |
| iOS private preference | Repeat with `preferEphemeralSession:true` | Requested preference, not proof that the browser honored it |

Repeat the applicable rows on iOS and Android, development and intended release
builds. Preserve per-platform/preference strata; a result on one combination says
nothing about another. Record cancellations and failures, not only successes. For
production-client new/returning passkey acceptance in #47, the owner must supply
separate device evidence; synthetic tests and this report cannot close that gate.

A person can then assess the observations with Identity to choose a session policy.
If ordinary reuse is reliable in the intended environments, document its measured
limits. If it is unsuitable, rotating refresh tokens/reuse detection would require
a separate issuer design and SDK implementation. Do not add a refresh helper based
on a single fast callback or an assumption about Safari/Custom Tabs cookies.
