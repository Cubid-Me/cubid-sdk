import { createCubidApiClient } from "@cubid/core";
import { createCubidWalletRecoveryClient } from "@cubid/wallet-recovery";
import { describe, expect, it, vi } from "vitest";

describe("@cubid/acceptance recoverable wallet hosted path", () => {
  it("stitches backend enrollment, hosted launch, and user release completion", async () => {
    const coreFetch = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const path = new URL(String(input)).pathname;
      const body = JSON.parse(String(init?.body)) as Record<string, unknown>;

      expect(body.api_key).toBe("acceptance-api-key");
      expect(body.dapp_user_uuid).toBe("app-user-123");

      if (path === "/api/v3/recovery-bundles/enroll") {
        expect(new Headers(init?.headers).get("Idempotency-Key")).toBe(
          "acceptance-enroll-1"
        );
        expect(body.bundle_material).toBe("opaque-app-owned-recovery-material");

        return new Response(
          JSON.stringify({
            data: {
              bundleMaterial: "must-not-leak",
              providerKey: "host_wallet",
              recoveryBundleId: "rw_bundle_123",
              status: "active",
              wrapped_data_key: "must-not-leak",
            },
          }),
          { headers: { "content-type": "application/json" }, status: 200 }
        );
      }

      if (path === "/api/v3/recovery-bundles/release/start") {
        expect(new Headers(init?.headers).get("Idempotency-Key")).toBe(
          "acceptance-release-1"
        );
        expect(body.recovery_bundle_id).toBe("rw_bundle_123");

        return new Response(
          JSON.stringify({
            data: {
              providerKey: "host_wallet",
              recoveryBundleId: "rw_bundle_123",
              recoverySessionId: "rw_release_123",
              recoveryUrl: "/recovery/wallet?recovery_session_id=rw_release_123",
              status: "pending",
            },
          }),
          { headers: { "content-type": "application/json" }, status: 200 }
        );
      }

      throw new Error(`Unexpected core recovery path: ${path}`);
    });

    const core = createCubidApiClient({
      apiKey: "acceptance-api-key",
      baseUrl: "https://id.cubid.me",
      fetch: coreFetch,
    });

    const enrolled = await core.enrollRecoveryBundle({
      bundleMaterial: "opaque-app-owned-recovery-material",
      idempotencyKey: "acceptance-enroll-1",
      providerKey: "host_wallet",
      recoveryBundleId: "rw_bundle_123",
      userId: "app-user-123",
    });

    expect(enrolled.bundle.recoveryBundleId).toBe("rw_bundle_123");
    expect(enrolled.bundle.raw.bundleMaterial).toBeUndefined();
    expect(enrolled.raw.wrapped_data_key).toBeUndefined();

    const releaseSession = await core.startRecoveryBundleRelease({
      idempotencyKey: "acceptance-release-1",
      providerKey: "host_wallet",
      recoveryBundleId: "rw_bundle_123",
      userId: "app-user-123",
    });

    expect(releaseSession.releaseSession.recoverySessionId).toBe("rw_release_123");

    const walletRecoveryFetch = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      expect(new URL(String(input)).pathname).toBe(
        "/api/recovery-bundles/release/complete"
      );
      expect(new Headers(init?.headers).get("authorization")).toBe(
        "Bearer user-token-123"
      );
      expect(JSON.parse(String(init?.body))).toEqual({
        recovery_session_id: "rw_release_123",
      });

      return new Response(
        JSON.stringify({
          data: {
            bundleMaterial: "opaque-app-owned-recovery-material",
            providerKey: "host_wallet",
            recoveryBundleId: "rw_bundle_123",
            recoverySessionId: "rw_release_123",
            status: "released",
            wrapped_data_key: "must-not-leak",
          },
        }),
        { headers: { "content-type": "application/json" }, status: 200 }
      );
    });

    const recovery = createCubidWalletRecoveryClient({
      baseUrl: "https://id.cubid.me",
      fetch: walletRecoveryFetch,
      getAccessToken: () => "user-token-123",
    });

    expect(
      recovery.buildHostedRecoveryUrl({
        recoverySessionId: releaseSession.releaseSession.recoverySessionId!,
      })
    ).toBe("https://id.cubid.me/recovery/wallet?recovery_session_id=rw_release_123");

    const completed = await recovery.completeRelease({
      recoverySessionId: "rw_release_123",
    });

    expect(completed.bundleMaterial).toBe("opaque-app-owned-recovery-material");
    expect(completed.release.recoveryBundleId).toBe("rw_bundle_123");
    expect(completed.release.status).toBe("released");
    expect(completed.release.raw).not.toHaveProperty("wrapped_data_key");
  });
});
