import { create } from "zustand";

export type LayerId = "mds" | "mdt" | "classificacao" | "hag" | "footpath" | "delta";

type SceneState = {
  scene: string;         // você já tem
  title: string;         // se você já tem
  activeLayer: LayerId;  // ✅ novo

  setScene: (scene: any, title: string) => void; // já existe
  setActiveLayer: (layer: LayerId) => void;      // ✅ novo
};

export const useSceneStore = create<SceneState>((set) => ({
  scene: "pointcloud",
  sceneTitle: "MDS - Modelo Digital de Superfície",
  activeLayer: "mds",
  setActiveLayer: (activeLayer) => set({ activeLayer }),
  setScene: (scene, title) =>
    set({
      scene,
      sceneTitle: title,
    }),
}));
