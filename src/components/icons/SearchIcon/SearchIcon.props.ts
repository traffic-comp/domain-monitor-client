import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SearchIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<SVGSVGElement>,
    SVGSVGElement
  > {
  isActive?: boolean;
  click: () => void;
}
