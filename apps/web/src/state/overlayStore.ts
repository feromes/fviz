import { create } from "zustand";

export type OverlayMode =
  | "none"
  | "sampa_h3"
  | "search_name"
  | "search_neighbor"
  | "search_hex";

type HexRef = {
  h3: string;
  center: [number, number]; // [lng, lat]
};

type OverlayState = {
  activeOverlay: OverlayMode;
  hexRef?: HexRef;

  setOverlay: (mode: OverlayMode) => void;
  setHexSearch: (hex: HexRef) => void;
  clearOverlay: () => void;
};

export const useOverlayStore = create<OverlayState>((set) => ({
  activeOverlay: "none",
  hexRef: undefined,

  setOverlay: (mode) => set({ activeOverlay: mode }),

  setHexSearch: (hex) =>
    set({
      activeOverlay: "search_hex",
      hexRef: hex,
    }),

  clearOverlay: () =>
    set({
      activeOverlay: "none",
      hexRef: undefined,
    }),
}));
