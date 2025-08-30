import { create } from "zustand";
import type { IActiveDomains, IDomains, KTDomains } from "../interfaces/domain";

interface DomainState {
  activeDomains: IActiveDomains[];
  setActiveDomains: (domains: IActiveDomains[]) => void;
  addActiveDomain: (domain: IActiveDomains) => void;
  removeActiveDomain: (domain: string) => void;

  ktDomains: KTDomains[];
  setKtDomains: (ktDomains: KTDomains[]) => void;

  domains: IDomains[];
  setDomains: (domains: IDomains[]) => void;
}

export const useDomainStore = create<DomainState>((set) => ({
  activeDomains: [],
  setActiveDomains: (domains) => set({ activeDomains: domains }),
  addActiveDomain: (domain: IActiveDomains) =>
    set(({ activeDomains }) => ({
      activeDomains: [...activeDomains, domain],
    })),
  removeActiveDomain: (domain) =>
    set(({ activeDomains }) => ({
      activeDomains: activeDomains.filter((item) => item.domain !== domain),
    })),

  domains: [],
  setDomains: (domains) => set({ domains }),

  ktDomains: [],
  setKtDomains: (ktDomains) => set({ ktDomains }),
}));
