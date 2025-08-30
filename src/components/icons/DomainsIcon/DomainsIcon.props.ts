import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DomainsIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLOrSVGElement>,
    HTMLOrSVGElement
  > {
  isActive?: boolean;
}
