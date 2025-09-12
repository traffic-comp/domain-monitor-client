import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LogIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<SVGSVGElement>,
    SVGSVGElement
  > {
  isActive?: boolean;
}
