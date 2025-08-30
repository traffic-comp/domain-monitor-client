import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { Proxy } from "../../../../interfaces/proxy";
import type React from "react";

export interface ProxyControllerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  proxyData: Proxy | null;
  setProxyData: React.Dispatch<React.SetStateAction<Proxy | null>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
