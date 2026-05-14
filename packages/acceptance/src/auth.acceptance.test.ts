import { describe, expect, it } from "vitest";

import {
  buildCubidAuthorizationUrl,
  createCubidAuthNonce,
  createCubidAuthState,
} from "@cubid/auth";

describe("@cubid/acceptance auth consumer flow", () => {
  it("builds a browser-safe Sign in with Cubid URL from the public auth entrypoint", () => {
    const url = buildCubidAuthorizationUrl({
      authorizationEndpoint: "https://id.cubid.me/oauth2/authorize",
      clientId: "clearpass-dashboard",
      codeChallenge: "challenge-123",
      nonce: createCubidAuthNonce(16),
      redirectUri: "https://dashboard.clearpass.app/callback",
      state: createCubidAuthState(16),
    });

    const parsed = new URL(url);

    expect(parsed.origin).toBe("https://id.cubid.me");
    expect(parsed.searchParams.get("client_id")).toBe("clearpass-dashboard");
    expect(parsed.searchParams.get("response_type")).toBe("code");
    expect(parsed.searchParams.get("scope")).toBe("openid email profile");
  });
});
