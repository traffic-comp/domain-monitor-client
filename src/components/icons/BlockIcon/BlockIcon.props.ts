import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface BlockIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<SVGSVGElement>,
    SVGSVGElement
  > {
  isActive?: boolean;
}
