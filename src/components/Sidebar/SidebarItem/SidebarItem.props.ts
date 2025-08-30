import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SidebarItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  text: string;
  path: string;
  isActive: boolean;
  children?: React.ReactNode;
}
