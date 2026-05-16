import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidStarknetClient } from "./client";
import {
  getCubidStarknetCapabilities,
  hasCubidStarknetCapability
} from "./internal";

describe("@cubid/starknet", () => {
  it("keeps Starknet adapter logic behind the adapter boundary and only persists through @cubid/core", async () => {
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
        address: "0x0123starknetaccountaddress",
        capabilities: {
          sessionKeys: {
            available: false,
            metadata: { reason: "not_enabled" }
          }
        },
        chainId: "SN_SEPOLIA",
        chainType: "starknet",
        classHash: "0x0456starknetclasshash",
        publicKey: "0x03starknetpublickey"
      })),
      id: "starknet-wallet",
      verify: vi.fn(async () => ({
        isVerified: true,
        metadata: { signature: "starknet-signature" }
      }))
    };

    const client = createCubidStarknetClient(apiClient as never);
    const connection = await client.connectWallet({ adapter });
    const result = await client.verifyWallet({
      adapter,
      connection,
      pageId: 4,
      persistStamp: true,
      stampType: "starknet",
      userId: "user-1"
    });

    expect(adapter.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        address: "0x0123starknetaccountaddress",
        chainId: "SN_SEPOLIA",
        chainType: "starknet",
        classHash: "0x0456starknetclasshash",
        publicKey: "0x03starknetpublickey"
      })
    );
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 4,
      stampData: {
        address: "0x0123starknetaccountaddress",
        chainId: "SN_SEPOLIA",
        chainType: "starknet",
        classHash: "0x0456starknetclasshash",
        identity: "0x0123starknetaccountaddress",
        publicKey: "0x03starknetpublickey",
        uniquevalue: "0x0123starknetaccountaddress",
        verification: { signature: "starknet-signature" },
        walletType: "starknet"
      },
      stampType: "starknet",
      userId: "user-1"
    });
    expect(getCubidStarknetCapabilities(connection)).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "not_enabled" }
      }
    });
    expect(hasCubidStarknetCapability(connection, "sessionKeys")).toBe(false);
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

    const client = createCubidStarknetClient(apiClient as never);
    const verify = vi.fn(async () => ({ isVerified: true }));

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "0x0123starknetaccountaddress" }),
          id: "adapter",
          verify
        },
        connection: { address: "0x0123starknetaccountaddress" },
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

    const client = createCubidStarknetClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "0x0123starknetaccountaddress" }),
          id: "adapter"
        },
        connection: { address: "0x0123starknetaccountaddress" },
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

    const client = createCubidStarknetClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({ address: "0x0123starknetaccountaddress" }),
        id: "adapter"
      },
      connection: { address: "0x0123starknetaccountaddress" },
      stampType: "starknet"
    });

    expect(result.connection.address).toBe("0x0123starknetaccountaddress");
    expect(result.verification).toEqual({ isVerified: false });
    expect(result.persistedStamp).toBeUndefined();
    expect(result.stampData).toEqual({
      address: "0x0123starknetaccountaddress",
      chainId: undefined,
      chainType: undefined,
      classHash: undefined,
      identity: "0x0123starknetaccountaddress",
      publicKey: undefined,
      uniquevalue: "0x0123starknetaccountaddress",
      verification: undefined,
      walletType: "starknet"
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
