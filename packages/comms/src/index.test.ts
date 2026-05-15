import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidCommsClient, CubidCommsError } from "./index";

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
});
