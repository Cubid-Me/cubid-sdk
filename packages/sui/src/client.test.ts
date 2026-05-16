import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidSuiClient } from "./client";
import {
  getCubidSuiCapabilities,
  hasCubidSuiCapability,
  normalizeSuiAddress
} from "./internal";

describe("@cubid/sui", () => {
  it("normalizes Sui addresses and only persists through @cubid/core", async () => {
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
        address: "0xABCD1234",
        capabilities: {
          sessionKeys: {
            available: false,
            metadata: { reason: "not_enabled" }
          }
        },
        chainType: "sui",
        networkId: "testnet",
        publicKey: "sui-public-key"
      })),
      id: "sui-wallet",
      verify: vi.fn(async () => ({
        isVerified: true,
        metadata: { signature: "sui-signature" }
      }))
    };

    const client = createCubidSuiClient(apiClient as never);
    const connection = await client.connectWallet({ adapter });
    const result = await client.verifyWallet({
      adapter,
      connection,
      pageId: 4,
      persistStamp: true,
      stampType: "sui",
      userId: "user-1"
    });

    expect(connection.address).toBe("0xabcd1234");
    expect(adapter.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        address: "0xabcd1234",
        chainType: "sui",
        networkId: "testnet",
        publicKey: "sui-public-key"
      })
    );
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 4,
      stampData: {
        address: "0xabcd1234",
        chainType: "sui",
        identity: "0xabcd1234",
        networkId: "testnet",
        publicKey: "sui-public-key",
        uniquevalue: "0xabcd1234",
        verification: { signature: "sui-signature" },
        walletType: "sui"
      },
      stampType: "sui",
      userId: "user-1"
    });
    expect(getCubidSuiCapabilities(connection)).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "not_enabled" }
      }
    });
    expect(hasCubidSuiCapability(connection, "sessionKeys")).toBe(false);
    expect(result.capabilities).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "not_enabled" }
      }
    });
    expect(result.verification.isVerified).toBe(true);
    expect(result.persistedStamp?.success).toBe(true);
  });

  it("normalizes direct address helpers to lowercase", () => {
    expect(normalizeSuiAddress("0xABcdEF")).toBe("0xabcdef");
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

    const client = createCubidSuiClient(apiClient as never);
    const verify = vi.fn(async () => ({ isVerified: true }));

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "0xabc" }),
          id: "adapter",
          verify
        },
        connection: { address: "0xabc" },
        persistStamp: true
      })
    ).rejects.toThrow("Persisting a wallet stamp requires both userId and pageId.");
    expect(verify).not.toHaveBeenCalled();
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

    const client = createCubidSuiClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "0xabc" }),
          id: "adapter"
        },
        connection: { address: "0xabc" },
        pageId: 4,
        persistStamp: true,
        userId: "user-1"
      })
    ).rejects.toThrow("Persisting a wallet stamp requires an adapter.verify implementation.");
  });

  it("uses the default unverified shape when the adapter does not verify", async () => {
    const apiClient = {
      addStamp: vi.fn(async () => ({ success: true })),
      config: {
        apiKey: "api-key",
        baseUrl: "https://passport.cubid.me/api/v2",
        dappId: "dapp-id",
        fetch
      }
    } as const;

    const client = createCubidSuiClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({ address: "0xABCD1234" }),
        id: "adapter"
      },
      connection: { address: "0xABCD1234" },
      stampType: "sui"
    });

    expect(result.connection.address).toBe("0xabcd1234");
    expect(result.verification).toEqual({ isVerified: false });
    expect(result.persistedStamp).toBeUndefined();
    expect(result.stampData).toEqual({
      address: "0xabcd1234",
      chainType: undefined,
      identity: "0xabcd1234",
      networkId: undefined,
      publicKey: undefined,
      uniquevalue: "0xabcd1234",
      verification: undefined,
      walletType: "sui"
    });
  });

  it("does not declare any web2 dependency edge", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")
    ) as {
      dependencies?: Record<string, string>;
    };

    expect(packageJson.dependencies?.["@cubid/web2"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/web2-react"]).toBeUndefined();
  });
});
