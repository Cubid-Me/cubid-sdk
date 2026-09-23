import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

import type { CubidWeb2Client, EmailOtpVerifyResult, PhoneOtpVerifyResult, StampPersistenceRequest } from "@cubid/browser";

import { useOptionalCubidClient } from "./context";
import { EmailOtpForm } from "./EmailOtpForm";
import { collectLocation } from "./location";
import type { CubidCollectedLocation, CubidLocationRequest, CubidPositionReader } from "./location";
import { PhoneOtpForm } from "./PhoneOtpForm";
import { Action, Field, Status, styles } from "./primitives";

export type CubidDetailRequest = "required" | "optional" | "skip";

/** What the app wants, field by field; each says whether it may be skipped. */
export interface CubidProfileDetailsRequest {
  email?: CubidDetailRequest;
  phone?: CubidDetailRequest;
  name?: CubidDetailRequest;
  picture?: CubidDetailRequest;
  /** Decides what is asked for: "rough" never prompts for a precise location, "none" never mentions it. */
  location?: CubidLocationRequest;
}

/** What the account already has, so only what is missing is asked for. */
export interface CubidProfileDetailsKnown {
  email?: string | null;
  emailVerified?: boolean;
  phone?: string | null;
  phoneVerified?: boolean;
  name?: string | null;
  picture?: string | null;
}

export interface CubidProfileDetailsResult {
  email: { value: string; verified: boolean } | null;
  phone: { value: string; verified: boolean } | null;
  name: string | null;
  /** A URI the app's picker returned (file, content or data URI). */
  picture: string | null;
  location: CubidCollectedLocation | null;
  /** Fields that were optional and skipped. */
  skipped: Array<keyof CubidProfileDetailsRequest>;
}

export interface CubidProfileDetailsProps {
  client?: CubidWeb2Client;
  request: CubidProfileDetailsRequest;
  known?: CubidProfileDetailsKnown;
  /** Reads the device's position at the granularity asked for; the app owns the permission prompt. Required when `request.location` is not "none". */
  readPosition?: CubidPositionReader;
  /** Opens the app's own picker and resolves to a URI, or null when the user picked nothing. Required when `request.picture` is asked for. */
  pickPicture?: () => Promise<string | null>;
  /** Persist verified email and phone as stamps on the account (needs the account's user id and a page id). */
  persistStamp?: StampPersistenceRequest;
  onComplete: (result: CubidProfileDetailsResult) => Promise<void> | void;
  onError?: (error: unknown) => void;
  style?: StyleProp<ViewStyle>;
}

type DetailField = keyof CubidProfileDetailsRequest;
type Step = DetailField | "done";

const ORDER: DetailField[] = ["email", "phone", "name", "picture", "location"];

/**
 * One component for everything a profile needs. It works out which of the
 * requested fields are still missing, asks for them one at a time, and hands
 * back one result. Location is asked for only at the granularity requested.
 */
