import { useState } from "react";
import { View } from "react-native";

import type { CubidWeb2Client, EmailOtpVerifyResult, StampPersistenceRequest } from "@cubid/browser";

import { useOptionalCubidClient } from "./context";
import { Action, Field, Status } from "./primitives";
import { useCubidLook } from "./theme";
import type { CubidLook } from "./theme";

type EmailOtpStartResult = Awaited<ReturnType<CubidWeb2Client["email"]["startOtp"]>>;

export interface EmailOtpFormProps extends CubidLook {
  client?: CubidWeb2Client;
  defaultEmail?: string;
  onError?: (error: unknown) => void;
  onStarted?: (result: EmailOtpStartResult) => Promise<void> | void;
  onVerified?: (result: EmailOtpVerifyResult) => Promise<void> | void;
  /** Persist the verified email as a stamp on the account, so the next sign-in carries it. */
  persistStamp?: StampPersistenceRequest;
}

/** Address, one-time code, verified: the same flow as `@cubid/react`'s, drawn with native views. */
export function EmailOtpForm({ client, defaultEmail = "", labels: ownLabels, onError, onStarted, onVerified, persistStamp, styles: ownStyles, theme }: EmailOtpFormProps) {
  const contextualClient = useOptionalCubidClient();
  const resolvedClient = client ?? contextualClient ?? undefined;
  const { labels, styles: look } = useCubidLook({ labels: ownLabels, styles: ownStyles, theme });
  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"collect" | "verified" | "verify">("collect");
  const [isBusy, setIsBusy] = useState(false);
  const [status, setStatus] = useState<string>();

  async function submit() {
    setIsBusy(true);

    try {
      if (!resolvedClient) {
        throw new Error("EmailOtpForm requires a CubidWeb2Client prop or a CubidProvider.");
      }

      if (step === "collect") {
        const result = await resolvedClient.email.startOtp({ email: email.trim(), onStarted });
        setStatus(result.sent ? labels.codeSent : labels.codeNotSent);
        setStep(result.sent ? "verify" : "collect");
      } else if (step === "verify") {
        const result = await resolvedClient.email.verifyOtp({ email: email.trim(), onVerified, otp: otp.trim(), persistStamp });
        setStatus(result.isVerified ? `${labels.emailVerified}.` : labels.codeWrong);
        setStep(result.isVerified ? "verified" : "verify");
      }
    } catch (error) {
      setStatus(labels.emailFailed);
      onError?.(error);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <View style={look.container}>
      <Field
        autoCapitalize="none"
        autoComplete="email"
        editable={!isBusy && step !== "verified"}
        keyboardType="email-address"
        label={labels.email}
        look={look}
        onChangeText={setEmail}
        textContentType="emailAddress"
        value={email}
      />
      {step !== "collect" ? (
        <Field
          autoComplete="one-time-code"
          editable={!isBusy && step !== "verified"}
          keyboardType="number-pad"
          label={labels.code}
          look={look}
          onChangeText={setOtp}
          textContentType="oneTimeCode"
          value={otp}
        />
      ) : null}
      <View style={look.actions}>
        <Action
          disabled={isBusy || step === "verified" || !email.trim() || (step === "verify" && !otp.trim())}
          label={step === "collect" ? labels.sendEmailCode : step === "verify" ? labels.verifyEmailCode : labels.emailVerified}
          look={look}
          onPress={() => void submit()}
        />
        {step === "verify" ? (
          <Action
            disabled={isBusy}
            label={labels.startOver}
            look={look}
            onPress={() => {
              setOtp("");
              setStatus(undefined);
              setStep("collect");
            }}
            secondary
          />
        ) : null}
      </View>
      <Status look={look}>{status}</Status>
    </View>
  );
}
