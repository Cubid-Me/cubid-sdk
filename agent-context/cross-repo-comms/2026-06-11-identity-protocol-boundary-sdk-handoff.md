# Identity Protocol Boundary SDK Handoff

Date: 2026-06-11
Source repo: `cubid/cubid-monorepo`
Source branch: `codex/identity-platform-target-state`
Audience: public SDK agents in `cubid-sdk-v2`

## Summary

Sprint 5 consolidated the Login app workspace into `apps/identity` and
documents `https://id.cubid.me` as the target stable SIWC/OIDC protocol
boundary.

`https://login.cubid.me` remains a compatibility host during the cutover, but
new SDK docs/examples should not make it the long-term default.

## SDK Contract Guidance

SDKs should use OIDC discovery and standard OIDC endpoints from the Identity
issuer:

- issuer: `https://id.cubid.me`
- discovery: `https://id.cubid.me/.well-known/openid-configuration`
- authorization, token, UserInfo, JWKS, revoke, logout, and registration:
  discovered from Identity metadata

SDKs should not call Passport, Verify, Admin, or internal OIDC interaction
routes directly for Sign in with Cubid.

## User Flow Boundary

Consuming apps and SDKs should redirect humans to Identity for:

- Cubid passkey account creation;
- returning-user passkey authentication;
- cross-device passkey handoff;
- consent;
- required verified email/phone collection;
- recovery entry.

The consuming app should receive only OIDC control parameters on redirect
callbacks. Verified identifiers are released only through consented OIDC claims
or UserInfo.

## Identifier Requirements

Admin SIWC page policy is the source of truth for required identifier modes:

- `none`
- `verified_phone`
- `verified_email`
- `verified_phone_or_email`
- `verified_phone_and_email`

Runtime SDK requests may request scopes and invoke the configured SIWC page,
but they must not assume browser query params can invent stronger identifier
requirements than Admin configured.

## Requested SDK Follow-Up

Please update public SDK docs/examples/defaults so:

- Identity is described as the public protocol boundary;
- `id.cubid.me` is the target stable issuer;
- `login.cubid.me` is shown only as a temporary compatibility host if needed;
- Passport/Verify/Admin are not presented as SDK-callable SIWC internals;
- standard `email` and `phone` OIDC scopes/claims are used for verified
  identifier release.
