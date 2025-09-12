import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProxyIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<SVGSVGElement>,
    SVGSVGElement
  > {
  isActive?: boolean;
}
