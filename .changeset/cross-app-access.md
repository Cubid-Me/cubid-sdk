---
"@cubid/auth": minor
---

Add cross-app access helpers for the identity-assertion authorization grant: `resources` on `buildCubidAuthorizationUrl`, `buildCubidCrossAppResource`, `supportsCubidCrossAppAccess`, `requestCubidIdentityAssertion` and `buildCubidIdentityAssertionRequest` (server-side token exchange for an ID-JAG), `buildCubidJwtBearerGrantRequest`, `validateCubidIdentityAssertion`, and Security Event Token helpers (`validateCubidSecurityEventToken`, `decodeCubidSecurityEventToken`, `CUBID_SECURITY_EVENT_TYPES`). Discovery typing gains `grant_types_supported` and the `cross_app_access_*` fields.
