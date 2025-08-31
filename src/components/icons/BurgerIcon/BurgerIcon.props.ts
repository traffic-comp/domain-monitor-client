import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface BurgerIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLOrSVGElement>,
    HTMLOrSVGElement
  > {
  isActive?: boolean;
  click: React.Dispatch<React.SetStateAction<boolean>>;
}
