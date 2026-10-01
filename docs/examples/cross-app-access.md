# Cross-App Access: Acting In A Sibling App Without A Second Sign-In

This guide covers the identity-assertion authorization grant ("Cross App
Access") as Cubid issues it, for two kinds of integrator:

- a **requesting app** (for example WondrBot) that signs people in with Cubid
  and wants to act in another Cubid-connected app for them;
- a **resource app** (ChainCrew, FriendR, SmarTrust, FundLoop, MyPayTag, or any
  app with its own token endpoint) that accepts Cubid's assertions.

The authoritative contract is `docs/engineering/oidc-cross-app-access.md` in
`Cubid-Me/cubid-monorepo`. This page shows the SDK calls.

## How it works

1. A Cubid operator **pairs** the requesting app with the resource app. Both
   apps agreed; the pairing fixes the assertion `aud` and the scopes it may
   carry.
2. The **person approves** on Cubid's consent page: the requesting app adds
   `resource=` to its ordinary Sign in with Cubid request, and the consent page
   lists the apps it wants to act in. Cubid records that consent; the person
   can withdraw it in Passport at any time.
3. The requesting app's **server** exchanges the ID token Cubid issued to it
   for a five-minute assertion addressed to the resource app
   (`grant_type=urn:ietf:params:oauth:grant-type:token-exchange`).
4. The requesting app sends the assertion to the **resource app's own token
   endpoint** (`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer`) and
   receives that app's access token, under the `sub` the resource app already
   knows for the person.

Unlike an enterprise identity provider, Cubid never lets an organization or a
client grant this on the person's behalf. Both gates fail closed.

## Requesting app

### Ask for consent at sign-in

Name every paired app the person may later want to connect, so later
connections need no browser trip:

```ts
import {
  buildCubidAuthorizationUrl,
  buildCubidCrossAppResource,
  fetchCubidOidcDiscoveryDocument,
  supportsCubidCrossAppAccess,
} from "@cubid/auth"

const discovery = await fetchCubidOidcDiscoveryDocument({ issuer: "https://id.cubid.me" })
if (!supportsCubidCrossAppAccess(discovery)) {
  throw new Error("This issuer does not offer cross-app access yet.")
}

const signInUrl = buildCubidAuthorizationUrl({
  authorizationEndpoint: discovery.authorization_endpoint,
  clientId: "cubid_wondrbot",
  codeChallenge: pkce.codeChallenge,
  nonce,
  redirectUri: "https://wondrbot.example/callback",
  resources: [
    buildCubidCrossAppResource("cubid_chaincrew"),
    buildCubidCrossAppResource("cubid_friendr"),
  ],
  state,
})
```

### Exchange the ID token for an assertion (server only)

This call authenticates with the requesting app's client secret. It belongs on
the server that holds that secret, never in a browser.

```ts
import {
  getCubidCrossAppConsentResource,
  isCubidCrossAppConsentRequired,
  requestCubidIdentityAssertion,
} from "@cubid/auth"

try {
  const { assertion, expiresAt } = await requestCubidIdentityAssertion({
    audience: "https://auth.chaincrew.example", // as configured in the pairing
    clientId: "cubid_wondrbot",
    clientSecret: process.env.CUBID_CLIENT_SECRET!,
    scope: ["accounts:read"],
    subjectToken: session.idToken,
    tokenEndpoint: discovery.token_endpoint,
  })
} catch (error) {
  if (isCubidCrossAppConsentRequired(error)) {
    // The person has not allowed this yet. Send them through
    // buildCubidAuthorizationUrl with this resource value.
    const resource = getCubidCrossAppConsentResource(error)
  }
  throw error
}
```

Other errors you should expect as `CubidAuthError.code`: `invalid_target` (no
pairing for that audience, or the app is suspended), `invalid_grant` (the ID
token's session or Login with Cubid consent ended), `invalid_scope`, and
`unauthorized_client` (public client, or token exchange not registered).

### Redeem the assertion at the resource app

```ts
import { buildCubidJwtBearerGrantRequest } from "@cubid/auth"

const prepared = buildCubidJwtBearerGrantRequest({
  assertion,
  clientId: "wondrbot",            // as registered at ChainCrew
  clientSecret: chainCrewSecret,   // if ChainCrew requires it
  tokenEndpoint: "https://auth.chaincrew.example/token",
})
const response = await fetch(prepared.url, prepared.init)
```

The response is the resource app's own token response. Store and refresh it as
you would any OAuth grant to that app.

## Resource app

### Accept assertions at your token endpoint

```ts
import { validateCubidIdentityAssertion } from "@cubid/auth"

const claims = await validateCubidIdentityAssertion({
  acceptedClientIds: ["cubid_wondrbot"],
  assertion,
  audience: "https://auth.chaincrew.example", // what Cubid's pairing says
  discoveryDocument: cubidDiscovery,
})

// claims.sub is the pairwise subject you already know for this person.
// claims.client_id names the requesting app; claims.auth_time, acr and amr
// describe the Cubid authentication behind it.
```

Validation covers the `oauth-id-jag+jwt` type, issuer, audience, expiry,
subject, requesting client and the RS256 signature against Cubid's JWKS. Keep
your own replay check on `claims.jti` if you want one; assertions live five
minutes.

Create the account on first use exactly as you would after a direct Sign in
with Cubid, keyed on `sub`. Never accept an ID token where you expect an
assertion, or the reverse; the SDK refuses both.

### Receive Security Event Tokens

Register a `security_events_uri` on your Cubid client (at `/register` or with
`PUT /register/{client_id}`). Cubid pushes one event per request, as
`application/secevent+jwt`:

```ts
import {
  CUBID_SECURITY_EVENT_TYPES,
  validateCubidSecurityEventToken,
} from "@cubid/auth"

export async function handleCubidEvent(request: Request) {
  const event = await validateCubidSecurityEventToken({
    clientId: "cubid_chaincrew",
    discoveryDocument: cubidDiscovery,
    token: await request.text(),
  })

  switch (event.eventType) {
    case CUBID_SECURITY_EVENT_TYPES.crossAppConsentRevoked:
      // event.subject.sub is your pairwise subject for the person;
      // event.payload.requesting_client_id names the app to cut off.
      await revokeGrantsFor(event.subject.sub, event.payload.requesting_client_id)
      break
    case CUBID_SECURITY_EVENT_TYPES.accountPurged:
      await endSessionsFor(event.subject.sub)
      break
  }

  return new Response(null, { status: 202 })
}
```

Any 2xx acknowledges the event. Cubid retries failures after 1, 5, 30, 120 and
720 minutes. Event payloads never carry Cubid-internal identifiers.

## Registration recap

- Requesting apps are `confidential_web` clients whose `grant_types` include
  `urn:ietf:params:oauth:grant-type:token-exchange`.
- Any app may set `security_events_uri` (HTTPS).
- Discovery advertises the grant in `grant_types_supported` and
  `cross_app_access_supported: true`.
