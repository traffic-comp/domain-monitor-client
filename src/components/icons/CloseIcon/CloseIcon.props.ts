import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CloseIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLOrSVGElement>,
    HTMLOrSVGElement
  > {
  isActive?: boolean;
  click?: () => void;
}
