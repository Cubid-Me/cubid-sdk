import { startTransition, useId, useState } from "react";
import type { ComponentPropsWithoutRef, FormEvent } from "react";

import type {
  CubidWeb2Client,
  PhoneOtpVerifyResult,
  StampPersistenceRequest
} from "@cubid/browser";

import { useCubidLook, useOptionalCubidWeb2Client } from "./context";
import type { CubidLook } from "./theme";

type PhoneOtpStartResult = Awaited<ReturnType<CubidWeb2Client["phone"]["startOtp"]>>;

export interface PhoneOtpFormProps extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit">, CubidLook {
  client?: CubidWeb2Client;
  defaultPhone?: string;
  onError?: (error: unknown) => void;
  onStarted?: (result: PhoneOtpStartResult) => Promise<void> | void;
  onVerified?: (result: PhoneOtpVerifyResult) => Promise<void> | void;
  persistStamp?: StampPersistenceRequest;
}

export function PhoneOtpForm({
  classNames,
  client,
  defaultPhone = "",
  labels: ownLabels,
  onError,
  onStarted,
  onVerified,
  persistStamp,
  styles: ownStyles,
  theme,
  ...formProps
}: PhoneOtpFormProps) {
  const contextualClient = useOptionalCubidWeb2Client();
  const resolvedClient = client ?? contextualClient ?? undefined;
  const { labels, slot } = useCubidLook({ classNames, labels: ownLabels, styles: ownStyles, theme });
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
          setStatus(result.status ? labels.codeSent : labels.codeNotSent);
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
          setStatus(result.isVerified ? `${labels.phoneVerified}.` : labels.codeWrong);
          setStep(result.isVerified ? "verified" : "verify");
        });
      }
    } catch (error) {
      startTransition(() => {
        setStatus(labels.phoneFailed);
      });
      onError?.(error);
    } finally {
      setIsBusy(false);
    }
  }

  const container = slot("container");

  return (
    <form
      {...formProps}
      className={[container.className, formProps.className].filter(Boolean).join(" ") || undefined}
      onSubmit={handleSubmit}
      style={{ ...container.style, ...formProps.style }}
    >
      <div {...slot("field")}>
        <label {...slot("label")} htmlFor={phoneId}>
          {labels.phone}
        </label>
        <input
          {...slot("input")}
          autoComplete="tel"
          disabled={isBusy || step === "verified"}
          id={phoneId}
          onChange={(event) => setPhone(event.target.value)}
          type="tel"
          value={phone}
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
          {step === "collect" ? labels.sendPhoneCode : step === "verify" ? labels.verifyPhoneCode : labels.phoneVerified}
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
