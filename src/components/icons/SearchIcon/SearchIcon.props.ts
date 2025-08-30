import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SearchIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLOrSVGElement>,
    HTMLOrSVGElement
  > {
  isActive?: boolean;
  click: () => void;
}
