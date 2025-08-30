import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DashboardIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLOrSVGElement>,
    HTMLOrSVGElement
  > {
  isActive?: boolean;
}
