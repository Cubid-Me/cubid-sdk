import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidCosmosClient } from "./client";
import {
  getCubidCosmosCapabilities,
  hasCubidCosmosCapability
} from "./internal";

describe("@cubid/cosmos", () => {
  it("keeps Cosmos adapter logic behind the adapter boundary and only persists through @cubid/core", async () => {
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
        address: "cosmos1examplewalletaddress000000000000000",
        bech32Prefix: "cosmos",
        capabilities: {
          sessionKeys: {
            available: false,
            metadata: { reason: "not_enabled" }
          }
        },
        chainId: "cosmoshub-4",
        chainType: "cosmos",
        publicKey: "A0EC6E4F4C8B1F11C0SMOSPUBKEY"
      })),
      id: "cosmos-wallet",
      verify: vi.fn(async () => ({
        isVerified: true,
        metadata: { signature: "cosmos-signature" }
      }))
    };

    const client = createCubidCosmosClient(apiClient as never);
    const connection = await client.connectWallet({ adapter });
    const result = await client.verifyWallet({
      adapter,
      connection,
      pageId: 4,
      persistStamp: true,
      stampType: "cosmos",
      userId: "user-1"
    });

    expect(adapter.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        address: "cosmos1examplewalletaddress000000000000000",
        bech32Prefix: "cosmos",
        chainId: "cosmoshub-4",
        chainType: "cosmos",
        publicKey: "A0EC6E4F4C8B1F11C0SMOSPUBKEY"
      })
    );
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 4,
      stampData: {
        address: "cosmos1examplewalletaddress000000000000000",
        bech32Prefix: "cosmos",
        chainId: "cosmoshub-4",
        chainType: "cosmos",
        identity: "cosmos1examplewalletaddress000000000000000",
        publicKey: "A0EC6E4F4C8B1F11C0SMOSPUBKEY",
        uniquevalue: "cosmos1examplewalletaddress000000000000000",
        verification: { signature: "cosmos-signature" },
        walletType: "cosmos"
      },
      stampType: "cosmos",
      userId: "user-1"
    });
    expect(getCubidCosmosCapabilities(connection)).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "not_enabled" }
      }
    });
    expect(hasCubidCosmosCapability(connection, "sessionKeys")).toBe(false);
    expect(result.capabilities).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "not_enabled" }
      }
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

    const client = createCubidCosmosClient(apiClient as never);
    const verify = vi.fn(async () => ({ isVerified: true }));

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "cosmos1examplewalletaddress000000000000000" }),
          id: "adapter",
          verify
        },
        connection: { address: "cosmos1examplewalletaddress000000000000000" },
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

    const client = createCubidCosmosClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "cosmos1examplewalletaddress000000000000000" }),
          id: "adapter"
        },
        connection: { address: "cosmos1examplewalletaddress000000000000000" },
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

    const client = createCubidCosmosClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({ address: "cosmos1examplewalletaddress000000000000000" }),
        id: "adapter"
      },
      connection: { address: "cosmos1examplewalletaddress000000000000000" },
      stampType: "cosmos"
    });

    expect(result.connection.address).toBe("cosmos1examplewalletaddress000000000000000");
    expect(result.verification).toEqual({ isVerified: false });
    expect(result.persistedStamp).toBeUndefined();
    expect(result.stampData).toEqual({
      address: "cosmos1examplewalletaddress000000000000000",
      bech32Prefix: undefined,
      chainId: undefined,
      chainType: undefined,
      identity: "cosmos1examplewalletaddress000000000000000",
      publicKey: undefined,
      uniquevalue: "cosmos1examplewalletaddress000000000000000",
      verification: undefined,
      walletType: "cosmos"
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
