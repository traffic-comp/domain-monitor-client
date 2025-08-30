import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ScreenIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLOrSVGElement>,
    HTMLOrSVGElement
  > {
  isActive?: boolean;
}