export function CubidProfileDetails({ client, known = {}, onComplete, onError, persistStamp, pickPicture, readPosition, request, style }: CubidProfileDetailsProps) {
  const contextualClient = useOptionalCubidClient();
  const resolvedClient = client ?? contextualClient ?? undefined;

  const [result, setResult] = useState<CubidProfileDetailsResult>(() => ({
    email: known.email ? { value: known.email, verified: !!known.emailVerified } : null,
    phone: known.phone ? { value: known.phone, verified: !!known.phoneVerified } : null,
    name: known.name ?? null,
    picture: known.picture ?? null,
    location: null,
    skipped: []
  }));
  const [name, setName] = useState(known.name ?? "");
  const [isBusy, setIsBusy] = useState(false);
  const [status, setStatus] = useState<string>();

  // Which steps still apply: requested, and not already satisfied.
  const steps = useMemo(() => {
    const wanted = (field: DetailField) => (request[field] ?? "skip") !== "skip" && request[field] !== "none";
    return ORDER.filter((step) => {
      if (!wanted(step)) {
        return false;
      }
      if (step === "email") return !(known.email && known.emailVerified);
      if (step === "phone") return !(known.phone && known.phoneVerified);
      if (step === "name") return !known.name;
      if (step === "picture") return !known.picture;
      return true;
    });
    // `known` and `request` are read once: what was missing when the component mounted is what it asks for.
  }, []);
  const [index, setIndex] = useState(0);
  const step: Step = steps[index] ?? "done";
  const required = (field: keyof CubidProfileDetailsRequest) => request[field] === "required";

  async function finish(next: CubidProfileDetailsResult) {
    try {
      await onComplete(next);
    } catch (error) {
      onError?.(error);
    }
  }

  function advance(patch: Partial<CubidProfileDetailsResult>, skippedField?: keyof CubidProfileDetailsRequest) {
    const next: CubidProfileDetailsResult = { ...result, ...patch, skipped: skippedField ? [...result.skipped, skippedField] : result.skipped };
    setResult(next);
    setStatus(undefined);
    if (index + 1 >= steps.length) {
      setIndex(steps.length);
      void finish(next);
    } else {
      setIndex(index + 1);
    }
  }

  async function takePicture() {
    if (!pickPicture) {
      onError?.(new Error("CubidProfileDetails needs `pickPicture` to ask for a picture."));
      return;
    }
    setIsBusy(true);
    try {
      const uri = await pickPicture();
      if (uri) {
        advance({ picture: uri });
      } else {
        setStatus("No picture chosen.");
      }
    } catch (error) {
      setStatus("Could not pick a picture.");
      onError?.(error);
    } finally {
      setIsBusy(false);
    }
  }

  async function shareLocation() {
    const granularity = request.location;
    if (!granularity || granularity === "none") {
      return;
    }
    if (!readPosition) {
      onError?.(new Error("CubidProfileDetails needs `readPosition` to ask for a location."));
      return;
    }
    setIsBusy(true);
    try {
      const location = await collectLocation(readPosition, granularity);
      if (location) {
        advance({ location });
      } else {
        setStatus("No location was shared.");
      }
    } catch (error) {
      setStatus("Could not read a location.");
      onError?.(error);
    } finally {
      setIsBusy(false);
    }
  }

  if (step === "done" && steps.length === 0) {
    // Nothing was missing: say so once, on mount.
    void Promise.resolve().then(() => finish(result));
    return null;
  }

  const skip = (field: keyof CubidProfileDetailsRequest) => (required(field) ? null : <Action label="Skip" onPress={() => advance({}, field)} secondary />);
  const progress = steps.length > 1 && step !== "done" ? `Step ${index + 1} of ${steps.length}` : null;

  return (
    <View style={[styles.stack, style]}>
      {progress ? <Text style={styles.label}>{progress}</Text> : null}
      {step === "email" ? (
        <>
          <EmailOtpForm
            client={resolvedClient}
            defaultEmail={known.email ?? ""}
            onError={onError}
            onVerified={(verified: EmailOtpVerifyResult) => advance({ email: { value: (verified as { email?: string }).email ?? known.email ?? "", verified: verified.isVerified } })}
            persistStamp={persistStamp}
          />
          {skip("email")}
        </>
      ) : null}
      {step === "phone" ? (
        <>
          <PhoneOtpForm
            client={resolvedClient}
            defaultPhone={known.phone ?? ""}
            onError={onError}
            onVerified={(verified: PhoneOtpVerifyResult) => advance({ phone: { value: (verified as { phone?: string }).phone ?? known.phone ?? "", verified: verified.isVerified } })}
            persistStamp={persistStamp}
          />
          {skip("phone")}
        </>
      ) : null}
      {step === "name" ? (
        <>
          <Field autoComplete="name" label="Your name" onChangeText={setName} textContentType="name" value={name} />
          <View style={styles.row}>
            <Action disabled={!name.trim()} label="Continue" onPress={() => advance({ name: name.trim() })} />
            {skip("name")}
          </View>
        </>
      ) : null}
      {step === "picture" ? (
        <View style={styles.row}>
          <Action disabled={isBusy} label={isBusy ? "Opening…" : "Choose a picture"} onPress={() => void takePicture()} />
          {skip("picture")}
        </View>
      ) : null}
      {step === "location" ? (
        <>
          <Text style={styles.label}>
            {request.location === "rough"
              ? "Share a rough location (about a city): no precise-location permission is needed."
              : request.location === "approximate"
                ? "Share an approximate location (about a neighbourhood)."
                : "Share your exact location."}
          </Text>
          <View style={styles.row}>
            <Action disabled={isBusy} label={isBusy ? "Reading…" : "Share location"} onPress={() => void shareLocation()} />
            {skip("location")}
          </View>
        </>
      ) : null}
      <Status>{status}</Status>
    </View>
  );
}
