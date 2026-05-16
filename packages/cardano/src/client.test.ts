import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidCardanoClient } from "./client";
import {
  getCubidCardanoCapabilities,
  hasCubidCardanoCapability
} from "./internal";

describe("@cubid/cardano", () => {
  it("keeps Cardano adapter logic behind the adapter boundary and only persists through @cubid/core", async () => {
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
        address: "addr_test1qpzxycardanoaddress",
        capabilities: {
          sessionKeys: {
            available: false,
            metadata: { reason: "not_enabled" }
          }
        },
        chainType: "cardano",
        networkId: "preprod",
        stakeAddress: "stake_test1uqcardanostakeaddress"
      })),
      id: "cardano-wallet",
      verify: vi.fn(async () => ({
        isVerified: true,
        metadata: { signature: "cardano-signature" }
      }))
    };

    const client = createCubidCardanoClient(apiClient as never);
    const connection = await client.connectWallet({ adapter });
    const result = await client.verifyWallet({
      adapter,
      connection,
      pageId: 4,
      persistStamp: true,
      stampType: "cardano",
      userId: "user-1"
    });

    expect(adapter.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        address: "addr_test1qpzxycardanoaddress",
        chainType: "cardano",
        networkId: "preprod",
        stakeAddress: "stake_test1uqcardanostakeaddress"
      })
    );
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 4,
      stampData: {
        address: "addr_test1qpzxycardanoaddress",
        chainType: "cardano",
        identity: "addr_test1qpzxycardanoaddress",
        networkId: "preprod",
        stakeAddress: "stake_test1uqcardanostakeaddress",
        uniquevalue: "addr_test1qpzxycardanoaddress",
        verification: { signature: "cardano-signature" },
        walletType: "cardano"
      },
      stampType: "cardano",
      userId: "user-1"
    });
    expect(getCubidCardanoCapabilities(connection)).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "not_enabled" }
      }
    });
    expect(hasCubidCardanoCapability(connection, "sessionKeys")).toBe(false);
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

    const client = createCubidCardanoClient(apiClient as never);
    const verify = vi.fn(async () => ({ isVerified: true }));

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "addr_test1qpzxycardanoaddress" }),
          id: "adapter",
          verify
        },
        connection: { address: "addr_test1qpzxycardanoaddress" },
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

    const client = createCubidCardanoClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "addr_test1qpzxycardanoaddress" }),
          id: "adapter"
        },
        connection: { address: "addr_test1qpzxycardanoaddress" },
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

    const client = createCubidCardanoClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({ address: "addr_test1qpzxycardanoaddress" }),
        id: "adapter"
      },
      connection: { address: "addr_test1qpzxycardanoaddress" },
      stampType: "cardano"
    });

    expect(result.connection.address).toBe("addr_test1qpzxycardanoaddress");
    expect(result.verification).toEqual({ isVerified: false });
    expect(result.persistedStamp).toBeUndefined();
    expect(result.stampData).toEqual({
      address: "addr_test1qpzxycardanoaddress",
      chainType: undefined,
      identity: "addr_test1qpzxycardanoaddress",
      networkId: undefined,
      stakeAddress: undefined,
      uniquevalue: "addr_test1qpzxycardanoaddress",
      verification: undefined,
      walletType: "cardano"
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
