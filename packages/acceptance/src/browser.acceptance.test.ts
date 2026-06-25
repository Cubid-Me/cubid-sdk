import { describe, expect, it } from "vitest";

import { buildHostedVerificationUrl, openPayToHostedAction } from "@cubid/browser";

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

  it("opens a Pay-To hosted action URL without dapp API key input", () => {
    const opened: string[] = [];

    openPayToHostedAction("/pay-to/actions/complete?action_token=pta_act_123", {
      opener: (url) => {
        opened.push(url);
        return null;
      }
    });

    expect(opened).toEqual(["/pay-to/actions/complete?action_token=pta_act_123"]);
    expect(() =>
      openPayToHostedAction("/pay-to/actions/complete?action_token=pta_act_123&apikey=secret", {
        opener: () => null
      })
    ).toThrow("Pay-To hosted action URLs must not contain dapp API keys.");
  });
});
