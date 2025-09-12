import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ScreenIconProps
  extends DetailedHTMLProps<
    HTMLAttributes<SVGSVGElement>,
    SVGSVGElement
  > {
  isActive?: boolean;
}
