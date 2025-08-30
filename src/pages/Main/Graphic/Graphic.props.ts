import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface GrapicProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  period: "hour" | "day";
  width: string;
  height: string;
  ids: number[];
}
