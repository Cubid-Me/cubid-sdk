import { startTransition, useId, useState } from "react";
import type { ComponentPropsWithoutRef, FormEvent } from "react";

import type { CubidWeb2Client, PhoneOtpVerifyResult, StampPersistenceRequest } from "@cubid/web2";

import { useOptionalCubidWeb2Client } from "./context";

type PhoneOtpStartResult = Awaited<ReturnType<CubidWeb2Client["phone"]["startOtp"]>>;

export interface PhoneOtpFormProps extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
  client?: CubidWeb2Client;
  defaultPhone?: string;
  onError?: (error: unknown) => void;
  onStarted?: (result: PhoneOtpStartResult) => Promise<void> | void;
  onVerified?: (result: PhoneOtpVerifyResult) => Promise<void> | void;
  persistStamp?: StampPersistenceRequest;
}

export function PhoneOtpForm({
  client,
  defaultPhone = "",
  onError,
  onStarted,
  onVerified,
  persistStamp,
  ...formProps
}: PhoneOtpFormProps) {
  const contextualClient = useOptionalCubidWeb2Client();
  const resolvedClient = client ?? contextualClient ?? undefined;
  const phoneId = useId();
  const otpId = useId();
  const [phone, setPhone] = useState(defaultPhone);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"collect" | "verified" | "verify">("collect");
  const [isBusy, setIsBusy] = useState(false);
  const [status, setStatus] = useState<string>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsBusy(true);

    try {
      if (!resolvedClient) {
        throw new Error("PhoneOtpForm requires a CubidWeb2Client prop or provider.");
      }

      if (step === "collect") {
        const result = await resolvedClient.phone.startOtp({
          onStarted,
          phone
        });

        startTransition(() => {
          setStatus(result.status ? "Code sent. Enter the OTP to finish verification." : "Unable to send code.");
          setStep("verify");
        });
      } else if (step === "verify") {
        const result = await resolvedClient.phone.verifyOtp({
          onVerified,
          otp,
          persistStamp,
          phone
        });

        startTransition(() => {
          setStatus(result.isVerified ? "Phone verified." : "Verification failed. Try again.");
          setStep(result.isVerified ? "verified" : "verify");
        });
      }
    } catch (error) {
      startTransition(() => {
        setStatus("Something went wrong while processing the phone flow.");
      });
      onError?.(error);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <form {...formProps} onSubmit={handleSubmit}>
      <label htmlFor={phoneId}>Phone</label>
      <input
        autoComplete="tel"
        disabled={isBusy || step === "verified"}
        id={phoneId}
        onChange={(event) => setPhone(event.target.value)}
        type="tel"
        value={phone}
      />
      {step !== "collect" ? (
        <>
          <label htmlFor={otpId}>OTP</label>
          <input
            autoComplete="one-time-code"
            disabled={isBusy || step === "verified"}
            id={otpId}
            inputMode="numeric"
            onChange={(event) => setOtp(event.target.value)}
            value={otp}
          />
        </>
      ) : null}
      <div>
        <button disabled={isBusy} type="submit">
          {step === "collect" ? "Send phone code" : step === "verify" ? "Verify phone code" : "Phone verified"}
        </button>
        {step !== "collect" ? (
          <button
            disabled={isBusy}
            onClick={() => {
              startTransition(() => {
                setOtp("");
                setStatus(undefined);
                setStep("collect");
              });
            }}
            type="button"
          >
            Reset
          </button>
        ) : null}
      </div>
      <p aria-live="polite">{status}</p>
    </form>
  );
}
