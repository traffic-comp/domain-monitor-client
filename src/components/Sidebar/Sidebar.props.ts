import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  click: React.Dispatch<React.SetStateAction<boolean>>;
}
