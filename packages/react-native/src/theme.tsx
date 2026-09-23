import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { StyleSheet } from "react-native";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

// How the kit looks and what it says, so it can sit inside a host app as if it
// were the app's own. Three layers, each optional and each typed:
//
//   theme   — a handful of tokens (accent, text, border, radius, font…) the
//             defaults are built from; enough for most apps.
//   styles  — a style per slot (container, label, input, button…) laid over
//             the defaults, for anything tokens cannot say.
//   labels  — every string the kit shows, for wording and translation.
//
// Set once on <CubidProvider>, or per component; a component's props win.

export interface CubidTheme {
  /** Primary action background. */
  accent?: string;
  /** Text on the primary action. */
  onAccent?: string;
  /** Body and input text. */
  text?: string;
  /** Labels, status lines, secondary text. */
  muted?: string;
  /** Input and secondary-action borders. */
  border?: string;
  /** Input background. */
  surface?: string;
  /** Corner radius for inputs and actions. */
  radius?: number;
  fontFamily?: string;
  /** Base font size; labels and status derive from it. */
  fontSize?: number;
  /** Vertical rhythm between rows. */
  spacing?: number;
}

/** One style per slot the kit draws. */
export interface CubidStyles {
  container?: StyleProp<ViewStyle>;
  field?: StyleProp<ViewStyle>;
  label?: StyleProp<TextStyle>;
  input?: StyleProp<TextStyle>;
  actions?: StyleProp<ViewStyle>;
  button?: StyleProp<ViewStyle>;
  buttonText?: StyleProp<TextStyle>;
  buttonSecondary?: StyleProp<ViewStyle>;
  buttonSecondaryText?: StyleProp<TextStyle>;
  buttonDisabled?: StyleProp<ViewStyle>;
  status?: StyleProp<TextStyle>;
  /** The "Step 1 of 3" line and the location explanation in CubidProfileDetails. */
  hint?: StyleProp<TextStyle>;
}

/** Every string the kit shows. */
export interface CubidLabels {
  email: string;
  phone: string;
  code: string;
  name: string;
  sendEmailCode: string;
  verifyEmailCode: string;
  emailVerified: string;
  sendPhoneCode: string;
  verifyPhoneCode: string;
  phoneVerified: string;
  startOver: string;
  continue: string;
  skip: string;
  choosePicture: string;
  openingPicker: string;
  shareLocation: string;
  readingLocation: string;
  locationRough: string;
  locationApproximate: string;
  locationExact: string;
  codeSent: string;
  codeNotSent: string;
  codeWrong: string;
  emailFailed: string;
  phoneFailed: string;
  noPicture: string;
  pictureFailed: string;
  noLocation: string;
  locationFailed: string;
  /** "Step 2 of 3". */
  step: (index: number, count: number) => string;
}

export const DEFAULT_THEME: Required<CubidTheme> = {
  accent: "#1f1f1f",
  onAccent: "#ffffff",
  text: "#1f1f1f",
  muted: "#6b6b6b",
  border: "#c8c8c8",
  surface: "transparent",
  radius: 8,
  fontFamily: undefined as unknown as string,
  fontSize: 16,
  spacing: 12
};

export const DEFAULT_LABELS: CubidLabels = {
  email: "Email",
  phone: "Phone",
  code: "Code",
  name: "Your name",
  sendEmailCode: "Send email code",
  verifyEmailCode: "Verify email code",
  emailVerified: "Email verified",
  sendPhoneCode: "Send phone code",
  verifyPhoneCode: "Verify phone code",
  phoneVerified: "Phone verified",
  startOver: "Start over",
  continue: "Continue",
  skip: "Skip",
  choosePicture: "Choose a picture",
  openingPicker: "Opening…",
  shareLocation: "Share location",
  readingLocation: "Reading…",
  locationRough: "Share a rough location (about a city): no precise-location permission is needed.",
  locationApproximate: "Share an approximate location (about a neighbourhood).",
  locationExact: "Share your exact location.",
  codeSent: "Code sent. Enter it to finish.",
  codeNotSent: "Unable to send a code.",
  codeWrong: "That code did not match. Try again.",
  emailFailed: "Something went wrong with the email step.",
  phoneFailed: "Something went wrong with the phone step.",
  noPicture: "No picture chosen.",
  pictureFailed: "Could not pick a picture.",
  noLocation: "No location was shared.",
  locationFailed: "Could not read a location.",
  step: (index, count) => `Step ${index} of ${count}`
};

