import { startTransition, useId, useState } from "react";
import type { ComponentPropsWithoutRef, FormEvent } from "react";

import type {
  CubidWeb2Client,
  EmailOtpVerifyResult,
  StampPersistenceRequest
} from "@cubid/browser";

import { useCubidLook, useOptionalCubidWeb2Client } from "./context";
import type { CubidLook } from "./theme";

type EmailOtpStartResult = Awaited<ReturnType<CubidWeb2Client["email"]["startOtp"]>>;

export interface EmailOtpFormProps extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit">, CubidLook {
  client?: CubidWeb2Client;
  defaultEmail?: string;
  onError?: (error: unknown) => void;
  onStarted?: (result: EmailOtpStartResult) => Promise<void> | void;
  onVerified?: (result: EmailOtpVerifyResult) => Promise<void> | void;
  persistStamp?: StampPersistenceRequest;
}

export function EmailOtpForm({
  classNames,
  client,
  defaultEmail = "",
  labels: ownLabels,
  onError,
  onStarted,
  onVerified,
  persistStamp,
  styles: ownStyles,
  theme,
  ...formProps
}: EmailOtpFormProps) {
  const contextualClient = useOptionalCubidWeb2Client();
  const resolvedClient = client ?? contextualClient ?? undefined;
  const { labels, slot } = useCubidLook({ classNames, labels: ownLabels, styles: ownStyles, theme });
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
          setStatus(result.sent ? labels.codeSent : labels.codeNotSent);
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
          setStatus(result.isVerified ? `${labels.emailVerified}.` : labels.codeWrong);
          setStep(result.isVerified ? "verified" : "verify");
        });
      }
    } catch (error) {
      startTransition(() => {
        setStatus(labels.emailFailed);
      });
      onError?.(error);
    } finally {
      setIsBusy(false);
    }
  }

  // The form element carries the container slot; the caller's own className and style come after it.
  const container = slot("container");

  return (
    <form
      {...formProps}
      className={[container.className, formProps.className].filter(Boolean).join(" ") || undefined}
      onSubmit={handleSubmit}
      style={{ ...container.style, ...formProps.style }}
    >
      <div {...slot("field")}>
        <label {...slot("label")} htmlFor={emailId}>
          {labels.email}
        </label>
        <input
          {...slot("input")}
          autoComplete="email"
          disabled={isBusy || step === "verified"}
          id={emailId}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          value={email}
        />
      </div>
      {step !== "collect" ? (
        <div {...slot("field")}>
          <label {...slot("label")} htmlFor={otpId}>
            {labels.code}
          </label>
          <input
            {...slot("input")}
            autoComplete="one-time-code"
            disabled={isBusy || step === "verified"}
            id={otpId}
            inputMode="numeric"
            onChange={(event) => setOtp(event.target.value)}
            value={otp}
          />
        </div>
      ) : null}
      <div {...slot("actions")}>
        <button {...slot("button")} disabled={isBusy} type="submit">
          {step === "collect" ? labels.sendEmailCode : step === "verify" ? labels.verifyEmailCode : labels.emailVerified}
        </button>
        {step !== "collect" ? (
          <button
            {...slot("buttonSecondary")}
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
            {labels.reset}
          </button>
        ) : null}
      </div>
      <p {...slot("status")} aria-live="polite">
        {status}
      </p>
    </form>
  );
}
