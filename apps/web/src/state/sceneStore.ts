import { create } from "zustand";

export type SceneType = "pointcloud" | "mdt";

interface SceneState {
  scene: SceneType;
  sceneTitle?: string;
  setScene: (scene: SceneType, title?: string) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  scene: "pointcloud",
  sceneTitle: undefined,

  setScene: (scene, title) =>
    set({
      scene,
      sceneTitle: title,
    }),
}));