/** The defaults, built from the tokens. */
export function stylesFromTheme(theme: CubidTheme): Required<CubidStyles> {
  const t = { ...DEFAULT_THEME, ...theme };
  const font = t.fontFamily ? { fontFamily: t.fontFamily } : {};
  return StyleSheet.create({
    container: { gap: t.spacing },
    field: { gap: Math.round(t.spacing / 3) },
    label: { ...font, fontSize: Math.round(t.fontSize * 0.8), color: t.muted },
    input: { ...font, borderWidth: StyleSheet.hairlineWidth, borderColor: t.border, borderRadius: t.radius, backgroundColor: t.surface, paddingHorizontal: 12, paddingVertical: 10, fontSize: t.fontSize, color: t.text },
    actions: { flexDirection: "row", gap: Math.round(t.spacing * 0.66), flexWrap: "wrap", alignItems: "center" },
    button: { borderRadius: t.radius, paddingHorizontal: 16, paddingVertical: 12, alignItems: "center", backgroundColor: t.accent },
    buttonText: { ...font, color: t.onAccent, fontSize: t.fontSize, fontWeight: "600" },
    buttonSecondary: { borderRadius: t.radius, paddingHorizontal: 16, paddingVertical: 12, alignItems: "center", backgroundColor: "transparent", borderWidth: StyleSheet.hairlineWidth, borderColor: t.border },
    buttonSecondaryText: { ...font, color: t.text, fontSize: t.fontSize },
    buttonDisabled: { opacity: 0.5 },
    status: { ...font, fontSize: Math.round(t.fontSize * 0.875), color: t.muted },
    hint: { ...font, fontSize: Math.round(t.fontSize * 0.875), color: t.muted }
  });
}

export interface CubidLook {
  theme?: CubidTheme;
  styles?: CubidStyles;
  labels?: Partial<CubidLabels>;
}

const LookContext = createContext<CubidLook>({});

/** Set the look once for a whole tree; `CubidProvider` does this for you. */
export function CubidThemeProvider({ children, ...look }: CubidLook & { children: ReactNode }) {
  const parent = useContext(LookContext);
  const merged = useMemo(() => mergeLook(parent, look), [parent, look.theme, look.styles, look.labels]);
  return <LookContext.Provider value={merged}>{children}</LookContext.Provider>;
}

function mergeLook(base: CubidLook, over: CubidLook): CubidLook {
  return {
    theme: { ...(base.theme ?? {}), ...(over.theme ?? {}) },
    styles: { ...(base.styles ?? {}), ...(over.styles ?? {}) },
    labels: { ...(base.labels ?? {}), ...(over.labels ?? {}) }
  };
}

/** The resolved look for a component: defaults from the theme, the provider's slots, then the component's own. */
export function useCubidLook(own: CubidLook = {}): { styles: Required<CubidStyles>; labels: CubidLabels } {
  const fromContext = useContext(LookContext);
  return useMemo(() => {
    const look = mergeLook(fromContext, own);
    const base = stylesFromTheme(look.theme ?? {});
    const slots = look.styles ?? {};
    const styles = Object.fromEntries((Object.keys(base) as Array<keyof CubidStyles>).map((slot) => [slot, [base[slot], slots[slot]]])) as unknown as Required<CubidStyles>;
    return { labels: { ...DEFAULT_LABELS, ...(look.labels ?? {}) }, styles };
  }, [fromContext, own.theme, own.styles, own.labels]);
}
