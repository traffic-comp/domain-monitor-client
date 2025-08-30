import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { DetailDomainInfo } from "../../../interfaces/domain";

export interface DomainInfoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  detailedInfo: DetailDomainInfo[];
}
