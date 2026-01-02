import { create } from "zustand";

export type ColorMapMode = "elevation"; // depois: "hag", "risk", etc.

type ColorMapState = {
  mode: ColorMapMode;
  min: number;
  max: number;
  ref: string;
  colormap: "fviz_geo"; // por enquanto fixo
  visible: boolean;
  toggleVisible: () => void;
  setColorMap: (data: Partial<ColorMapState>) => void;
};

export const useColorMapStore = create<ColorMapState>((set) => ({
  mode: "elevation",
  min: 0,
  max: 1,
  ref: "",
  colormap: "fviz_geo",
  visible: true,
  toggleVisible: () =>
      set((s) => ({ visible: !s.visible })),
  setColorMap: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
