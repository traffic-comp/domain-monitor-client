import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LoaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isText?: boolean;
  width?: string;
  height?: string;
}
