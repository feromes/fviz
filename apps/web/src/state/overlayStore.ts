import { create } from "zustand";

export type OverlayMode = "none" | "sampa_h3";

type OverlayState = {
  activeOverlay: OverlayMode;
  setOverlay: (mode: OverlayMode) => void;
  clearOverlay: () => void;
};

export const useOverlayStore = create<OverlayState>((set) => ({
  activeOverlay: "none",
  setOverlay: (mode) => set({ activeOverlay: mode }),
  clearOverlay: () => set({ activeOverlay: "none" }),
}));
