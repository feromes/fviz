import { create } from "zustand";

interface SceneControlState {
  turnTable: boolean;

  reset3D: number;
  topView: number;

  activateTurnTable: () => void;
  triggerReset3D: () => void;
  triggerTopView: () => void;
}

export const useSceneControlStore = create<SceneControlState>((set) => ({
  turnTable: false,

  reset3D: 0,
  topView: 0,

  // 🔁 TurnTable desliga os outros
  activateTurnTable: () =>
    set({
      turnTable: true,
    }),

  // 🔁 Reset desliga TurnTable
  triggerReset3D: () =>
    set((s) => ({
      turnTable: false,
      reset3D: s.reset3D + 1,
    })),

  // 🔁 TopView desliga TurnTable
  triggerTopView: () =>
    set((s) => ({
      turnTable: false,
      topView: s.topView + 1,
    })),
}));
