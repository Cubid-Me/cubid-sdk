import { useState } from "react";
import { View } from "react-native";

import type { CubidWeb2Client, PhoneOtpVerifyResult, StampPersistenceRequest } from "@cubid/browser";

import { useOptionalCubidClient } from "./context";
import { Action, Field, Status } from "./primitives";
import { useCubidLook } from "./theme";
import type { CubidLook } from "./theme";

type PhoneOtpStartResult = Awaited<ReturnType<CubidWeb2Client["phone"]["startOtp"]>>;

export interface PhoneOtpFormProps extends CubidLook {
  client?: CubidWeb2Client;
  defaultPhone?: string;
  onError?: (error: unknown) => void;
  onStarted?: (result: PhoneOtpStartResult) => Promise<void> | void;
  onVerified?: (result: PhoneOtpVerifyResult) => Promise<void> | void;
  /** Persist the verified phone as a stamp on the account, so the next sign-in carries it. */
  persistStamp?: StampPersistenceRequest;
}

/** Number, one-time code, verified — with native views. */
export function PhoneOtpForm({ client, defaultPhone = "", labels: ownLabels, onError, onStarted, onVerified, persistStamp, styles: ownStyles, theme }: PhoneOtpFormProps) {
  const contextualClient = useOptionalCubidClient();
  const resolvedClient = client ?? contextualClient ?? undefined;
  const { labels, styles: look } = useCubidLook({ labels: ownLabels, styles: ownStyles, theme });
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
        setStatus(result.status ?? labels.codeSent);
        setStep("verify");
      } else if (step === "verify") {
        const result = await resolvedClient.phone.verifyOtp({ onVerified, otp: otp.trim(), persistStamp, phone: phone.trim() });
        setStatus(result.isVerified ? `${labels.phoneVerified}.` : labels.codeWrong);
        setStep(result.isVerified ? "verified" : "verify");
      }
    } catch (error) {
      setStatus(labels.phoneFailed);
      onError?.(error);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <View style={look.container}>
      <Field
        autoComplete="tel"
        editable={!isBusy && step !== "verified"}
        keyboardType="phone-pad"
        label={labels.phone}
        look={look}
        onChangeText={setPhone}
        textContentType="telephoneNumber"
        value={phone}
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
          disabled={isBusy || step === "verified" || !phone.trim() || (step === "verify" && !otp.trim())}
          label={step === "collect" ? labels.sendPhoneCode : step === "verify" ? labels.verifyPhoneCode : labels.phoneVerified}
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
