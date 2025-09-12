import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DomainsIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<SVGSVGElement>,
    SVGSVGElement
  > {
  isActive?: boolean;
}
