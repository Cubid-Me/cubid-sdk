import { useState } from "react";
import { View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

import type { CubidWeb2Client, PhoneOtpVerifyResult, StampPersistenceRequest } from "@cubid/browser";

import { useOptionalCubidClient } from "./context";
import { Action, Field, Status, styles } from "./primitives";

type PhoneOtpStartResult = Awaited<ReturnType<CubidWeb2Client["phone"]["startOtp"]>>;

export interface PhoneOtpFormProps {
  client?: CubidWeb2Client;
  defaultPhone?: string;
  onError?: (error: unknown) => void;
  onStarted?: (result: PhoneOtpStartResult) => Promise<void> | void;
  onVerified?: (result: PhoneOtpVerifyResult) => Promise<void> | void;
  /** Persist the verified phone as a stamp on the account, so the next sign-in carries it. */
  persistStamp?: StampPersistenceRequest;
  style?: StyleProp<ViewStyle>;
}

/** Number, one-time code, verified — with native views. */
export function PhoneOtpForm({ client, defaultPhone = "", onError, onStarted, onVerified, persistStamp, style }: PhoneOtpFormProps) {
  const contextualClient = useOptionalCubidClient();
  const resolvedClient = client ?? contextualClient ?? undefined;
  const [phone, setPhone] = useState(defaultPhone);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"collect" | "verified" | "verify">("collect");
  const [isBusy, setIsBusy] = useState(false);
  const [status, setStatus] = useState<string>();

  async function submit() {
    setIsBusy(true);

    try {
      if (!resolvedClient) {
        throw new Error("PhoneOtpForm requires a CubidWeb2Client prop or a CubidProvider.");
      }

      if (step === "collect") {
        const result = await resolvedClient.phone.startOtp({ onStarted, phone: phone.trim() });
        setStatus(result.status ?? "Code sent. Enter it to finish.");
        setStep("verify");
      } else if (step === "verify") {
        const result = await resolvedClient.phone.verifyOtp({ onVerified, otp: otp.trim(), persistStamp, phone: phone.trim() });
        setStatus(result.isVerified ? "Phone verified." : "That code did not match. Try again.");
        setStep(result.isVerified ? "verified" : "verify");
      }
    } catch (error) {
      setStatus("Something went wrong with the phone step.");
      onError?.(error);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <View style={[styles.stack, style]}>
      <Field
        autoComplete="tel"
        editable={!isBusy && step !== "verified"}
        keyboardType="phone-pad"
        label="Phone"
        onChangeText={setPhone}
        textContentType="telephoneNumber"
        value={phone}
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
          disabled={isBusy || step === "verified" || !phone.trim() || (step === "verify" && !otp.trim())}
          label={step === "collect" ? "Send phone code" : step === "verify" ? "Verify phone code" : "Phone verified"}
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
