import { describe, expect, it, vi } from "vitest";

import {
  buildHostedRecoveryUrl,
  createCubidWalletRecoveryClient,
} from "@cubid/wallet-recovery";

describe("@cubid/acceptance wallet-recovery consumer flow", () => {
  it("builds hosted recovery URLs and completes release from the public entrypoint", async () => {
    expect(
      buildHostedRecoveryUrl({
        passportOrigin: "https://passport.cubid.me",
        recoverySessionId: "rw_release_123",
      })
    ).toBe(
      "https://passport.cubid.me/recovery/wallet?recovery_session_id=rw_release_123"
    );

    const fetchImpl = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      expect(new URL(String(input)).pathname).toBe(
        "/api/recovery-bundles/release/complete"
      );
      expect(new Headers(init?.headers).get("authorization")).toBe(
        "Bearer user_token_123"
      );

      return new Response(
        JSON.stringify({
          data: {
            bundleMaterial: "opaque-app-owned-material",
            recoveryBundleId: "rw_bundle_123",
            recoverySessionId: "rw_release_123",
            status: "released",
          },
        }),
        {
          headers: { "content-type": "application/json" },
          status: 200,
        }
      );
    });

    const client = createCubidWalletRecoveryClient({
      baseUrl: "https://passport.cubid.me",
      fetch: fetchImpl,
      getAccessToken: () => "user_token_123",
    });
    const response = await client.completeRelease({
      recoverySessionId: "rw_release_123",
    });

    expect(response.bundleMaterial).toBe("opaque-app-owned-material");
    expect(response.release.recoveryBundleId).toBe("rw_bundle_123");
  });
});
