import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { IActiveDomains } from "../../interfaces/domain";

export interface ActiveDomainsProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  activeDomains: IActiveDomains[];
  isDeactivateDomain?: boolean;
  isActive?: boolean;
}
