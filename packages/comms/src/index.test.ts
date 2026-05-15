import fs from "node:fs";

import { describe, expect, it } from "vitest";

import { createCubidCommsClient, CubidCommsError } from "./index";

describe("@cubid/comms", () => {
  it("creates a signed-in Passport-user client boundary without dapp api key assumptions", () => {
    const client = createCubidCommsClient({
      accessToken: "firebase-bearer-token",
      baseUrl: "https://id.cubid.me/",
      headers: {
        "x-trace-id": "trace-123",
      },
    });

    expect(client.config.baseUrl).toBe("https://id.cubid.me");
    expect(client.config.accessToken).toBe("firebase-bearer-token");
    expect(client.config.headers.get("x-trace-id")).toBe("trace-123");
  });

  it("rejects empty access tokens and invalid base urls", () => {
    expect(() =>
      createCubidCommsClient({
        accessToken: "   ",
        baseUrl: "https://id.cubid.me",
      })
    ).toThrow(CubidCommsError);

    expect(() =>
      createCubidCommsClient({
        accessToken: "token",
        baseUrl: "not a url",
      })
    ).toThrow(CubidCommsError);
  });

  it("does not declare core, browser, react, or auth-react dependency edges", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")
    ) as {
      dependencies?: Record<string, string>;
    };

    expect(packageJson.dependencies?.["@cubid/core"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/browser"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/react"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/auth-react"]).toBeUndefined();
  });
});
