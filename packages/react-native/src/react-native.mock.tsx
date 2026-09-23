import { createElement } from "react";
import type { ReactNode } from "react";

// A stand-in for react-native in jsdom tests: each host component becomes a
// plain DOM element, `onPress` a click, `onChangeText` a change. Only the
// tests import this; the package never does.

type HostProps = Record<string, unknown> & { children?: ReactNode };

const host = (tag: string) =>
  function Host(props: HostProps) {
    const { children, onPress, onChangeText, editable, disabled, accessibilityLabel, accessibilityRole, ...rest } = props;
    const domProps: Record<string, unknown> = {
      "aria-label": accessibilityLabel,
      "data-style": JSON.stringify(rest.style ?? null),
      "data-tag": tag,
      onClick: disabled ? undefined : onPress,
      onChange: onChangeText ? (event: { target: { value: string } }) => (onChangeText as (value: string) => void)(event.target.value) : undefined,
      readOnly: editable === false || undefined,
      role: accessibilityRole
    };
    for (const key of Object.keys(rest)) {
      if (typeof rest[key] === "string" && !key.startsWith("accessibility") && key !== "style") {
        domProps[`data-${key.toLowerCase()}`] = rest[key];
      }
    }
    if (tag === "TextInput") {
      return createElement("input", { ...domProps, value: (rest as { value?: string }).value ?? "" });
    }
    return createElement(tag === "Pressable" ? "button" : "div", domProps, children);
  };

export const Pressable = host("Pressable");
export const Text = host("Text");
export const TextInput = host("TextInput");
export const View = host("View");
export const StyleSheet = { create: <T,>(styles: T) => styles, hairlineWidth: 1 };
