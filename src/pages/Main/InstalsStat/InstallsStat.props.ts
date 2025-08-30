import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface InstallsStatProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  ids: number[];
}
