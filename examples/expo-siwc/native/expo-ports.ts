import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { ReferenceClientError } from "../transport";
import type { ReferenceClient } from "../transport";
import type { NativePorts } from "./controller";

function base64url(bytes: Uint8Array) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let output = ""; let value = 0; let bits = 0;
  for (const byte of bytes) {
    value = (value << 8) | byte; bits += 8;
    while (bits >= 6) { bits -= 6; output += alphabet[(value >>> bits) & 63]; }
  }
  if (bits) output += alphabet[(value << (6 - bits)) & 63];
  return output;
}
export function createExpoPorts(client: ReferenceClient): NativePorts & { isBrowserActive(): boolean } {
  let browserActive = false;
  return {
    client,
    storage: {
      getItem: (key) => SecureStore.getItemAsync(key),
      setItem: (key, value) => SecureStore.setItemAsync(key, value),
      removeItem: (key) => SecureStore.deleteItemAsync(key),
    },
    // The synchronous getRandomBytes API documents a Math.random fallback in development.
    randomVerifier: async () => base64url(await Crypto.getRandomBytesAsync(32)),
    challenge: async (verifier) => (await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, verifier, { encoding: Crypto.CryptoEncoding.BASE64 })).replace(/\+/gu, "-").replace(/\//gu, "_").replace(/=+$/u, ""),
    isBrowserActive: () => browserActive,
    async openBrowser(url, callback) {
      browserActive = true;
      try {
        const result = await WebBrowser.openAuthSessionAsync(url, callback);
        if (result.type === "success") return { type: "success", url: result.url };
        if (result.type === "cancel" || result.type === "dismiss") return { type: result.type };
        throw new ReferenceClientError("unavailable");
      } finally { browserActive = false; }
    },
    async dismissBrowser() {
      // Android can invalidate the local ceremony; its custom tab closes through the OS/back action.
      if (Platform.OS === "ios") WebBrowser.dismissAuthSession();
    },
  };
}
