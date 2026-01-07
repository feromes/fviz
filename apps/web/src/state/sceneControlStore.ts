import { create } from "zustand";

type CameraMode = "free" | "reset" | "top";

type SceneControlState = {
  cameraMode: CameraMode;
  cameraTick: number;

  turnTable: boolean;

  triggerReset: () => void;
  triggerTopView: () => void;
  toggleTurnTable: () => void;
};

export const useSceneControlStore = create<SceneControlState>((set) => ({
  cameraMode: "free",
  cameraTick: 0,

  turnTable: false,

  triggerReset: () =>
    set((s) => ({
      cameraMode: "reset",
      cameraTick: s.cameraTick + 1,
      turnTable: false, // 🔥 reset sempre para rotação
    })),

  triggerTopView: () =>
    set((s) => ({
      cameraMode: "top",
      cameraTick: s.cameraTick + 1,
      turnTable: false, // 🔥 topView sempre para rotação
    })),

  toggleTurnTable: () =>
    set((s) => ({
      cameraMode: "free", // 🔑 modo livre
      turnTable: !s.turnTable,
    })),
}));
