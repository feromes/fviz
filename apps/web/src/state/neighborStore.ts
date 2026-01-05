import { create } from "zustand";

type NeighborState = {
  reference: [number, number] | null; // [lng, lat]
  setReference: (p: [number, number]) => void;
  clearReference: () => void;
};

export const useNeighborStore = create<NeighborState>((set) => ({
  reference: null,
  setReference: (p) => set({ reference: p }),
  clearReference: () => set({ reference: null }),
}));
