import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  classifyNativeSessionObservation, collectNativeSessionObservation,
  describeNativeSessionRequest, summarizeNativeSessionMeasurements,
} from "../../../examples/native-session-measurement.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const fixture = JSON.parse(readFileSync(new URL("../../../examples/native-session-measurement.synthetic.json", import.meta.url), "utf8"));
const row = fixture[0];
const withoutTokenMetadata = () => { const value = { ...row }; delete value.accessTokenExpiresInSeconds; delete value.refreshTokenReturned; return value; };
const secret = "SYNTHETIC_PRIVATE_VALUE_MUST_NOT_BE_EXPORTED";
const cli = (input: string) => spawnSync(process.execPath, ["scripts/summarize-native-session-measurements.mjs", "-"], { cwd: root, input, encoding: "utf8" });

describe("offline native session measurement example", () => {
  it("distinguishes an omitted prompt from prompt=none and forced-login/freshness controls", () => {
    const base = `https://synthetic.invalid/authorize?state=${secret}&nonce=${secret}&code_challenge=${secret}`;
    expect(describeNativeSessionRequest(base)).toEqual({ promptMode: "omitted", maxAgeRequested: false, passkeyRequested: false, providerHintPresent: false });
    expect(describeNativeSessionRequest(`${base}&prompt=none`).promptMode).toBe("none");
    expect(describeNativeSessionRequest(`${base}&prompt=login&max_age=0&acr_values=urn:cubid:acr:passkey&cubid_provider=google`)).toEqual({ promptMode: "login", maxAgeRequested: true, passkeyRequested: true, providerHintPresent: true });
    expect(JSON.stringify(describeNativeSessionRequest(base))).not.toContain(secret);
    expect(describeNativeSessionRequest(`${base}&prompt=select_account`).promptMode).toBe("other");
  });
  it.each(["prompt", "max_age", "acr_values", "cubid_provider"])("rejects ambiguous repeated %s without echoing its value", (key) => {
    expect(() => describeNativeSessionRequest(`https://synthetic.invalid/authorize?${key}=${secret}&${key}=${secret}`)).toThrow("Invalid native session measurement");
  });
  it.each(["not a URL", "http://synthetic.invalid/authorize", `https://${secret}@synthetic.invalid/authorize`, `https://synthetic.invalid/authorize#${secret}`])("rejects unsuitable request metadata input", (url) => {
    try { describeNativeSessionRequest(url); throw new Error("expected rejection"); } catch (error) { expect(String(error)).not.toContain(secret); expect(String(error)).toContain("Invalid native session measurement"); }
  });
  it("requires backend completion and explicit observations; elapsed time alone proves nothing", () => {
    expect(classifyNativeSessionObservation(row)).toBe("same_subject_no_interaction_observed");
    expect(classifyNativeSessionObservation({ ...row, browserUi: "unknown" })).toBe("same_subject_observation_incomplete");
    const withoutMetadata = withoutTokenMetadata();
    expect(classifyNativeSessionObservation({ ...withoutMetadata, backendOutcome: "not_attempted" })).toBe("completion_not_observed");
    expect(classifyNativeSessionObservation({ ...row, authenticationUi: "observed" })).toBe("same_subject_interaction_observed");
  });
  it.each(["none", "login", "other"])("excludes prompt=%s from ordinary session reuse observations", (promptMode) => {
    expect(classifyNativeSessionObservation({ ...row, promptMode })).toBe("control_or_diagnostic");
  });
  it("excludes max_age and initial identity establishment from ordinary session reuse observations", () => {
    expect(classifyNativeSessionObservation({ ...row, maxAgeRequested: true })).toBe("control_or_diagnostic");
    expect(classifyNativeSessionObservation({ ...row, backendOutcome: "initial_subject" })).toBe("initial_sign_in");
    expect(classifyNativeSessionObservation({ ...row, scenario: "initial_login" })).toBe("initial_sign_in");
  });
  it.each([
    ["subject_mismatch", "identity_mismatch"], ["denied", "authorization_denied"], ["validation_failed", "validation_failed"],
  ])("never counts backend %s as accepted session reuse", (backendOutcome, classification) => {
    const withoutMetadata = withoutTokenMetadata();
    expect(classifyNativeSessionObservation({ ...withoutMetadata, backendOutcome })).toBe(classification);
  });
  it.each(["cancel", "dismiss", "error"])("records %s with no backend completion and rejects contradictory success", (browserOutcome) => {
    const withoutMetadata = withoutTokenMetadata();
    expect(classifyNativeSessionObservation({ ...withoutMetadata, browserOutcome, backendOutcome: "not_attempted" })).toBe(browserOutcome === "error" ? "handoff_failed" : "cancelled");
    expect(() => collectNativeSessionObservation({ ...row, browserOutcome })).toThrow();
  });
  it.each(["access_token", "id_token", "refresh_token", "subject", "callbackUrl", "authorizationUrl", "notes", "error_description"])("rejects accidental %s instead of exporting it", (key) => {
    expect(() => collectNativeSessionObservation({ ...row, [key]: secret })).toThrow("Invalid native session measurement");
  });
  it.each([NaN, Infinity, -1, 0.5, "900", null])("rejects invalid token-lifetime metadata %s", (accessTokenExpiresInSeconds) => {
    expect(() => collectNativeSessionObservation({ ...row, accessTokenExpiresInSeconds })).toThrow();
  });
  it("accepts only closed enum/boolean/schema values", () => {
    for (const patch of [{ platform: secret }, { schemaVersion: 2 }, { passkeyRequested: "true" }, { refreshTokenReturned: secret }, { environment: secret }]) {
      expect(() => collectNativeSessionObservation({ ...row, ...patch })).toThrow();
    }
    expect(() => collectNativeSessionObservation(null)).toThrow();
    expect(() => collectNativeSessionObservation([])).toThrow();
    expect(() => collectNativeSessionObservation(Object.create(row))).toThrow();
    expect(() => collectNativeSessionObservation({ ...row, [Symbol("private")]: secret })).toThrow();
  });
  it("rejects accessors without reading them so private values cannot change after validation", () => {
    let reads = 0;
    const value = { ...row };
    Object.defineProperty(value, "platform", { enumerable: true, get() { reads++; return reads === 1 ? "ios" : secret; } });
    expect(() => collectNativeSessionObservation(value)).toThrow("Invalid native session measurement");
    expect(reads).toBe(0);
  });
  it("keeps platform/cookie/environment strata and synthetic evidence explicit without issuing policy", () => {
    const report = summarizeNativeSessionMeasurements([...fixture, { ...row, platform: "android", environment: "staging", cookiePreference: "ephemeral_requested" }]);
    expect(report.syntheticRows).toBe(3); expect(report.nonSyntheticRows).toBe(1);
    expect(report.groups["synthetic/ios/development/platform_default"]).toEqual({ same_subject_no_interaction_observed: 1, control_or_diagnostic: 1 });
    expect(report.groups["synthetic/android/development/platform_default"]).toEqual({ same_subject_observation_incomplete: 1 });
    expect(report.hostedAcceptance).toBe("not_proven_by_this_report"); expect(report.assessment).toBe("observations_only");
    expect(() => summarizeNativeSessionMeasurements([])).toThrow();
    expect(() => summarizeNativeSessionMeasurements(Array(501).fill(row))).toThrow();
  });
  it("runs the Node24+ offline CLI against the synthetic fixture", () => {
    const result = cli(JSON.stringify(fixture));
    expect(result.status, result.stderr).toBe(0);
    const report = JSON.parse(result.stdout);
    expect(report.totalRows).toBe(3); expect(report.nonSyntheticRows).toBe(0);
    expect(report.rows[0].accessTokenExpiresInSeconds).toBe(900);
  });
  it.each([JSON.stringify([{ ...row, access_token: secret }]), secret, JSON.stringify({ error_description: secret }), " ".repeat(1024 * 1024 + 1)])("CLI emits no partial report or raw data on invalid input", (input) => {
    const result = cli(input);
    expect(result.status).toBe(1); expect(result.stdout).toBe("");
    expect(result.stderr).toContain("Invalid measurement input. No report written.");
    expect(result.stderr).not.toContain(secret);
  });
});
