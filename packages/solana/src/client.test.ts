import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidSolanaClient } from "./client";
import {
  getCubidSolanaCapabilities,
  hasCubidSolanaCapability
} from "./internal";

describe("@cubid/solana", () => {
  it("keeps solana adapter logic behind the adapter boundary and only persists via @cubid/core", async () => {
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
        address: "So1anaAddress111111111111111111111111111111111",
        capabilities: {
          gasSponsorship: {
            available: false,
            metadata: { reason: "wallet_pays_fees" }
          }
        },
        chainType: "solana",
        cluster: "devnet",
        publicKey: "So1anaPubkey1111111111111111111111111111111111"
      })),
      id: "phantom",
      verify: vi.fn(async () => ({
        isVerified: true,
        metadata: { signature: "solana-signature" }
      }))
    };

    const client = createCubidSolanaClient(apiClient as never);
    const connection = await client.connectWallet({ adapter });
    const result = await client.verifyWallet({
      adapter,
      connection,
      pageId: 4,
      persistStamp: true,
      stampType: "solana",
      userId: "user-1"
    });

    expect(adapter.connect).toHaveBeenCalled();
    expect(adapter.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        chainType: "solana",
        cluster: "devnet",
        publicKey: "So1anaPubkey1111111111111111111111111111111111"
      })
    );
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 4,
      stampData: {
        address: "So1anaAddress111111111111111111111111111111111",
        chainType: "solana",
        cluster: "devnet",
        identity: "So1anaPubkey1111111111111111111111111111111111",
        publicKey: "So1anaPubkey1111111111111111111111111111111111",
        uniquevalue: "So1anaPubkey1111111111111111111111111111111111",
        verification: { signature: "solana-signature" },
        walletType: "solana"
      },
      stampType: "solana",
      userId: "user-1"
    });
    expect(getCubidSolanaCapabilities(connection)).toEqual({
      gasSponsorship: {
        available: false,
        metadata: { reason: "wallet_pays_fees" }
      }
    });
    expect(hasCubidSolanaCapability(connection, "gasSponsorship")).toBe(false);
    expect(result.capabilities).toEqual({
      gasSponsorship: {
        available: false,
        metadata: { reason: "wallet_pays_fees" }
      }
    });
    expect(result.verification.isVerified).toBe(true);
    expect(result.persistedStamp?.success).toBe(true);
  });

  it("defaults to publicKey when a separate address is not exposed by the wallet", async () => {
    const apiClient = {
      addStamp: vi.fn(async () => ({ success: true })),
      config: {
        apiKey: "api-key",
        baseUrl: "https://passport.cubid.me/api/v2",
        dappId: "dapp-id",
        fetch
      }
    } as const;

    const client = createCubidSolanaClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({
          publicKey: "So1anaPubkey1111111111111111111111111111111111"
        }),
        id: "wallet"
      },
      connection: {
        publicKey: "So1anaPubkey1111111111111111111111111111111111"
      },
      stampType: "solana"
    });

    expect(result.stampData).toEqual({
      address: "So1anaPubkey1111111111111111111111111111111111",
      chainType: undefined,
      cluster: undefined,
      identity: "So1anaPubkey1111111111111111111111111111111111",
      publicKey: "So1anaPubkey1111111111111111111111111111111111",
      uniquevalue: "So1anaPubkey1111111111111111111111111111111111",
      verification: undefined,
      walletType: "solana"
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

    const client = createCubidSolanaClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({
            publicKey: "So1anaPubkey1111111111111111111111111111111111"
          }),
          id: "adapter",
          verify: async () => ({ isVerified: true })
        },
        connection: {
          publicKey: "So1anaPubkey1111111111111111111111111111111111"
        },
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

    const client = createCubidSolanaClient(apiClient as never);

    const result = await client.verifyWallet({
      adapter: {
        connect: async () => ({
          publicKey: "So1anaPubkey1111111111111111111111111111111111"
        }),
        id: "adapter",
        verify: async () => ({ isVerified: false })
      },
      connection: {
        publicKey: "So1anaPubkey1111111111111111111111111111111111"
      },
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

    const client = createCubidSolanaClient(apiClient as never);

    await expect(
      client.verifyWallet({
        adapter: {
          connect: async () => ({
            publicKey: "So1anaPubkey1111111111111111111111111111111111"
          }),
          id: "adapter"
        },
        connection: {
          publicKey: "So1anaPubkey1111111111111111111111111111111111"
        },
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
