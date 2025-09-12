import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CloseIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<SVGSVGElement>,
    SVGSVGElement
  > {
  isActive?: boolean;
  click?: () => void;
}
