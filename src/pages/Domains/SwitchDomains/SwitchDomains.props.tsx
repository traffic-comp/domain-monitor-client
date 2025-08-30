import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SwitchDomainsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  fetchDomains: () => void;
}
