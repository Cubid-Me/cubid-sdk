import { describe, expect, it } from "vitest";

import * as browser from "@cubid/browser";

describe("@cubid/acceptance browser consumer flow", () => {
  it("builds a hosted verification URL from the public browser entrypoint", () => {
    expect(
      browser.buildHostedVerificationUrl({
        dappId: "42",
        passportOrigin: "https://passport.cubid.me/",
        stampToRender: "address",
        userId: "app-user-123"
      })
    ).toBe("https://passport.cubid.me/verify?dapp_id=42&user_id=app-user-123&stamp_type=address");
  });

  it("opens a Paytag hosted action URL without dapp API key input", () => {
    const opened: string[] = [];

    expect("openPayToHostedAction" in browser).toBe(false);

    browser.openHostedPaytagAction("/pay-to/actions/complete?action_token=pta_act_123", {
      opener: (url) => {
        opened.push(url);
        return null;
      }
    });

    expect(opened).toEqual([
      "https://passport.cubid.me/pay-to/actions/complete?action_token=pta_act_123"
    ]);
    expect(() =>
      browser.openHostedPaytagAction("/pay-to/actions/complete?action_token=pta_act_123&apikey=secret", {
        opener: () => null
      })
    ).toThrow("Paytag hosted action URLs must not contain API-key-like query parameters.");
    expect(() =>
      browser.openHostedPaytagAction(
        "https://attacker.example/pay-to/actions/complete?action_token=pta_act_123",
        {
          opener: () => null
        }
      )
    ).toThrow("Paytag hosted action URLs must use the Cubid Passport origin.");
  });
});
