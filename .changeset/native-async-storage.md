---
"@cubid/auth-react": minor
---

Accept async-capable provider storage for native cold-start sessions, await PKCE/session persistence and logout removal, and guard hydration/operation races. Core synchronous storage APIs remain unchanged; callers can await clearSession persistence completion.
