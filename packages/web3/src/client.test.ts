import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidWeb3Client } from "./client";

describe("@cubid/web3", () => {
  it("keeps wallet adapter logic behind the adapter boundary and only persists via @cubid/core", async () => {
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
      connect: vi.fn(async () => ({ address: "0xabc", chainId: 1, chainType: "evm" })),
      id: "rainbowkit",
      toStampData: vi.fn((connection) => ({
        address: connection.address,
        identity: connection.address,
        uniquevalue: connection.address
      })),
      verify: vi.fn(async () => ({ isVerified: true, metadata: { signature: "0xsigned" } }))
    };

    const client = createCubidWeb3Client(apiClient as never);
    const connection = await client.connectWallet({ adapter });
    const result = await client.verifyWallet({
      adapter,
      connection,
      pageId: 4,
      persistStamp: true,
      stampType: "evm",
      userId: "user-1"
    });

    expect(adapter.connect).toHaveBeenCalled();
    expect(adapter.verify).toHaveBeenCalledWith({ address: "0xabc", chainId: 1, chainType: "evm" });
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 4,
      stampData: {
        address: "0xabc",
        identity: "0xabc",
        uniquevalue: "0xabc"
      },
      stampType: "evm",
      userId: "user-1"
    });
    expect(result.verification.isVerified).toBe(true);
    expect(result.persistedStamp?.success).toBe(true);
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

    const client = createCubidWeb3Client(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "0xdef" }),
          id: "adapter"
        },
        connection: { address: "0xdef" },
        persistStamp: true
      })
    ).rejects.toThrow("Persisting a wallet stamp requires both userId and pageId.");
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

    const client = createCubidWeb3Client(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "0xdef" }),
          id: "adapter"
        },
        connection: { address: "0xdef" },
        pageId: 4,
        persistStamp: true,
        userId: "user-1"
      })
    ).rejects.toThrow("Persisting a wallet stamp requires an adapter.verify implementation.");
  });

  it("does not declare any web2 dependency edge", () => {
    const packageJson = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
      dependencies?: Record<string, string>;
    };

    expect(packageJson.dependencies?.["@cubid/web2"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/web2-react"]).toBeUndefined();
  });
});
