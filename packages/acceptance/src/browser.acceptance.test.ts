import { describe, expect, it } from "vitest";

import { buildHostedVerificationUrl } from "@cubid/browser";

describe("@cubid/acceptance browser consumer flow", () => {
  it("builds a hosted verification URL from the public browser entrypoint", () => {
    expect(
      buildHostedVerificationUrl({
        dappId: "42",
        passportOrigin: "https://passport.cubid.me/",
        stampToRender: "address",
        userId: "app-user-123"
      })
    ).toBe("https://passport.cubid.me/verify?dapp_id=42&user_id=app-user-123&stamp_type=address");
  });
});
