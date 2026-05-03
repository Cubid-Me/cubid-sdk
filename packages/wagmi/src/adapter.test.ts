import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { createCubidWagmiAdapter } from "./adapter";

describe("@cubid/wagmi adapter", () => {
  it("builds an evm adapter from wagmi-style connect and sign functions", async () => {
    const connectAsync = vi.fn(async () => ({
      accounts: ["0xabc"],
      chainId: 1,
      connector: { id: "injected", name: "Injected" }
    }));
    const signMessageAsync = vi.fn(async () => "0xsigned");

    const adapter = createCubidWagmiAdapter({
      connectAsync,
      connectors: [{ id: "injected", name: "Injected" }],
      signMessageAsync
    });

    const connection = await adapter.connect();
    const verification = await adapter.verify?.(connection);
    const stampData = adapter.toStampData?.(connection, verification ?? { isVerified: false });

    expect(connectAsync).toHaveBeenCalledWith({
      chainId: undefined,
      connector: { id: "injected", name: "Injected" }
    });
    expect(signMessageAsync).toHaveBeenCalledWith({
      message: "Verify wallet ownership for Cubid: 0xabc"
    });
    expect(connection).toMatchObject({
      address: "0xabc",
      chainId: 1,
      chainType: "evm",
      connectorId: "injected"
    });
    expect(verification).toMatchObject({
      isVerified: true,
      metadata: {
        connectorId: "injected",
        connectorName: "Injected",
        message: "Verify wallet ownership for Cubid: 0xabc",
        signature: "0xsigned"
      }
    });
    expect(stampData).toMatchObject({
      address: "0xabc",
      chainId: 1,
      connectorId: "injected",
      walletType: "evm"
    });
  });

  it("throws a helpful error when no wagmi connectors are available", async () => {
    const adapter = createCubidWagmiAdapter({
      connectAsync: async () => ({ accounts: ["0xabc"] }),
      connectors: [],
      signMessageAsync: async () => "0xsigned"
    });

    await expect(adapter.connect()).rejects.toThrow(
      "No wagmi connectors are available. Configure WagmiProvider with at least one connector."
    );
  });

  it("does not declare legacy web2 dependency edges", () => {
    const packageJson = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
      dependencies?: Record<string, string>;
    };

    expect(packageJson.dependencies?.["@cubid/web2"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/web2-react"]).toBeUndefined();
  });
});
