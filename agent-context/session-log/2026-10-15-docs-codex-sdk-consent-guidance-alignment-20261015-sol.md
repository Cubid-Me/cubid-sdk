## 2026-10-15T06:43:05.886578+00:00 - Align existing client guidance with agreed disclosure profile

- agent: Codex SDK stream, GPT6.1 Sol High
- branch: codex/sdk-consent-guidance-alignment-20261015-sol
- head: ceba9ca351592b0e07a4e1774a57121b9976dd9b
- summary: Audit current dev/open issues/PRs against Identity federation v1. Correct stale passkey and Native README claims that current Cubid discloses email_verified, separate collection from disclosure, use explicit minimal scopes without changing SDK defaults, retain older/other issuer and phone semantics, and sanitize demo evidence guidance. Record source-complete issue mappings, runtime/device gates, deferred main-only PR58 integration and smallest approved real acceptance setup. Package README policy requires prospective react-native0.1.1 patch metadata and matching generated manifest entry; no runtime/API/CI/root lock/Starter changes or publishing.
- validation: PR64/65 merge Git trees exactly equal their tested source heads; those PR canonical checks remain green. Merge SHAs have zero check runs because workflow triggers only PRs/main pushes, so no post-merge job or hosted/device proof is claimed. Both complete guide TS/TSX fences typecheck;9 relative links/anchors and whitespace checks pass. Canonical local API-reference check active; full PR CI follows. No new implementation-mirroring tests for documentation-only changes.
- follow-ups: Draft PR into dev, exact-head CI, single ready/automatic review and findings handling before authorized dev integration. SDK40 hosted omission/atomic-consent and SDK47/49 device/policy acceptance remain open. SDK40 issue comment stays unattempted per parent instruction. Preserve sole worktree and existing refs/checkouts; no package publication or new access.

## 2026-10-15T06:51:48.026385+00:00 - Refresh embedded packaged README reference

- agent: Codex SDK stream, GPT6.1 Sol High
- branch: codex/sdk-consent-guidance-alignment-20261015-sol
- head: ec0440adc4def7bd774a138be1d2018f674634ef
- summary: Repair CI's API-reference drift: TypeDoc embeds the packaged Native README as well as the version manifest. Regenerate the Native artifact using the canonical buildPackageReference and normalizer functions in a temporary external-volume launcher. No generator or API source edits.
- validation: Targeted canonical regeneration succeeded; structured comparison proves all non-README API declarations unchanged. Whitespace checks pass. Initial fullCI38694269973 passed lint/types/unit/build/acceptance/coverage then reported only react-native.json stale. Local all-package reference check was stopped once that exact CI cause was known; no local full-reference green claim. New exact-head full CI follows.
- follow-ups: Preserve draft until canonical reference/readiness/package checks pass, then one ready/automatic review transition. Runtime/hosted/device dependencies remain as documented; no publishing or new access.

## 2026-10-15T07:14:30.849038+00:00 - Normalize Native known-email example for omitted boolean

- agent: Codex SDK stream, GPT6.1 Sol High
- branch: codex/sdk-consent-guidance-alignment-20261015-sol
- head: 333ab722614892632c8c953418d833f440854d16
- summary: Address the original PR66 P2: CubidProfileDetails needs a known.emailVerified UI flag, so the app-owned example now maps a validated, exact-issuer session using a trusted confirmed Cubid profile. Claim omission stays undefined; current-profile omission with an email can skip redundant OTP, while explicit false, missing email, issuer mismatch and unconfirmed/legacy omission cannot. Older/other issuers retain explicit-true semantics. This is a private app mapping example, not a new SDK/discovery/OIDC claim contract. Regenerate embedded README with canonical generator functions.
- validation: Three extracted TS/TSX examples typecheck; nine executable normalization cases pass, including false/legacy/issuer mismatch/missing email. Canonical Native regeneration succeeds; structured comparison proves non-README API declarations unchanged; whitespace checks pass. FullCI38695112433 passed381 unit+132 acceptance before this doc repair; new same-head CI follows.
- follow-ups: Push repair to the existing ready PR66; reply/resolve only its original thread with evidence, rerun exact-head canonicalCI/version checks, then authorized dev integration. No manual rereview/draft cycling, SDK40 issue comment, publishing, hosted setup, credentials or device-readiness claim.
