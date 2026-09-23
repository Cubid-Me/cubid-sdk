import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// React Native's host components, as plain DOM elements: enough to render the
// kit in jsdom and drive it with events. Nothing DOM-specific is under test;
// the components must never import react-dom themselves.
// React Native's host components as plain DOM elements (see react-native.mock.tsx):
// enough to render the kit in jsdom and drive it with events. Nothing
// DOM-specific is under test; the components never import react-dom.
vi.mock("react-native", () => import("./react-native.mock"));

const { CubidProfileDetails } = await import("./CubidProfileDetails");
const { CubidProvider } = await import("./context");
const { EmailOtpForm } = await import("./EmailOtpForm");

function createClient() {
  return {
    email: {
      startOtp: vi.fn(async () => ({ raw: { sent: true }, sent: true })),
      verifyOtp: vi.fn(async ({ email, onVerified }: { email: string; onVerified?: (r: unknown) => unknown }) => {
        const result = { email, isVerified: true };
        await onVerified?.(result);
        return result;
      })
    },
    phone: {
      startOtp: vi.fn(async () => ({ raw: { status: "pending" }, status: "pending" })),
      verifyOtp: vi.fn(async ({ onVerified, phone }: { phone: string; onVerified?: (r: unknown) => unknown }) => {
        const result = { isVerified: true, phone, raw: {}, status: "approved" };
        await onVerified?.(result);
        return result;
      })
    }
  };
}

describe("@cubid/react-native", () => {
  it("runs the email one-time-code flow with native views only", async () => {
    const client = createClient();
    const onVerified = vi.fn();
    render(
      <CubidProvider client={client as never}>
        <EmailOtpForm onVerified={onVerified} />
      </CubidProvider>
    );
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "pat@example.com" } });
    fireEvent.click(screen.getByText("Send email code"));
    await waitFor(() => expect(client.email.startOtp).toHaveBeenCalledWith(expect.objectContaining({ email: "pat@example.com" })));
    fireEvent.change(await screen.findByLabelText("Code"), { target: { value: "123456" } });
    fireEvent.click(screen.getByText("Verify email code"));
    await waitFor(() => expect(onVerified).toHaveBeenCalled());
    expect(client.email.verifyOtp).toHaveBeenCalledWith(expect.objectContaining({ email: "pat@example.com", otp: "123456" }));
    expect(await screen.findByText("Email verified.")).toBeTruthy();
    expect(document.querySelector("form")).toBeNull();
  });

  it("asks only for what is missing, in order, and hands back one result", async () => {
    const client = createClient();
    const onComplete = vi.fn();
    const readPosition = vi.fn(async () => ({ lat: 59.334591, lng: 18.06324 }));
    render(
      <CubidProfileDetails
        client={client as never}
        known={{ email: "pat@example.com", emailVerified: true }}
        onComplete={onComplete}
        readPosition={readPosition}
        request={{ email: "required", location: "rough", name: "required", phone: "optional", picture: "skip" }}
      />
    );
    // Email is known and verified: the first step is the phone, which may be skipped.
    expect(screen.getByText("Step 1 of 3")).toBeTruthy();
    expect(screen.getByLabelText("Phone")).toBeTruthy();
    fireEvent.click(screen.getByText("Skip"));
    // Name is required: no skip.
    expect(screen.getByText("Step 2 of 3")).toBeTruthy();
    expect(screen.queryByText("Skip")).toBeNull();
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Pat" } });
    fireEvent.click(screen.getByText("Continue"));
    // Location: rough, so the copy says no precise permission, and the reader is asked for "rough".
    expect(screen.getByText(/rough location/)).toBeTruthy();
    fireEvent.click(screen.getByText("Share location"));
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
    expect(readPosition).toHaveBeenCalledWith("rough");
    expect(onComplete.mock.calls[0]?.[0]).toEqual({
      email: { value: "pat@example.com", verified: true },
      phone: null,
      name: "Pat",
      picture: null,
      location: { granularity: "rough", lat: 59.3, lng: 18.1, precisionMetres: 11_000 },
      skipped: ["phone"]
    });
  });

  it("completes at once when nothing is missing, and never mentions location when it is not wanted", async () => {
    const onComplete = vi.fn();
    render(<CubidProfileDetails client={createClient() as never} known={{ name: "Pat" }} onComplete={onComplete} request={{ location: "none", name: "required" }} />);
    await waitFor(() => expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ name: "Pat", location: null })));
    expect(screen.queryByText(/location/)).toBeNull();
  });
});

describe("@cubid/react-native look", () => {
  it("draws from theme tokens, lets slot styles override, and takes labels from the provider or the component", async () => {
    const { CubidThemeProvider } = await import("./theme");
    render(
      <CubidThemeProvider labels={{ sendEmailCode: "Skicka kod" }} styles={{ button: { paddingVertical: 20 } }} theme={{ accent: "#123456", radius: 4 }}>
        <EmailOtpForm client={createClient() as never} labels={{ email: "E-post" }} styles={{ input: { borderColor: "#abcdef" } }} />
      </CubidThemeProvider>
    );
    const button = screen.getByText("Skicka kod").parentElement as HTMLElement & { __style?: unknown };
    // The host mock keeps the style array it was given: theme defaults first, then the provider's and the component's slots.
    const styleOf = (el: HTMLElement) => JSON.parse(el.getAttribute("data-style") ?? "[]") as unknown[];
    expect(JSON.stringify(styleOf(button))).toContain('"backgroundColor":"#123456"');
    expect(JSON.stringify(styleOf(button))).toContain('"borderRadius":4');
    expect(JSON.stringify(styleOf(button))).toContain('"paddingVertical":20');
    expect(JSON.stringify(styleOf(screen.getByLabelText("E-post")))).toContain('"borderColor":"#abcdef"');
  });
});
