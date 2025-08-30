import { create } from "zustand";

interface GraphicState {
  ids: number[];
  setIds: (ids: number[]) => void;
}

export const useGraphicStore = create<GraphicState>((set) => ({
  ids: [],
  setIds: (ids) => set({ ids }),
}));
