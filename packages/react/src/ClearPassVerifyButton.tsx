import type { ComponentPropsWithoutRef } from "react";

import { CubidHostedVerificationWidget } from "./CubidWidget";

export interface ClearPassVerifyButtonProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CubidHostedVerificationWidget>,
    "buttonLabel" | "description" | "stampToRender" | "title"
  > {
  buttonLabel?: string;
  description?: string;
  title?: string;
}

export function ClearPassVerifyButton({
  buttonLabel = "Verify with ClearPass",
  description = "Continue in Cubid to verify with ClearPass, our third-party identity provider.",
  title = "ClearPass verification",
  ...props
}: ClearPassVerifyButtonProps) {
  return (
    <CubidHostedVerificationWidget
      {...props}
      buttonLabel={buttonLabel}
      description={description}
      stampToRender="clearpass_verify"
      title={title}
    />
  );
}
