import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LockIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<SVGSVGElement>,
    SVGSVGElement
  > {
  isActive?: boolean;
}
