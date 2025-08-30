import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProxyIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLOrSVGElement>,
    HTMLOrSVGElement
  > {
  isActive?: boolean;
}
