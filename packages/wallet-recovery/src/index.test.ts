import assert from "node:assert/strict";
import { test } from "vitest";

import {
  buildHostedRecoveryUrl,
  createCubidWalletRecoveryClient,
} from "./index";
import {
  CubidRecoverableWalletError,
  isCubidRecoverableWalletError,
} from "@cubid/core";

const createJsonResponse = (payload: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(payload), {
    headers: {
      "content-type": "application/json",
      "x-request-id": "request_123",
      ...(init.headers ?? {}),
    },
    status: init.status ?? 200,
  });

test("buildHostedRecoveryUrl creates the Passport recovery launcher URL", () => {
  assert.equal(
    buildHostedRecoveryUrl({
      passportOrigin: "https://passport.cubid.me",
      recoverySessionId: "rw_release_123",
    }),
    "https://passport.cubid.me/recovery/wallet?recovery_session_id=rw_release_123"
  );
});

test("buildHostedRecoveryUrl rejects unsafe Passport URL schemes", () => {
  assert.throws(
    () =>
      buildHostedRecoveryUrl({
        passportOrigin: "javascript:alert(1)",
        recoverySessionId: "rw_release_123",
      }),
    /requires an https Passport URL/u
  );

  assert.equal(
    buildHostedRecoveryUrl({
      passportOrigin: "http://localhost:3000",
      recoverySessionId: "rw_release_123",
    }),
    "http://localhost:3000/recovery/wallet?recovery_session_id=rw_release_123"
  );
});

test("wallet recovery client completes user-authorized release and lists safe bundles", async () => {
  const calls: Array<{
    authorization: string | null;
    body: unknown;
    path: string;
  }> = [];
  const client = createCubidWalletRecoveryClient({
    baseUrl: "https://passport.cubid.me",
    getAccessToken: () => "user_token_123",
    fetch: async (input, init) => {
      const path = new URL(String(input)).pathname;
      calls.push({
        authorization: new Headers(init?.headers).get("authorization"),
        body: JSON.parse(String(init?.body)),
        path,
      });

      if (path.endsWith("/release/complete")) {
        return createJsonResponse({
          data: {
            bundleMaterial: "opaque-app-owned-recovery-material",
            dappUserUuid: "dapp_user_123",
            providerKey: "cubid",
            recoveryBundleId: "rw_bundle_123",
            recoverySessionId: "rw_release_123",
            releasedAt: "2026-05-20T19:20:00.000Z",
            status: "released",
            wrapped_data_key: "must-not-leak",
          },
        });
      }

      return createJsonResponse({
        data: [
          {
            bundleVersion: 1,
            createdAt: "2026-05-20T19:10:00.000Z",
            dappUserUuid: "dapp_user_123",
            providerKey: "cubid",
            recoveryBundleId: "rw_bundle_123",
            status: "active",
            vaultMetadata: { hidden: true },
          },
        ],
      });
    },
  });

  const release = await client.completeRelease({
    recoverySessionId: "rw_release_123",
  });
  const list = await client.listBundles();

  assert.equal(release.bundleMaterial, "opaque-app-owned-recovery-material");
  assert.equal(release.release.recoveryBundleId, "rw_bundle_123");
  assert.equal((release.raw.data as Record<string, unknown>).bundleMaterial, undefined);
  assert.equal(release.release.raw.bundleMaterial, undefined);
  assert.equal(release.release.raw.wrapped_data_key, undefined);
  assert.equal(list.bundles[0]?.status, "active");
  assert.equal(list.bundles[0]?.raw.vaultMetadata, undefined);
  assert.deepEqual(calls, [
    {
      authorization: "Bearer user_token_123",
      body: { recovery_session_id: "rw_release_123" },
      path: "/api/recovery-bundles/release/complete",
    },
    {
      authorization: "Bearer user_token_123",
      body: {},
      path: "/api/recovery-bundles/list",
    },
  ]);
});

test("wallet recovery client maps Passport recovery errors", async () => {
  const client = createCubidWalletRecoveryClient({
    accessToken: "user_token_123",
    baseUrl: "https://passport.cubid.me",
    fetch: async () =>
      createJsonResponse(
        {
          error: {
            code: "wrong_user",
            message: "The signed-in user does not match this recovery session.",
            requestId: "passport_rw_123",
          },
        },
        { status: 403 }
      ),
  });

  await assert.rejects(
    () => client.completeRelease({ recoverySessionId: "rw_release_123" }),
    (error) => {
      assert.ok(error instanceof CubidRecoverableWalletError);
      assert.ok(isCubidRecoverableWalletError(error));
      assert.equal(error.recoveryCode, "wrong_user");
      assert.equal(error.category, "auth");
      assert.equal(error.status, 403);
      assert.equal(error.endpoint, "recovery-bundles/release/complete");
      return true;
    }
  );
});

test("wallet recovery client reports missing fetch clearly", () => {
  const originalFetch = globalThis.fetch;

  try {
    Object.defineProperty(globalThis, "fetch", {
      configurable: true,
      value: undefined,
      writable: true,
    });

    assert.throws(
      () =>
        createCubidWalletRecoveryClient({
          accessToken: "user_token_123",
          baseUrl: "https://passport.cubid.me",
        }),
      /requires fetch support/u
    );
  } finally {
    Object.defineProperty(globalThis, "fetch", {
      configurable: true,
      value: originalFetch,
      writable: true,
    });
  }
});
