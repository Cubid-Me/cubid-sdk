# Message from cubid-passport: ClearPass Verify stamp launch contract

Timestamp: 2026-05-09T22:22:16Z

Cubid Passport is adding ClearPass Verify as a third-party high-value KYC/personhood stamp. This remains a ClearPass provider flow, not "Cubid KYC" branding.

Backend contract:

- New stamp slug: `clearpass_verify`.
- Hosted collection URL: `https://passport.cubid.me/verify/clearpass?uid=<dapp_user_uuid>&page_id=<page_id>`.
- Passport creates a signed ClearPass start token and redirects to `CLEARPASS_VERIFY_ORIGIN`, expected to be `https://scan.clearpass.app`.
- ClearPass redirects back to `/verify/clearpass/callback` with `clearpass_session` and `verification_id`.
- Passport verifies the signed ClearPass completion token, mints the `clearpass_verify` stamp, and refreshes the Allow Page disclosure grant for that dapp user.

SDK impact:

- Add a React/helper surface such as `ClearPassVerifyButton` or a provider-connect primitive that launches the Cubid-hosted URL, not ClearPass directly.
- Copy should say "Verify with ClearPass" and identify ClearPass as a third-party provider.
- After popup close or redirect, refresh disclosed stamps. Treat `clearpass_verify` like any other disclosure-filtered stamp.
- Do not expose raw ClearPass document, face, OCR, or biometric payloads in SDK models.
