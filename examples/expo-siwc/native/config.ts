// Synthetic/local values only. No registered client or listening backend is implied.
export const configuration = {
  issuer: "https://issuer.example.invalid",
  clientId: "synthetic-native-public-client",
  callback: "cubidexample://auth/callback",
  backendOrigin: "http://127.0.0.1:8787",
  storagePrefix: "cubid.sdk.reference.synthetic.v1",
} as const;
