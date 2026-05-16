import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidAptosClient } from "./client";
import {
  getCubidAptosCapabilities,
  hasCubidAptosCapability
} from "./internal";

describe("@cubid/aptos", () => {
  it("keeps Aptos adapter logic behind the adapter boundary and only persists through @cubid/core", async () => {
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
        address: "aptos1examplewalletaddress000000000000000",
        authenticationKey: "0xaptosauthenticationkey0000000000000000",
        capabilities: {
          sessionKeys: {
            available: false,
            metadata: { reason: "not_enabled" }
          }
        },
        chainId: "aptos-testnet",
        chainType: "aptos",
        networkId: "testnet",
        publicKey: "0xaptospublickey000000000000000000000000"
      })),
      id: "aptos-wallet",
      verify: vi.fn(async () => ({
        isVerified: true,
        metadata: { signature: "aptos-signature" }
      }))
    };

    const client = createCubidAptosClient(apiClient as never);
    const connection = await client.connectWallet({ adapter });
    const result = await client.verifyWallet({
      adapter,
      connection,
      pageId: 4,
      persistStamp: true,
      stampType: "aptos",
      userId: "user-1"
    });

    expect(adapter.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        address: "aptos1examplewalletaddress000000000000000",
        authenticationKey: "0xaptosauthenticationkey0000000000000000",
        chainId: "aptos-testnet",
        chainType: "aptos",
        networkId: "testnet",
        publicKey: "0xaptospublickey000000000000000000000000"
      })
    );
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 4,
      stampData: {
        address: "aptos1examplewalletaddress000000000000000",
        authenticationKey: "0xaptosauthenticationkey0000000000000000",
        chainId: "aptos-testnet",
        chainType: "aptos",
        identity: "aptos1examplewalletaddress000000000000000",
        networkId: "testnet",
        publicKey: "0xaptospublickey000000000000000000000000",
        uniquevalue: "aptos1examplewalletaddress000000000000000",
        verification: { signature: "aptos-signature" },
        walletType: "aptos"
      },
      stampType: "aptos",
      userId: "user-1"
    });
    expect(getCubidAptosCapabilities(connection)).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "not_enabled" }
      }
    });
    expect(hasCubidAptosCapability(connection, "sessionKeys")).toBe(false);
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

    const client = createCubidAptosClient(apiClient as never);
    const verify = vi.fn(async () => ({ isVerified: true }));

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "aptos1examplewalletaddress000000000000000" }),
          id: "adapter",
          verify
        },
        connection: { address: "aptos1examplewalletaddress000000000000000" },
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

    const client = createCubidAptosClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "aptos1examplewalletaddress000000000000000" }),
          id: "adapter"
        },
        connection: { address: "aptos1examplewalletaddress000000000000000" },
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

    const client = createCubidAptosClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({ address: "aptos1examplewalletaddress000000000000000" }),
        id: "adapter"
      },
      connection: { address: "aptos1examplewalletaddress000000000000000" },
      stampType: "aptos"
    });

    expect(result.connection.address).toBe("aptos1examplewalletaddress000000000000000");
    expect(result.verification).toEqual({ isVerified: false });
    expect(result.persistedStamp).toBeUndefined();
    expect(result.stampData).toEqual({
      address: "aptos1examplewalletaddress000000000000000",
      authenticationKey: undefined,
      chainId: undefined,
      chainType: undefined,
      identity: "aptos1examplewalletaddress000000000000000",
      networkId: undefined,
      publicKey: undefined,
      uniquevalue: "aptos1examplewalletaddress000000000000000",
      verification: undefined,
      walletType: "aptos"
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
