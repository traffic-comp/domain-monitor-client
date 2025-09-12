import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface BurgerIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<SVGSVGElement>,
    SVGSVGElement
  > {
  isActive?: boolean;
  click: React.Dispatch<React.SetStateAction<boolean>>;
}
