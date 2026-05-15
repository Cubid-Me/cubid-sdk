import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import {
  CUBID_NOTIFICATION_CATEGORIES,
  createCubidCommsClient,
  CubidCommsError,
  getActiveNotificationCategoryGrants,
  hasNotificationCategoryGrant,
} from "./index";

describe("@cubid/comms", () => {
  it("creates a signed-in Passport-user client boundary without dapp api key assumptions", () => {
    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me/",
      headers: {
        "x-trace-id": "trace-123",
      },
    });

    expect(client.config.baseUrl).toBe("https://id.cubid.me");
    expect(client.config.accessToken).toBe("firebase-bearer-token");
    expect(client.config.headers.get("x-trace-id")).toBe("trace-123");
  });

  it("rejects empty access tokens and invalid base urls", () => {
    expect(() =>
      createCubidCommsClient({
        accessToken: "   ",
        baseUrl: "https://id.cubid.me",
      })
    ).toThrow(CubidCommsError);

    expect(() =>
      createCubidCommsClient({
        accessToken: "token",
        baseUrl: "not a url",
      })
    ).toThrow(CubidCommsError);
  });

  it("does not declare core, browser, react, or auth-react dependency edges", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")
    ) as {
      dependencies?: Record<string, string>;
    };

    expect(packageJson.dependencies?.["@cubid/core"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/browser"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/react"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/auth-react"]).toBeUndefined();
  });

  it("lists redacted notification channel metadata with bearer auth", async () => {
    const fetchImpl = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      expect(String(input)).toBe("https://id.cubid.me/api/notifications/channels/list");
      expect(init?.method).toBe("POST");
      expect(new Headers(init?.headers).get("authorization")).toBe(
        "Bearer firebase-bearer-token"
      );
      expect(init?.body).toBe("{}");

      return new Response(
        JSON.stringify({
          data: [
            {
              channelId: "channel_1",
              channelType: "email",
              createdAt: "2026-05-14T00:00:00.000Z",
              displayHint: "p***@example.com",
              isDefault: true,
              label: "Personal email",
              providerKey: "email_smtp",
              status: "active",
              updatedAt: "2026-05-14T00:00:00.000Z",
              verificationStatus: "verified",
              verifiedAt: "2026-05-14T00:01:00.000Z",
            },
          ],
        }),
        {
          headers: {
            "content-type": "application/json",
            "x-request-id": "passport_channels_1",
          },
          status: 200,
        }
      );
    });

    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me",
      fetch: fetchImpl,
    });

    const response = await client.channels.list();

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(response.requestId).toBe("passport_channels_1");
    expect(response.channels).toEqual([
      expect.objectContaining({
        channelId: "channel_1",
        channelType: "email",
        displayHint: "p***@example.com",
        isDefault: true,
        label: "Personal email",
        providerKey: "email_smtp",
        status: "active",
        verificationStatus: "verified",
      }),
    ]);
  });

  it("updates a notification channel without exposing destination data", async () => {
    const fetchImpl = vi.fn(async (_input: string | URL | Request, init?: RequestInit) => {
      expect(JSON.parse(String(init?.body))).toEqual({
        channelId: "channel_1",
        isDefault: true,
        label: "Updated label",
        status: "muted",
      });

      return new Response(
        JSON.stringify({
          data: {
            channelId: "channel_1",
            channelType: "email",
            createdAt: "2026-05-14T00:00:00.000Z",
            displayHint: "p***@example.com",
            isDefault: true,
            label: "Updated label",
            providerKey: "email_smtp",
            status: "muted",
            updatedAt: "2026-05-14T00:02:00.000Z",
            verificationStatus: "verified",
            verifiedAt: "2026-05-14T00:01:00.000Z",
          },
        }),
        {
          headers: {
            "content-type": "application/json",
            "x-request-id": "passport_channels_2",
          },
          status: 200,
        }
      );
    });

    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me",
      fetch: fetchImpl,
    });

    const response = await client.channels.update({
      channelId: "channel_1",
      isDefault: true,
      label: "Updated label",
      status: "muted",
    });

    expect(response.requestId).toBe("passport_channels_2");
    expect(response.channel).toEqual(
      expect.objectContaining({
        channelId: "channel_1",
        channelType: "email",
        isDefault: true,
        label: "Updated label",
        status: "muted",
      })
    );
  });

  it("requires at least one mutable field when updating a channel", async () => {
    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me",
    });

    await expect(
      client.channels.update({
        channelId: "channel_1",
      })
    ).rejects.toThrow(CubidCommsError);
  });

  it("starts email channel verification without exposing a setup code", async () => {
    const fetchImpl = vi.fn(async (_input: string | URL | Request, init?: RequestInit) => {
      expect(JSON.parse(String(init?.body))).toEqual({
        channelType: "email",
        destination: "Person@Example.com",
        isDefault: true,
        label: "Personal email",
      });

      return new Response(
        JSON.stringify({
          data: {
            channel: {
              channelId: "channel_1",
              channelType: "email",
              createdAt: "2026-05-14T00:00:00.000Z",
              displayHint: "p***@example.com",
              isDefault: true,
              label: "Personal email",
              providerKey: "email_smtp",
              status: "active",
              updatedAt: "2026-05-14T00:00:00.000Z",
              verificationStatus: "pending",
              verifiedAt: null,
            },
            challenge: {
              challengeId: "challenge_1",
              expiresAt: "2026-05-14T00:10:00.000Z",
              maxAttempts: 3,
              providerKey: "email_smtp",
            },
          },
        }),
        {
          headers: {
            "content-type": "application/json",
            "x-request-id": "passport_channels_3",
          },
          status: 200,
        }
      );
    });

    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me",
      fetch: fetchImpl,
    });

    const response = await client.channels.startVerification({
      channelType: "email",
      destination: "Person@Example.com",
      isDefault: true,
      label: "Personal email",
    });

    expect(response.requestId).toBe("passport_channels_3");
    expect(response.channel.verificationStatus).toBe("pending");
    expect(response.challenge).toEqual(
      expect.objectContaining({
        challengeId: "challenge_1",
        providerKey: "email_smtp",
        setupCode: null,
        setupInstructions: null,
      })
    );
  });

  it("starts telegram channel verification with setup guidance", async () => {
    const fetchImpl = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          data: {
            channel: {
              channelId: "channel_telegram",
              channelType: "telegram",
              createdAt: "2026-05-14T00:00:00.000Z",
              displayHint: "Telegram ending rson",
              isDefault: false,
              label: "Telegram",
              providerKey: "telegram_bot",
              status: "active",
              updatedAt: "2026-05-14T00:00:00.000Z",
              verificationStatus: "pending",
              verifiedAt: null,
            },
            challenge: {
              challengeId: "challenge_telegram",
              expiresAt: "2026-05-14T00:10:00.000Z",
              maxAttempts: 3,
              providerKey: "telegram_bot",
              setupCode: "1234",
              setupInstructions:
                "Send this one-time code to the Cubid Telegram bot to finish connecting Telegram.",
            },
          },
        }),
        {
          headers: {
            "content-type": "application/json",
          },
          status: 200,
        }
      );
    });

    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me",
      fetch: fetchImpl,
    });

    const response = await client.channels.startVerification({
      channelType: "telegram",
      destination: "@cubid_person",
      label: "Telegram",
    });

    expect(response.channel.channelType).toBe("telegram");
    expect(response.challenge.setupCode).toBe("1234");
    expect(response.challenge.setupInstructions).toMatch(/Cubid Telegram bot/);
  });

  it("completes channel verification and returns the verified channel summary", async () => {
    const fetchImpl = vi.fn(async (_input: string | URL | Request, init?: RequestInit) => {
      expect(JSON.parse(String(init?.body))).toEqual({
        challengeId: "challenge_1",
        code: "1234",
      });

      return new Response(
        JSON.stringify({
          data: {
            channelId: "channel_1",
            channelType: "email",
            createdAt: "2026-05-14T00:00:00.000Z",
            displayHint: "p***@example.com",
            isDefault: true,
            label: "Personal email",
            providerKey: "email_smtp",
            status: "active",
            updatedAt: "2026-05-14T00:02:00.000Z",
            verificationStatus: "verified",
            verifiedAt: "2026-05-14T00:02:00.000Z",
          },
        }),
        {
          headers: {
            "content-type": "application/json",
            "x-request-id": "passport_channels_4",
          },
          status: 200,
        }
      );
    });

    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me",
      fetch: fetchImpl,
    });

    const response = await client.channels.completeVerification({
      challengeId: "challenge_1",
      code: "1234",
    });

    expect(response.requestId).toBe("passport_channels_4");
    expect(response.channel.verificationStatus).toBe("verified");
  });

  it("lists global notification preferences without exposing raw channel destinations", async () => {
    const fetchImpl = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          data: [
            {
              categoryKey: "SECURITY",
              channelId: "channel_1",
              createdAt: "2026-05-14T00:00:00.000Z",
              dappId: null,
              mutedUntil: null,
              pausedUntil: null,
              preferenceId: "preference_1",
              priorityFloor: "HIGH",
              status: "active",
              updatedAt: "2026-05-14T00:02:00.000Z",
            },
          ],
        }),
        {
          headers: {
            "content-type": "application/json",
            "x-request-id": "passport_preferences_1",
          },
          status: 200,
        }
      );
    });

    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me",
      fetch: fetchImpl,
    });

    const response = await client.preferences.list();

    expect(response.requestId).toBe("passport_preferences_1");
    expect(response.preferences).toEqual([
      expect.objectContaining({
        categoryKey: "SECURITY",
        channelId: "channel_1",
        preferenceId: "preference_1",
        priorityFloor: "HIGH",
        status: "active",
      }),
    ]);
  });

  it("updates a global notification preference with public metadata only", async () => {
    const fetchImpl = vi.fn(async (_input: string | URL | Request, init?: RequestInit) => {
      expect(JSON.parse(String(init?.body))).toEqual({
        categoryKey: "WORKFLOW",
        channelId: null,
        priorityFloor: "LOW",
        status: "revoked",
      });

      return new Response(
        JSON.stringify({
          data: {
            categoryKey: "WORKFLOW",
            channelId: null,
            createdAt: "2026-05-14T00:00:00.000Z",
            dappId: null,
            mutedUntil: null,
            pausedUntil: null,
            preferenceId: "preference_2",
            priorityFloor: "LOW",
            status: "revoked",
            updatedAt: "2026-05-14T00:03:00.000Z",
          },
        }),
        {
          headers: {
            "content-type": "application/json",
            "x-request-id": "passport_preferences_2",
          },
          status: 200,
        }
      );
    });

    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me",
      fetch: fetchImpl,
    });

    const response = await client.preferences.update({
      categoryKey: "WORKFLOW",
      channelId: null,
      priorityFloor: "LOW",
      status: "revoked",
    });

    expect(response.requestId).toBe("passport_preferences_2");
    expect(response.preference).toEqual(
      expect.objectContaining({
        categoryKey: "WORKFLOW",
        channelId: null,
        priorityFloor: "LOW",
        status: "revoked",
      })
    );
  });

  it("requires at least one mutable field when updating a preference", async () => {
    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me",
    });

    await expect(
      client.preferences.update({
        categoryKey: "SECURITY",
      })
    ).rejects.toThrow(CubidCommsError);
  });

  it("models Allow Page grants as category permission state, not channel access", () => {
    expect(CUBID_NOTIFICATION_CATEGORIES).toEqual([
      "SECURITY",
      "TRANSACTIONAL",
      "WORKFLOW",
    ]);

    const grants = [
      {
        categoryKey: "SECURITY",
        dappId: "42",
        dappName: "Notify Test App",
        dappUserUuid: "dapp_user_1",
        expiresAt: null,
        grantId: "grant_1",
        grantedAt: "2026-05-15T00:00:00.000Z",
        raw: {},
        revokedAt: null,
        status: "active",
        updatedAt: "2026-05-15T00:00:00.000Z",
      },
      {
        categoryKey: "WORKFLOW",
        dappId: "42",
        dappName: "Notify Test App",
        dappUserUuid: "dapp_user_1",
        expiresAt: null,
        grantId: "grant_2",
        grantedAt: "2026-05-15T00:00:00.000Z",
        raw: {},
        revokedAt: "2026-05-15T00:02:00.000Z",
        status: "revoked",
        updatedAt: "2026-05-15T00:02:00.000Z",
      },
    ] as const;

    expect(getActiveNotificationCategoryGrants(grants)).toEqual(["SECURITY"]);
    expect(hasNotificationCategoryGrant(grants, "SECURITY")).toBe(true);
    expect(hasNotificationCategoryGrant(grants, "WORKFLOW")).toBe(false);
  });
});
