import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { StyleProp, TextInputProps, ViewStyle } from "react-native";

// The few native primitives the kit draws with. Unstyled beyond spacing and a
// hairline border, so a host app's look wins; every piece takes a `style` for
// the rest. No DOM, no react-dom: this file is the whole reason the kit exists.

export interface FieldProps extends Omit<TextInputProps, "style"> {
  label: string;
  style?: StyleProp<ViewStyle>;
}

export function Field({ label, style, ...inputProps }: FieldProps) {
  return (
    <View style={[styles.field, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput accessibilityLabel={label} style={styles.input} {...inputProps} />
    </View>
  );
}

export interface ActionProps {
  disabled?: boolean;
  label: string;
  onPress: () => void;
  secondary?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Action({ disabled, label, onPress, secondary, style }: ActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.action, secondary ? styles.actionSecondary : null, disabled ? styles.actionDisabled : null, style]}
    >
      <Text style={secondary ? styles.actionSecondaryText : styles.actionText}>{label}</Text>
    </Pressable>
  );
}

export function Status({ children }: { children?: ReactNode }) {
  if (!children) {
    return null;
  }

  return (
    <Text accessibilityLiveRegion="polite" style={styles.status}>
      {children}
    </Text>
  );
}

export const styles = StyleSheet.create({
  field: { gap: 4 },
  label: { fontSize: 13, opacity: 0.7 },
  input: { borderWidth: StyleSheet.hairlineWidth, borderColor: "#8884", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16 },
  action: { borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, alignItems: "center", backgroundColor: "#1f1f1f" },
  actionSecondary: { backgroundColor: "transparent", borderWidth: StyleSheet.hairlineWidth, borderColor: "#8888" },
  actionDisabled: { opacity: 0.5 },
  actionText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  actionSecondaryText: { fontSize: 16 },
  status: { fontSize: 14, opacity: 0.8 },
  stack: { gap: 12 },
  row: { flexDirection: "row", gap: 8, flexWrap: "wrap" }
});
