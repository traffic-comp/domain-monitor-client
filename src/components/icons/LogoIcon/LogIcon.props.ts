import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LogIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLOrSVGElement>,
    HTMLOrSVGElement
  > {
  isActive?: boolean;
}
