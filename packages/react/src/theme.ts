import type { CSSProperties } from "react";

// How the kit looks and what it says, so it can sit inside a host app as if it
// were the app's own. The same three layers as `@cubid/react-native`, in DOM
// terms:
//
//   theme      — a handful of tokens (accent, text, border, radius, font…);
//                given, the kit draws itself from them with inline styles.
//                Absent, the kit stays unstyled, as it always was.
//   classNames — a class per slot, for apps that style with CSS.
//   styles     — inline CSSProperties per slot, laid over the theme.
//   labels     — every string the kit shows, for wording and translation.
//
// Set once on <CubidWeb2Provider>, or per component; a component's props win.

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
  /** Corner radius for inputs and actions, in px. */
  radius?: number;
  fontFamily?: string;
  /** Base font size in px; labels and status derive from it. */
  fontSize?: number;
  /** Vertical rhythm between rows, in px. */
  spacing?: number;
}

export type CubidSlot =
  | "container"
  | "field"
  | "label"
  | "input"
  | "actions"
  | "button"
  | "buttonSecondary"
  | "status";

/** A class per slot the kit draws. */
export type CubidClassNames = Partial<Record<CubidSlot, string>>;

/** Inline styles per slot, laid over what the theme produced. */
export type CubidStyles = Partial<Record<CubidSlot, CSSProperties>>;

/** Every string the OTP forms show. */
export interface CubidLabels {
  email: string;
  phone: string;
  code: string;
  sendEmailCode: string;
  verifyEmailCode: string;
  emailVerified: string;
  sendPhoneCode: string;
  verifyPhoneCode: string;
  phoneVerified: string;
  reset: string;
  codeSent: string;
  codeNotSent: string;
  codeWrong: string;
  emailFailed: string;
  phoneFailed: string;
}

export const DEFAULT_LABELS: CubidLabels = {
  email: "Email",
  phone: "Phone",
  code: "OTP",
  sendEmailCode: "Send email code",
  verifyEmailCode: "Verify email code",
  emailVerified: "Email verified",
  sendPhoneCode: "Send phone code",
  verifyPhoneCode: "Verify phone code",
  phoneVerified: "Phone verified",
  reset: "Reset",
  codeSent: "Code sent. Enter the OTP to finish verification.",
  codeNotSent: "Unable to send code.",
  codeWrong: "Verification failed. Try again.",
  emailFailed: "Something went wrong while processing the email flow.",
  phoneFailed: "Something went wrong while processing the phone flow."
};

export interface CubidLook {
  theme?: CubidTheme;
  classNames?: CubidClassNames;
  styles?: CubidStyles;
  labels?: Partial<CubidLabels>;
}

const DEFAULT_THEME = { accent: "#1f1f1f", onAccent: "#ffffff", text: "#1f1f1f", muted: "#6b6b6b", border: "#c8c8c8", surface: "transparent", radius: 8, fontSize: 16, spacing: 12 };

/** Inline styles from the tokens; nothing when no theme was given, so an unthemed kit stays unstyled. */
export function stylesFromTheme(theme: CubidTheme | undefined): CubidStyles {
  if (!theme) {
    return {};
  }
  const t = { ...DEFAULT_THEME, ...theme };
  const font: CSSProperties = t.fontFamily ? { fontFamily: t.fontFamily } : {};
  const action: CSSProperties = { ...font, borderRadius: t.radius, padding: "12px 16px", fontSize: t.fontSize, fontWeight: 600, cursor: "pointer", border: "1px solid transparent" };
  return {
    container: { display: "flex", flexDirection: "column", gap: t.spacing, ...font, color: t.text },
    field: { display: "flex", flexDirection: "column", gap: Math.round(t.spacing / 3) },
    label: { fontSize: Math.round(t.fontSize * 0.8), color: t.muted },
    input: { ...font, border: `1px solid ${t.border}`, borderRadius: t.radius, background: t.surface, padding: "10px 12px", fontSize: t.fontSize, color: t.text },
    actions: { display: "flex", gap: Math.round(t.spacing * 0.66), flexWrap: "wrap", alignItems: "center" },
    button: { ...action, background: t.accent, color: t.onAccent },
    buttonSecondary: { ...action, background: "transparent", color: t.text, borderColor: t.border, fontWeight: 400 },
    status: { fontSize: Math.round(t.fontSize * 0.875), color: t.muted, margin: 0 }
  };
}

export function mergeLook(base: CubidLook, over: CubidLook): CubidLook {
  return {
    theme: { ...(base.theme ?? {}), ...(over.theme ?? {}) },
    classNames: { ...(base.classNames ?? {}), ...(over.classNames ?? {}) },
    styles: { ...(base.styles ?? {}), ...(over.styles ?? {}) },
    labels: { ...(base.labels ?? {}), ...(over.labels ?? {}) }
  };
}

export interface ResolvedLook {
  labels: CubidLabels;
  /** The `className` and `style` for a slot, ready to spread. */
  slot: (name: CubidSlot) => { className?: string; style?: CSSProperties };
}

export function resolveLook(look: CubidLook): ResolvedLook {
  const hasTheme = !!look.theme && Object.keys(look.theme).length > 0;
  const fromTheme = stylesFromTheme(hasTheme ? look.theme : undefined);
  return {
    labels: { ...DEFAULT_LABELS, ...(look.labels ?? {}) },
    slot: (name) => {
      const style = { ...(fromTheme[name] ?? {}), ...(look.styles?.[name] ?? {}) };
      return { className: look.classNames?.[name], style: Object.keys(style).length ? style : undefined };
    }
  };
}
