import { create } from "zustand";

export type SceneType = "pointcloud" | "mdt";

interface SceneState {
  scene: SceneType;
  setScene: (scene: SceneType) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  scene: "pointcloud",
  setScene: (scene) => set({ scene }),
}));
