import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidBitcoinClient } from "./client";
import {
  getCubidBitcoinCapabilities,
  hasCubidBitcoinCapability
} from "./internal";

describe("@cubid/bitcoin", () => {
  it("keeps Bitcoin adapter logic behind the adapter boundary and only persists through @cubid/core", async () => {
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
        address: "bc1qexamplebitcoinaddress0000000000000000",
        capabilities: {
          sessionKeys: {
            available: false,
            metadata: { reason: "not_enabled" }
          }
        },
        chainType: "bitcoin",
        networkId: "testnet",
        publicKey: "03bitcoinpublickey",
        scriptType: "p2wpkh"
      })),
      id: "bitcoin-wallet",
      verify: vi.fn(async () => ({
        isVerified: true,
        metadata: { signature: "bitcoin-signature" }
      }))
    };

    const client = createCubidBitcoinClient(apiClient as never);
    const connection = await client.connectWallet({ adapter });
    const result = await client.verifyWallet({
      adapter,
      connection,
      pageId: 4,
      persistStamp: true,
      stampType: "bitcoin",
      userId: "user-1"
    });

    expect(adapter.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        address: "bc1qexamplebitcoinaddress0000000000000000",
        chainType: "bitcoin",
        networkId: "testnet",
        publicKey: "03bitcoinpublickey",
        scriptType: "p2wpkh"
      })
    );
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 4,
      stampData: {
        address: "bc1qexamplebitcoinaddress0000000000000000",
        chainType: "bitcoin",
        identity: "bc1qexamplebitcoinaddress0000000000000000",
        networkId: "testnet",
        publicKey: "03bitcoinpublickey",
        scriptType: "p2wpkh",
        uniquevalue: "bc1qexamplebitcoinaddress0000000000000000",
        verification: { signature: "bitcoin-signature" },
        walletType: "bitcoin"
      },
      stampType: "bitcoin",
      userId: "user-1"
    });
    expect(getCubidBitcoinCapabilities(connection)).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "not_enabled" }
      }
    });
    expect(hasCubidBitcoinCapability(connection, "sessionKeys")).toBe(false);
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

    const client = createCubidBitcoinClient(apiClient as never);
    const verify = vi.fn(async () => ({ isVerified: true }));

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "bc1qexamplebitcoinaddress0000000000000000" }),
          id: "adapter",
          verify
        },
        connection: { address: "bc1qexamplebitcoinaddress0000000000000000" },
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

    const client = createCubidBitcoinClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "bc1qexamplebitcoinaddress0000000000000000" }),
          id: "adapter"
        },
        connection: { address: "bc1qexamplebitcoinaddress0000000000000000" },
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

    const client = createCubidBitcoinClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({ address: "bc1qexamplebitcoinaddress0000000000000000" }),
        id: "adapter"
      },
      connection: { address: "bc1qexamplebitcoinaddress0000000000000000" },
      stampType: "bitcoin"
    });

    expect(result.connection.address).toBe("bc1qexamplebitcoinaddress0000000000000000");
    expect(result.verification).toEqual({ isVerified: false });
    expect(result.persistedStamp).toBeUndefined();
    expect(result.stampData).toEqual({
      address: "bc1qexamplebitcoinaddress0000000000000000",
      chainType: undefined,
      identity: "bc1qexamplebitcoinaddress0000000000000000",
      networkId: undefined,
      publicKey: undefined,
      scriptType: undefined,
      uniquevalue: "bc1qexamplebitcoinaddress0000000000000000",
      verification: undefined,
      walletType: "bitcoin"
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
