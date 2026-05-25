// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CubidRecoveryLaunchButton } from "@cubid/wallet-recovery-react";

describe("@cubid/acceptance wallet-recovery-react consumer flow", () => {
  it("renders the hosted recovery launch button from the public React entrypoint", async () => {
    const user = userEvent.setup();
    const onLaunched = vi.fn();
    const openWindow = vi.fn();

    render(
      <CubidRecoveryLaunchButton
        onLaunched={onLaunched}
        openWindow={openWindow}
        passportOrigin="https://passport.cubid.me"
        recoverySessionId="rw_release_123"
      />
    );

    await user.click(screen.getByRole("button", { name: "Recover wallet with Cubid" }));

    const expectedUrl =
      "https://passport.cubid.me/recovery/wallet?recovery_session_id=rw_release_123";
    expect(openWindow).toHaveBeenCalledWith(expectedUrl);
    expect(onLaunched).toHaveBeenCalledWith(expectedUrl);
  });
});
