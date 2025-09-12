import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DashboardIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<SVGSVGElement>,
    SVGSVGElement
  > {
  isActive?: boolean;
}
