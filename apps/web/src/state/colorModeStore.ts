import { create } from "zustand";

export type ColorMode = "elevation" | "hag" | "classification" | "vvv";

type ColorModeState = {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
};

export const useColorModeStore = create<ColorModeState>((set) => ({
  colorMode: "elevation",
  setColorMode: (mode) => set({ colorMode: mode }),
}));
