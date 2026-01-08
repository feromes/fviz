import { create } from "zustand";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type MDTMeta = {
  type: "MDT";
  bounds: [number, number, number, number];
  resolution: [number, number];
  nodata: number;
  stats: {
    min: number;
    max: number;
  };
  crs: string;
  format: string;
  recommended_colormap?: string;
};

export type FavelaResumo = {
  id: string;
  nome: string;
  entidade: "Favela";
  icon: string;
  color: string;

  dist_se_m: number;

  bbox: [number, number, number, number];
  centroid: [number, number];

  periodos: number[];

  bb_normalizado: [number, number, number, number, number, number];
  resolucao: number;
  offset: [number, number, number];

  point_count: number;

  // 🔽 MDT metadata (lazy-loaded)
  mdt?: MDTMeta;
};

type FavelaState = {
  favelas: FavelaResumo[];
  favelaAtiva: FavelaResumo | null;

  loadFavelas: () => Promise<void>;
  selectFavela: (id: string) => Promise<void>;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

async function loadMDTMeta(favelaId: string): Promise<MDTMeta | null> {
  try {
    const res = await fetch(
      `/api/favela/${favelaId}/periodos/2017/mdt.json`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Store                                                              */
/* ------------------------------------------------------------------ */

export const useFavelaStore = create<FavelaState>((set, get) => ({
  favelas: [],
  favelaAtiva: null,

  /**
   * Carrega o catálogo de favelas
   * e define uma favela inicial
   */
  async loadFavelas() {
    const res = await fetch("/api/favelas.json");
    const data: FavelaResumo[] = await res.json();

    set({ favelas: data });

    const initial =
      data.find(f => f.id === "sao_remo") ??
      data[0] ??
      null;

    if (!initial) return;

    const mdt = await loadMDTMeta(initial.id);

    set({
      favelaAtiva: {
        ...initial,
        mdt: mdt ?? undefined,
      },
    });
  },

  /**
   * Seleciona uma favela pelo id
   * e carrega seu MDT metadata
   */
  async selectFavela(id) {
    const favela = get().favelas.find(f => f.id === id);
    if (!favela) return;

    const mdt = await loadMDTMeta(favela.id);

    set({
      favelaAtiva: {
        ...favela,
        mdt: mdt ?? undefined,
      },
    });
  },
}));
