---
"@cubid/react-native": minor
---

New package: React Native components for Cubid profile completion. `EmailOtpForm` and `PhoneOtpForm` are the one-time-code flows of `@cubid/react` drawn with native views (no DOM, no `react-dom` peer), and `CubidProfileDetails` is one component that collects what a profile is missing (email, phone, name, picture, location) with each field required, optional or skipped, and location asked for only at the granularity the app chose (`rough`, `approximate`, `exact` or `none`).
