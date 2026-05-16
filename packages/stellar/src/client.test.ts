import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidStellarClient } from "./client";
import {
  getCubidStellarCapabilities,
  hasCubidStellarCapability
} from "./internal";

describe("@cubid/stellar", () => {
  it("keeps Stellar adapter logic behind the adapter boundary and only persists through @cubid/core", async () => {
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
        address: "GASTELLARTESTADDRESS1111111111111111111111111111111111",
        capabilities: {
          sessionKeys: {
            available: false,
            metadata: { reason: "not_enabled" }
          }
        },
        chainType: "stellar",
        federationAddress: "alice*example.com",
        networkPassphrase: "Test SDF Network ; September 2015",
        publicKey: "GASTELLARTESTADDRESS1111111111111111111111111111111111"
      })),
      id: "stellar-wallet",
      verify: vi.fn(async () => ({
        isVerified: true,
        metadata: { signature: "stellar-signature" }
      }))
    };

    const client = createCubidStellarClient(apiClient as never);
    const connection = await client.connectWallet({ adapter });
    const result = await client.verifyWallet({
      adapter,
      connection,
      pageId: 4,
      persistStamp: true,
      stampType: "stellar",
      userId: "user-1"
    });

    expect(adapter.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        address: "GASTELLARTESTADDRESS1111111111111111111111111111111111",
        chainType: "stellar",
        federationAddress: "alice*example.com",
        networkPassphrase: "Test SDF Network ; September 2015",
        publicKey: "GASTELLARTESTADDRESS1111111111111111111111111111111111"
      })
    );
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 4,
      stampData: {
        address: "GASTELLARTESTADDRESS1111111111111111111111111111111111",
        chainType: "stellar",
        federationAddress: "alice*example.com",
        identity: "GASTELLARTESTADDRESS1111111111111111111111111111111111",
        networkPassphrase: "Test SDF Network ; September 2015",
        publicKey: "GASTELLARTESTADDRESS1111111111111111111111111111111111",
        uniquevalue: "GASTELLARTESTADDRESS1111111111111111111111111111111111",
        verification: { signature: "stellar-signature" },
        walletType: "stellar"
      },
      stampType: "stellar",
      userId: "user-1"
    });
    expect(getCubidStellarCapabilities(connection)).toEqual({
      sessionKeys: {
        available: false,
        metadata: { reason: "not_enabled" }
      }
    });
    expect(hasCubidStellarCapability(connection, "sessionKeys")).toBe(false);
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

    const client = createCubidStellarClient(apiClient as never);
    const verify = vi.fn(async () => ({ isVerified: true }));

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "stellar1examplewalletaddress000000000000000" }),
          id: "adapter",
          verify
        },
        connection: { address: "GASTELLARTESTADDRESS1111111111111111111111111111111111" },
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

    const client = createCubidStellarClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({ address: "GASTELLARTESTADDRESS1111111111111111111111111111111111" }),
          id: "adapter"
        },
        connection: { address: "GASTELLARTESTADDRESS1111111111111111111111111111111111" },
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

    const client = createCubidStellarClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({ address: "GASTELLARTESTADDRESS1111111111111111111111111111111111" }),
        id: "adapter"
      },
      connection: { address: "GASTELLARTESTADDRESS1111111111111111111111111111111111" },
      stampType: "stellar"
    });

    expect(result.connection.address).toBe(
      "GASTELLARTESTADDRESS1111111111111111111111111111111111"
    );
    expect(result.verification).toEqual({ isVerified: false });
    expect(result.persistedStamp).toBeUndefined();
    expect(result.stampData).toEqual({
      address: "GASTELLARTESTADDRESS1111111111111111111111111111111111",
      chainType: undefined,
      federationAddress: undefined,
      identity: "GASTELLARTESTADDRESS1111111111111111111111111111111111",
      networkPassphrase: undefined,
      publicKey: undefined,
      uniquevalue: "GASTELLARTESTADDRESS1111111111111111111111111111111111",
      verification: undefined,
      walletType: "stellar"
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
