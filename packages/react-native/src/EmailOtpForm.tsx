import { useState } from "react";
import { View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

import type { CubidWeb2Client, EmailOtpVerifyResult, StampPersistenceRequest } from "@cubid/browser";

import { useOptionalCubidClient } from "./context";
import { Action, Field, Status, styles } from "./primitives";

type EmailOtpStartResult = Awaited<ReturnType<CubidWeb2Client["email"]["startOtp"]>>;

export interface EmailOtpFormProps {
  client?: CubidWeb2Client;
  defaultEmail?: string;
  onError?: (error: unknown) => void;
  onStarted?: (result: EmailOtpStartResult) => Promise<void> | void;
  onVerified?: (result: EmailOtpVerifyResult) => Promise<void> | void;
  /** Persist the verified email as a stamp on the account, so the next sign-in carries it. */
  persistStamp?: StampPersistenceRequest;
  style?: StyleProp<ViewStyle>;
}

/** Address, one-time code, verified: the same flow as `@cubid/react`'s, drawn with native views. */
export function EmailOtpForm({ client, defaultEmail = "", onError, onStarted, onVerified, persistStamp, style }: EmailOtpFormProps) {
  const contextualClient = useOptionalCubidClient();
  const resolvedClient = client ?? contextualClient ?? undefined;
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
        setStatus(result.sent ? "Code sent. Enter it to finish." : "Unable to send a code.");
        setStep(result.sent ? "verify" : "collect");
      } else if (step === "verify") {
        const result = await resolvedClient.email.verifyOtp({ email: email.trim(), onVerified, otp: otp.trim(), persistStamp });
        setStatus(result.isVerified ? "Email verified." : "That code did not match. Try again.");
        setStep(result.isVerified ? "verified" : "verify");
      }
    } catch (error) {
      setStatus("Something went wrong with the email step.");
      onError?.(error);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <View style={[styles.stack, style]}>
      <Field
        autoCapitalize="none"
        autoComplete="email"
        editable={!isBusy && step !== "verified"}
        keyboardType="email-address"
        label="Email"
        onChangeText={setEmail}
        textContentType="emailAddress"
        value={email}
      />
      {step !== "collect" ? (
        <Field
          autoComplete="one-time-code"
          editable={!isBusy && step !== "verified"}
          keyboardType="number-pad"
          label="Code"
          onChangeText={setOtp}
          textContentType="oneTimeCode"
          value={otp}
        />
      ) : null}
      <View style={styles.row}>
        <Action
          disabled={isBusy || step === "verified" || !email.trim() || (step === "verify" && !otp.trim())}
          label={step === "collect" ? "Send email code" : step === "verify" ? "Verify email code" : "Email verified"}
          onPress={() => void submit()}
        />
        {step === "verify" ? (
          <Action
            disabled={isBusy}
            label="Start over"
            onPress={() => {
              setOtp("");
              setStatus(undefined);
              setStep("collect");
            }}
            secondary
          />
        ) : null}
      </View>
      <Status>{status}</Status>
    </View>
  );
}
