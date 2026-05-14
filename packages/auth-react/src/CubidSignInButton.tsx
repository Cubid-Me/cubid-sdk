"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { useCubidAuth, type CubidAuthSignInOptions } from "./context";

export interface CubidSignInButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "onClick" | "onError"
  > {
  children?: ReactNode;
  onError?: (error: Error) => void;
  onLaunched?: (url: string) => void;
  signInOptions?: CubidAuthSignInOptions;
}

export function CubidSignInButton({
  children = "Sign in with Cubid",
  disabled,
  onError,
  onLaunched,
  signInOptions,
  type = "button",
  ...buttonProps
}: CubidSignInButtonProps) {
  const auth = useCubidAuth();

  return (
    <button
      {...buttonProps}
      disabled={disabled || auth.status === "loading"}
      onClick={async () => {
        try {
          const url = await auth.signIn(signInOptions);
          onLaunched?.(url);
        } catch (error) {
          onError?.(
            error instanceof Error ? error : new Error("Cubid sign-in failed.")
          );
        }
      }}
      type={type}
    >
      {children}
    </button>
  );
}
