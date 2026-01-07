// src/state/sceneControlStore.ts
import { create } from "zustand";

export type CameraMode = "reset" | "top" | "free";

interface SceneControlState {
  cameraMode: CameraMode;
  setCameraMode: (mode: CameraMode) => void;
  turnTable: boolean;
}

export const useSceneControlStore = create<SceneControlState>((set) => ({
  cameraMode: "reset",
  turnTable: false,

  setCameraMode: (mode) =>
    set({
      cameraMode: mode,
      turnTable: mode === "free",
    }),
}));
