import { create } from "zustand";

export type ColorMapMode = "elevation" | "mdt" | "hag"; // depois: "hag", "risk", etc.

type ColorMapState = {
  mode: ColorMapMode;
  min: number;
  max: number;
  ref: string;
  colormap: "fviz_geo"; // por enquanto fixo
  visible: boolean;
  toggleVisible: () => void;

  setColorMap: (cfg: {
    mode: "mdt";
    min: number;
    max: number;
    ref: string;
    visible?: boolean;
  }) => void;
  hide: () => void;
};

export const useColorMapStore = create<ColorMapState>((set) => ({
  mode: "elevation",
  min: 0,
  max: 1,
  ref: "",
  colormap: "fviz_geo",
  visible: true,

  toggleVisible: () =>
    set((s) => {
      return { visible: !s.visible };
    }),

  setColorMap: (data) =>
    set((state) => {
      return { ...state, ...data };
    }),

  hide: () =>
    set((state) => {
      return { ...state, visible: false };
    }),
}));

