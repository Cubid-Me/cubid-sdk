# SDK client compatibility status

**2026-10-17 acceptance selection:** the user chose the existing Next.js Starter
for the first real-device browser login pass. The
[Starter runbook and explicit-target preflight](../../examples/starter-device/README.md)
record current checkout/deployment/source-pin evidence and the isolated dev
configuration and operator steps still required. This is a web acceptance path;
the native build/device gates below remain separate.

Audited on 2026-10-15 against SDK `dev` at
`ceba9ca351592b0e07a4e1774a57121b9976dd9b`, current open SDK/Identity PRs,
and the agreed [Identity federation contract v1](https://github.com/Cubid-Me/cubid-monorepo/blob/dev/docs/engineering/federated-login-contract-v1.md).
This is source and dependency evidence, not hosted or device acceptance.
Open issue state alone does not mean its source implementation is missing.

## Integration evidence

- [PR64](https://github.com/Cubid-Me/cubid-sdk/pull/64) merged as `7094764e`.
  Its Git tree equals tested source `1f89befe`; canonical CI
  [38685360064](https://github.com/Cubid-Me/cubid-sdk/actions/runs/38685360064)
  passed. The original automatic review completed without findings.
- [PR65](https://github.com/Cubid-Me/cubid-sdk/pull/65) merged as `ceba9ca3`.
  Its Git tree equals tested repair `05bcf91f`; canonical CI
  [38692311207](https://github.com/Cubid-Me/cubid-sdk/actions/runs/38692311207)
  passed 381 unit and 132 acceptance tests. All five original review findings
  were repaired, independently confirmed and replied/resolved. Local source
  checks passed 78 focused tests, both typechecks and iOS/Android JavaScript exports.
- Neither merge SHA has GitHub check runs. The repository's CI workflow runs on
  pull requests and `main` pushes, not `dev` pushes. There is no separate green
  post-merge job to claim; the merge-tree equality and tested source checks above
  are the available integration evidence. A zero-status commit's API `pending`
  value does not indicate a running job.
- No open SDK PR was found during this audit. Identity's Google/consent stack
  remains open separately; a ready source PR is not provider enablement.

## Remaining issue map

| Issue | Existing source evidence | Remaining boundary |
| --- | --- | --- |
| [43](https://github.com/Cubid-Me/cubid-sdk/issues/43), [44](https://github.com/Cubid-Me/cubid-sdk/issues/44), [51](https://github.com/Cubid-Me/cubid-sdk/issues/51) | [PR59](https://github.com/Cubid-Me/cubid-sdk/pull/59): injected crypto, portable encoding and runtime-boundary guard/tests | Keep these regressions during future integration; do not repeat implementation or call source checks Hermes/device acceptance. |
| [45](https://github.com/Cubid-Me/cubid-sdk/issues/45) | [PR60](https://github.com/Cubid-Me/cubid-sdk/pull/60): asynchronous storage with ordering/race regressions | Actual native storage/platform observations remain distinct from the test adapter. |
| [46](https://github.com/Cubid-Me/cubid-sdk/issues/46) | [PR63](https://github.com/Cubid-Me/cubid-sdk/pull/63): hook navigation/callback tests and [native guide](../examples/native-siwc.md) | Device callback routing is covered by the later native acceptance pass. |
| [48](https://github.com/Cubid-Me/cubid-sdk/issues/48) | Native registration/public-client guidance in PR59 | A working registered native client is an external input; no registration or registration-token handling was performed by this stream. |
| [50](https://github.com/Cubid-Me/cubid-sdk/issues/50) | [PR61](https://github.com/Cubid-Me/cubid-sdk/pull/61): fresh same-subject passkey reauthentication; [step-up guide](../examples/step-up-siwc.md) | Observe the real hosted ceremony and cancellation before claiming device acceptance. |
| [47](https://github.com/Cubid-Me/cubid-sdk/issues/47) | PR64/65: [reference backend and native source](../../examples/expo-siwc/README.md), synthetic configuration only | Production-client new/returning-user passkey sign-in on a device remains open. No listener, native binary, hosted backend or client registration is supplied. |
| [49](https://github.com/Cubid-Me/cubid-sdk/issues/49) | [PR62](https://github.com/Cubid-Me/cubid-sdk/pull/62): [measurement kit](../examples/native-session-measurement.md) and explicit no-refresh guidance | Owner must measure system-browser reauthentication and choose app-session policy. The example's 900-second app credential is a development setting, not Cubid issuer token lifetime. Do not invent refresh grants. |
| [40](https://github.com/Cubid-Me/cubid-sdk/issues/40) | PR59 optional-claim types/parsing and [Cubid profile migration](../examples/federated-siwc.md#cubid-verified-email-profile-migration); this audit corrects older passkey/Native guidance | Hosted optional-claim omission smoke and atomic selective consent remain runtime gates. Generic `email_verified` compatibility stays intact. |
| [35](https://github.com/Cubid-Me/cubid-sdk/issues/35) | Existing production discovery/JWKS readiness command is part of canonical CI | Metadata readiness does not prove authenticated hosted login, provider setup or end-user consent. |
| [31](https://github.com/Cubid-Me/cubid-sdk/issues/31) | Existing auth/core FriendR constants, classification tests and generated references | Do not duplicate the implementation or infer permission to expose evidence through redirects/ID tokens. Any issue promotion/reciprocal handoff is separate from this source audit. |

SDK [PR58](https://github.com/Cubid-Me/cubid-sdk/pull/58) is merged only into
`main`; its cross-app assertion/SET helpers are absent from this `dev` lineage.
Its prior integration decision remains deferred. A later bounded backport must
preserve injected crypto through shared signature verification, nonce/subject
checks, native packages/tests, provider hints and RS256/assertion/SET contracts.
Do not replace auth files wholesale or treat provider hints as cross-app grants.
Resolve that integration direction before a future `dev`-to-`main` release
promotion; this documentation slice neither merges `main` nor imports its API.
Global Inbox #33/34 and stamp/widget #53–56 are separate work from this stream's
federated/native auth slice; no implementation or acceptance claim is made here.

## Identity dependencies and smallest next acceptance setup

1. **Keep the agreed wire contract.** `cubid_provider` is only a hosted selection
   hint; `login_hint` retains its recovery/subject meaning. Discovery syntax is
   not an enabled-factor list. RPs receive Cubid code/state/tokens and pairwise
   subjects, never provider tokens or provider identities. Current Cubid email
   is optional, verified and disclosed only when authorized; older/other OIDC
   boolean semantics are preserved. No new SDK API shape is needed for these rules.
2. **Finish runtime gates before Google/partial-consent claims.** At audit time,
   Identity [PR195](https://github.com/Cubid-Me/cubid-monorepo/pull/195),
   [196](https://github.com/Cubid-Me/cubid-monorepo/pull/196),
   [197](https://github.com/Cubid-Me/cubid-monorepo/pull/197),
   [198](https://github.com/Cubid-Me/cubid-monorepo/pull/198) and
   [199](https://github.com/Cubid-Me/cubid-monorepo/pull/199) remain open as a stack.
   Primary Google transaction/provisioning/linking/factor retirement and atomic
   consent must reach integration with validated storage/routes and hosted evidence.
   Atomic [#192](https://github.com/Cubid-Me/cubid-monorepo/issues/192) precedes
   optional selection [#74](https://github.com/Cubid-Me/cubid-monorepo/issues/74).
   [PR155](https://github.com/Cubid-Me/cubid-monorepo/pull/155) supplies the current
   verified-email profile; its merge does not close all selective-consent acceptance.
3. **Run the smallest approved passkey device setup first.** Reuse one existing
   native public client with its exact callback and approved issuer environment;
   wire the existing reference handler to an approved reachable TLS test host and
   scoped store; use one approved native application/build identity and the
   operator's existing signing/provisioning workflow on one available device.
   No new account, project, credentials or Starter rewrite is required by the
   source example. Its bounded in-memory store is development-only.
4. **Record actual ceremonies before policy/closure.** Observe new/returning
   passkey sign-in, cancellation, interrupted callback/cold start, persistence,
   logout and fresh same-subject no-op step-up. Use the measurement kit, recording
   the exact platform/build/environment and observations without secrets or PII.
   A staging pass or JavaScript export does not satisfy #47's production-client
   acceptance or prove an untested platform. Then use the measurements for #49's
   session-policy decision. Package publication and production changes require
   their separate authorization.
