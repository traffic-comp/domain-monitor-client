import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement> {
  click: React.Dispatch<React.SetStateAction<boolean>>;
}
