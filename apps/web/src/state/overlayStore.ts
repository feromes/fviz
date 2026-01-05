import { create } from "zustand";

/**
 * Modos globais de overlay
 */
export type OverlayMode =
  | "none"
  | "sampa_h3"
  | "search_name"
  | "search_neighbor"
  | "search_hex";

/**
 * Referência espacial vinda de um hexágono H3
 * ⚠️ REGRA DE OURO:
 * center SEMPRE em [lng, lat]
 */
export type HexRef = {
  h3: string;
  center: [number, number]; // [lng, lat]
};

type OverlayState = {
  /** Overlay ativo no momento */
  activeOverlay: OverlayMode;

  /** Referência de hex quando em modo search_hex */
  hexRef?: HexRef;

  /** Ativa um overlay simples (sem contexto extra) */
  setOverlay: (mode: OverlayMode) => void;

  /** Ativa busca por hex + guarda referência */
  setHexSearch: (hex: HexRef) => void;

  /** Limpa qualquer overlay e contexto */
  clearOverlay: () => void;
};

export const useOverlayStore = create<OverlayState>((set) => ({
  activeOverlay: "none",
  hexRef: undefined,

  setOverlay: (mode) =>
    set({
      activeOverlay: mode,
    }),

  setHexSearch: (hex) =>
    set({
      activeOverlay: "search_hex",
      hexRef: {
        h3: hex.h3,
        center: hex.center, // ✅ já deve vir [lng, lat]
      },
    }),

  clearOverlay: () =>
    set({
      activeOverlay: "none",
      hexRef: undefined,
    }),
}));
