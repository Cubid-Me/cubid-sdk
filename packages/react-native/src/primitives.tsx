import type { ReactNode } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";

import type { CubidStyles } from "./theme";

// The few native primitives the kit draws with, each taking the resolved
// look (theme defaults, provider slots, component slots) it should wear.
// No DOM, no react-dom: this file is the whole reason the kit exists.

type Look = Required<CubidStyles>;

export interface FieldProps extends Omit<TextInputProps, "style"> {
  label: string;
  look: Look;
}

export function Field({ label, look, ...inputProps }: FieldProps) {
  return (
    <View style={look.field}>
      <Text style={look.label}>{label}</Text>
      <TextInput accessibilityLabel={label} style={look.input} {...inputProps} />
    </View>
  );
}

export interface ActionProps {
  disabled?: boolean;
  label: string;
  look: Look;
  onPress: () => void;
  secondary?: boolean;
}

export function Action({ disabled, label, look, onPress, secondary }: ActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[secondary ? look.buttonSecondary : look.button, disabled ? look.buttonDisabled : null]}
    >
      <Text style={secondary ? look.buttonSecondaryText : look.buttonText}>{label}</Text>
    </Pressable>
  );
}

export function Status({ children, look }: { children?: ReactNode; look: Look }) {
  if (!children) {
    return null;
  }

  return (
    <Text accessibilityLiveRegion="polite" style={look.status}>
      {children}
    </Text>
  );
}
