import { startTransition, useId, useState } from "react";
import type { ComponentPropsWithoutRef, FormEvent } from "react";

import type {
  CubidWeb2Client,
  EmailOtpVerifyResult,
  StampPersistenceRequest
} from "@cubid/browser";

import { useOptionalCubidWeb2Client } from "./context";

type EmailOtpStartResult = Awaited<ReturnType<CubidWeb2Client["email"]["startOtp"]>>;

export interface EmailOtpFormProps extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
  client?: CubidWeb2Client;
  defaultEmail?: string;
  onError?: (error: unknown) => void;
  onStarted?: (result: EmailOtpStartResult) => Promise<void> | void;
  onVerified?: (result: EmailOtpVerifyResult) => Promise<void> | void;
  persistStamp?: StampPersistenceRequest;
}

export function EmailOtpForm({
  client,
  defaultEmail = "",
  onError,
  onStarted,
  onVerified,
  persistStamp,
  ...formProps
}: EmailOtpFormProps) {
  const contextualClient = useOptionalCubidWeb2Client();
  const resolvedClient = client ?? contextualClient ?? undefined;
  const emailId = useId();
  const otpId = useId();
  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"collect" | "verified" | "verify">("collect");
  const [isBusy, setIsBusy] = useState(false);
  const [status, setStatus] = useState<string>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsBusy(true);

    try {
      if (!resolvedClient) {
        throw new Error("EmailOtpForm requires a CubidWeb2Client prop or provider.");
      }

      if (step === "collect") {
        const result = await resolvedClient.email.startOtp({
          email,
          onStarted
        });

        startTransition(() => {
          setStatus(result.sent ? "Code sent. Enter the OTP to finish verification." : "Unable to send code.");
          setStep(result.sent ? "verify" : "collect");
        });
      } else if (step === "verify") {
        const result = await resolvedClient.email.verifyOtp({
          email,
          onVerified,
          otp,
          persistStamp
        });

        startTransition(() => {
          setStatus(result.isVerified ? "Email verified." : "Verification failed. Try again.");
          setStep(result.isVerified ? "verified" : "verify");
        });
      }
    } catch (error) {
      startTransition(() => {
        setStatus("Something went wrong while processing the email flow.");
      });
      onError?.(error);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <form {...formProps} onSubmit={handleSubmit}>
      <label htmlFor={emailId}>Email</label>
      <input
        autoComplete="email"
        disabled={isBusy || step === "verified"}
        id={emailId}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        value={email}
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
          {step === "collect" ? "Send email code" : step === "verify" ? "Verify email code" : "Email verified"}
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
