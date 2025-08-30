import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface BlockHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  children?: React.ReactNode;
}
