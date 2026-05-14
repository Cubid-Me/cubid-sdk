import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidNearClient } from "./client";
import { getCubidNearCapabilities, hasCubidNearCapability } from "./internal";

describe("@cubid/near", () => {
  it("keeps near adapter logic behind the adapter boundary and only persists via @cubid/core", async () => {
    const apiClient = {
      addStamp: vi.fn(async () => ({ success: true })),
      config: {
        apiKey: "api-key",
        baseUrl: "https://passport.cubid.me/api/v2",
        dappId: "dapp-id",
        fetch
      }
    } as const;

    const adapter = {
      connect: vi.fn(async () => ({
        accountId: "builder.near",
        address: "builder.near",
        capabilities: {
          sessionKeys: {
            available: false,
            metadata: { reason: "wallet_managed" }
          }
        },
        chainType: "near",
        networkId: "mainnet"
      })),
      id: "meteor-wallet",
      verify: vi.fn(async () => ({
        isVerified: true,
        metadata: { signature: "near-signature" }
      }))
    };

    const client = createCubidNearClient(apiClient as never);
    const connection = await client.connectWallet({ adapter });
    const result = await client.verifyWallet({
      adapter,
      connection,
      pageId: 4,
      persistStamp: true,
      stampType: "near-wallet",
      userId: "user-1"
    });

    expect(adapter.connect).toHaveBeenCalled();
    expect(adapter.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        accountId: "builder.near",
        chainType: "near",
        networkId: "mainnet"
      })
    );
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 4,
      stampData: {
        accountId: "builder.near",
        address: "builder.near",
        chainType: "near",
        identity: "builder.near",
        networkId: "mainnet",
        uniquevalue: "builder.near",
        verification: { signature: "near-signature" },
        walletType: "near-wallet"
      },
      stampType: "near-wallet",
      userId: "user-1"
    });
    expect(getCubidNearCapabilities(connection)).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "wallet_managed" }
      }
    });
    expect(hasCubidNearCapability(connection, "sessionKeys")).toBe(false);
    expect(result.capabilities).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "wallet_managed" }
      }
    });
    expect(result.verification.isVerified).toBe(true);
    expect(result.persistedStamp?.success).toBe(true);
  });

  it("defaults to accountId when an address is not exposed by the wallet", async () => {
    const apiClient = {
      addStamp: vi.fn(async () => ({ success: true })),
      config: {
        apiKey: "api-key",
        baseUrl: "https://passport.cubid.me/api/v2",
        dappId: "dapp-id",
        fetch
      }
    } as const;

    const client = createCubidNearClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({ accountId: "wallet.near" }),
        id: "wallet"
      },
      connection: { accountId: "wallet.near" },
      stampType: "near"
    });

    expect(result.stampData).toEqual({
      accountId: "wallet.near",
      address: "wallet.near",
      chainType: undefined,
      identity: "wallet.near",
      networkId: undefined,
      uniquevalue: "wallet.near",
      verification: undefined,
      walletType: "near"
    });
  });

  it("throws when stamp persistence is requested without enough context", async () => {
    const apiClient = {
      addStamp: vi.fn(async () => ({ success: true })),
      config: {
        apiKey: "api-key",
        baseUrl: "https://passport.cubid.me/api/v2",
        dappId: "dapp-id",
        fetch
      }
    } as const;

    const client = createCubidNearClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ accountId: "wallet.near" }),
          id: "adapter",
          verify: async () => ({ isVerified: true })
        },
        connection: { accountId: "wallet.near" },
        persistStamp: true
      })
    ).rejects.toThrow("Persisting a wallet stamp requires both userId and pageId.");
  });

  it("does not require persistence context when verification stays unverified", async () => {
    const apiClient = {
      addStamp: vi.fn(async () => ({ success: true })),
      config: {
        apiKey: "api-key",
        baseUrl: "https://passport.cubid.me/api/v2",
        dappId: "dapp-id",
        fetch
      }
    } as const;

    const client = createCubidNearClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({ accountId: "wallet.near" }),
        id: "adapter",
        verify: async () => ({ isVerified: false })
      },
      connection: { accountId: "wallet.near" },
      persistStamp: true
    });

    expect(apiClient.addStamp).not.toHaveBeenCalled();
    expect(result.persistedStamp).toBeUndefined();
    expect(result.verification.isVerified).toBe(false);
  });

  it("throws when stamp persistence is requested without adapter verification", async () => {
    const apiClient = {
      addStamp: vi.fn(async () => ({ success: true })),
      config: {
        apiKey: "api-key",
        baseUrl: "https://passport.cubid.me/api/v2",
        dappId: "dapp-id",
        fetch
      }
    } as const;

    const client = createCubidNearClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ accountId: "wallet.near" }),
          id: "adapter"
        },
        connection: { accountId: "wallet.near" },
        pageId: 4,
        persistStamp: true,
        userId: "user-1"
      })
    ).rejects.toThrow("Persisting a wallet stamp requires an adapter.verify implementation.");
  });

  it("does not declare browser, react, or wagmi dependency edges", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")
    ) as {
      dependencies?: Record<string, string>;
    };

    expect(packageJson.dependencies?.["@cubid/browser"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/react"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/web2"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/web2-react"]).toBeUndefined();
    expect(packageJson.dependencies?.["wagmi"]).toBeUndefined();
  });
});
