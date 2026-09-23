# `@cubid/react-native`

React Native components for Cubid profile completion, built on
`@cubid/browser`. No DOM elements and no `react-dom` peer: the kit draws with
`View`, `Text`, `TextInput` and `Pressable`, so it runs on iOS, Android and
React Native Web from one codebase (Expo included).

## When To Choose This Package

Use `@cubid/react-native` in a React Native or Expo app. Use `@cubid/react` in a
React DOM app. Both sit on the same headless `@cubid/browser` client, which only
needs `fetch`.

## Install

```sh
npm install @cubid/react-native @cubid/browser @cubid/core
```

`react` and `react-native` are peer dependencies.

## Registry Availability

- npm: supported
- JSR: not published by policy

## Basic Usage

```tsx
import { createCubidApiClient } from "@cubid/core";
import { createCubidWeb2Client } from "@cubid/browser";
import { CubidProvider, EmailOtpForm, PhoneOtpForm } from "@cubid/react-native";

const client = createCubidWeb2Client(createCubidApiClient({ apiKey, baseUrl, dappId }));

<CubidProvider client={client}>
  <EmailOtpForm onVerified={(r) => console.log(r.isVerified)} />
  <PhoneOtpForm onVerified={(r) => console.log(r.isVerified)} />
</CubidProvider>
```

Keep the dapp API key off the device: point the client at your own server,
which adds the key and forwards the two one-time-code calls.

## One Component For Everything A Profile Needs

```tsx
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { CubidProfileDetails } from "@cubid/react-native";

<CubidProfileDetails
  client={client}
  known={{ email: session.email, emailVerified: session.emailVerified }}
  request={{ email: "required", phone: "optional", name: "required", picture: "optional", location: "rough" }}
  readPosition={async (granularity) => {
    // Ask for coarse permission only when a rough location is enough.
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) return null;
    const p = await Location.getCurrentPositionAsync({ accuracy: granularity === "exact" ? Location.Accuracy.High : Location.Accuracy.Lowest });
    return { lat: p.coords.latitude, lng: p.coords.longitude };
  }}
  pickPicture={async () => {
    const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"] });
    return r.canceled ? null : r.assets[0].uri;
  }}
  persistStamp={{ pageId, userId }}
  onComplete={(result) => save(result)}
/>
```

- Each field says whether it is `required`, `optional` or `skip`. The component
  asks only for what `known` does not already cover, one step at a time, and
  hands back one `CubidProfileDetailsResult`.
- **Location granularity is an input, and it decides what is asked for.** With
  `location: "rough"` the app's `readPosition` is called with `"rough"` (coarse
  permission is enough), and the reading is rounded to about 11 km before it
  leaves the device. `"approximate"` rounds to about 1 km, `"exact"` keeps the
  reading, `"none"` never mentions location.
- Email and phone are verified through Cubid's one-time codes. With
  `persistStamp`, the verified value is written to the account as a stamp, so
  the next Sign in with Cubid carries `email` and `email_verified` (or the
  phone claims) for a client that has consented to those scopes.
- Name and picture have no Cubid write API yet: they are collected and
  returned in the result for the app to store, and the location reading is
  returned the same way. See the package's issue thread for the Passport-side
  contract.

## API Reference

- JSON reference: `../../docs/reference/api/react-native.json`
- Package matrix: `../../README.md`
