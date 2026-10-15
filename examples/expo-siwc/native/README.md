# Native shell source: local SIWC reference

This private Expo example advances [SDK47](https://github.com/Cubid-Me/cubid-sdk/issues/47).
It contains a single screen, system-auth-session and secure-storage adapters, a
testable lifecycle controller, and an explicit RPC client for the reference
backend. **It is source-only evidence.** No device binary, client registration,
credentials, signing/provisioning, hosted backend or physical-device acceptance
is provided. There is no retail or application business flow.

`config.ts` contains only synthetic issuer/client values and loopback backend
`http://127.0.0.1:8787`. No server is listening there because of this example.
An installed phone's loopback is the phone, not the development Mac. Platform
network policy may also reject HTTP. Do not weaken ATS/cleartext protections or
assume these placeholders are usable registration or deployment settings.
The tests bind requests directly to the reference handler without a socket.

## Source checks

Use the SDK's existing locked dependencies from the repository root:

```sh
pnpm --filter @cubid/auth build
pnpm exec tsc --noEmit -p examples/expo-siwc/tsconfig.json
pnpm --filter @cubid/acceptance exec vitest run --config vitest.config.ts src/expo-reference-backend.acceptance.test.ts src/expo-native-shell.acceptance.test.ts
```

The Expo shell has its own private manifest, workspace boundary and lockfile;
it does not change the SDK's package/dependency/lock/CI contracts. To check actual
Expo/React Native adapter types, install its pinned dependencies locally and run
its separate typecheck. Keep directories/caches on the approved external volume
in a constrained implementation environment:

```sh
cd examples/expo-siwc/native
mkdir -p .cache/tmp .cache/expo .cache/xdg
TMPDIR="$PWD/.cache/tmp" XDG_CACHE_HOME="$PWD/.cache/xdg" \
  pnpm install --frozen-lockfile --ignore-scripts --store-dir "$PWD/.cache/pnpm-store"
pnpm typecheck
```

The dependency baseline is Expo SDK57 / React Native0.86 / React19.2.3, aligned
with the [official SDK compatibility table](https://docs.expo.dev/versions/latest/).
Pinned versions and the private lockfile define the reproducible source baseline;
typechecking is not an OS/device compatibility claim. No native build or launch
scripts are included. The canonical SDK acceptance suite can run the pure
controller/transport tests without installing the isolated Expo dependencies.

## Lifecycle and trust boundaries

- `expo-ports.ts` uses [asynchronous native random bytes](https://docs.expo.dev/versions/latest/sdk/crypto/)
  for each ceremony's 32-byte device verifier, then SHA-256/base64url challenge.
  It deliberately avoids the synchronous random-bytes API's documented development
  fallback. Native code does not verify Cubid ID tokens or need an RSA polyfill.
- Pending proof is saved in SecureStore before opening the system auth session.
  UI snapshots contain only closed status flags/messages; never credentials,
  callback URLs, nonce, code verifier, claims or Cubid/provider tokens.
- The controller checks the expected issuer-origin/client/custom callback/code
  flow/minimal scope/passkey request before browser handoff. The reference backend
  remains the authority for state, nonce, signatures, identity and assurance.
  The device's challenge is ceremony possession binding, not hardware attestation.
- [Expo AuthSession behavior](https://docs.expo.dev/versions/latest/sdk/webbrowser/)
  differs by platform. Active `openAuthSessionAsync` owns its returned URL;
  the passive app-link path ignores events during that active browser session.
  Startup `getInitialURL` and out-of-session links handle interrupted ceremonies.
  The controller serializes/deduplicates matching callbacks; the backend's atomic
  consume is authoritative. Unrelated/ambiguous destinations or states do not
  consume stored proof or authenticate the app.
- Cancellation invalidates pending work before cleanup. Late browser/token
  responses cannot promote a session or confirm a step-up. Storage writes share
  ordering and ownership across React mounts for the same profile namespace;
  an old write cannot overwrite a newer credential or become trusted after remount.
  Unmount preserves already stored pending proof for cold-launch delivery.
- Restoration starts before initial-URL lookup or warm-link subscription. Up to
  16 distinct well-formed callback candidates are held in memory during active
  work, then selected by the restored transaction state; later unrelated links
  cannot displace an earlier valid candidate. Raw links never enter UI/storage.
- Accepted app-session expiry is tracked by a timer and checked again on app
  resume, snapshot reads and protected actions. An expired mounted session stops
  reporting authenticated, and a late step-up reply cannot confirm it.
- Pending-proof deletion and backend cancellation are attempted independently,
  with the shared storage barrier held through the server attempt. If both the OS
  deletion and backend cancellation fail, no durable cancellation across process
  restart can be promised before the backend transaction expires.
- A fresh login credential is accepted only after secure persistence succeeds.
  Failed/stale writes revoke that credential and clear the matching local value.
  Backend revocation failures cannot be promised away: local state stays signed
  out and the development backend's bounded expiry remains the final backstop.
  A replacement login after a status outage attempts to revoke the displaced
  credential only after new persistence succeeds, before accepting the replacement.
- Restored storage is not authentication proof. The app verifies its opaque
  credential through `session` before enabling the demo. Outages preserve the
  stored credential without marking it authenticated; backend rejection/expiry
  clears it. Logout clears storage even during initial restoration. It revokes
  only the example's app session, not global Cubid/provider browser sessions.
- Step-up retains the existing app credential and delegates signed freshness,
  passkey assurance and exact subject checks to SDK50 on the backend. Only the
  one-use `no_op` demonstration can be confirmed. No linking, recovery, payment,
  wallet or real business action is authorized.
- [SecureStore persistence](https://docs.expo.dev/versions/latest/sdk/securestore/)
  differs across platforms and uninstall/reinstall. OS storage failure, key
  invalidation or loss is handled as a failure/new sign-in; no reinstall guarantee
  or biometric-strength claim is made. Device acceptance must observe the actual OS.

## Explicit transport

`../transport.ts` supplies `createHttpReferenceClient` and an in-process
`createReferenceHandler`. These reference-app operations are **not Cubid APIs**.
The handler does not create a listener or host a backend. A separately authorized
host must wire it to the controller/store from the [backend slice](../README.md).

RPC uses bounded JSON POST bodies, no cookie jar, no fetch redirects, no cache
and no URL/query credentials. The app credential uses the Authorization header;
device verifier/callback use the request body. Methods, paths, keys, responses
and error codes are allowlisted. Replies with extra private fields fail closed;
errors never echo raw causes, claim/token payloads or request URLs. The adapter
rejects cross-origin browser requests; native requests do not need browser cookies.
An actual host still needs request timeouts, rate/connection limits, TLS, deployment
and durable-store review before any hosted or production use.

The app explicitly imports [Expo's streaming fetch](https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api),
whose pinned iOS/Android implementation carries the omit/redirect-error policies
to native networking. It does not depend on whichever global fetch a runtime
flag selects. The RPC port requires a readable response stream and a fetch
implementation that enforces those policies; React Native's legacy fetch polyfill
is not a substitute. Requests and handler responses also carry `Cache-Control:
no-store`. This is source/type evidence; redirect, cookie and streaming behavior
still belongs in the later physical-device acceptance pass.

## Concrete external-input queue

Source work needs no new account, domain, project or credentials. Real acceptance
later requires the owner/operator to provide:

1. **Approved existing native public client and issuer environment:** exact client
   ID, issuer/discovery and registered callback(s), with code/S256/`none` and the
   intended passkey/consent policy. No registration or provider enablement is assumed.
2. **Approved reachable reference-backend endpoint and storage:** an existing
   development environment with TLS and the same client/callback configuration.
   Loopback placeholders and in-memory test stores are not hosted acceptance.
3. **Approved native application/build identity and operator-run build:** actual
   bundle/application IDs, callback scheme routing and existing authorized signing/
   provisioning workflow. This session does not access or create that material.
4. **Device/build access and owner-operated ceremonies:** iOS/Android targets,
   new-user and returning-user passkey interactions, cold process restart, browser
   cancellation, interrupted deep links, app-session persistence/logout and fresh
   same-subject step-up. Record actual UI observations with the
   [measurement kit](../../../docs/examples/native-session-measurement.md).

The backend adapter uses the reviewed public SDK source build in this checkout.
Any later published-package acceptance must name its approved package baseline;
publishing is outside this source slice.

Keep Starter's browser-cookie routes unchanged. Do not assume that the system
browser and native RPC requests share a cookie jar. The example's explicit
device proof and opaque app-session credential are the interoperability boundary.
