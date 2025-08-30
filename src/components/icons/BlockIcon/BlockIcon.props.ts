import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface BlockIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLOrSVGElement>,
    HTMLOrSVGElement
  > {
  isActive?: boolean;
}
