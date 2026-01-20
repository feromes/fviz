import { create } from "zustand";
import { usePeriodStore } from "./periodStore";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type HAGMeta = {
  min: number;
  max: number;
  unit: string;
};

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

  hag?: HAGMeta;
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

async function loadMDTMeta(
  favelaId: string,
  period: number
): Promise<MDTMeta | null> {
  try {
    const res = await fetch(
      `/api/favela/${favelaId}/periodos/${period}/mdt.json`
    );

    if (!res.ok) return null;

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.warn(
        `[FVIZ] MDT inválido para ${favelaId} (${period}) — content-type: ${contentType}`
      );
      return null;
    }

    return await res.json();
  } catch (err) {
    console.warn(
      `[FVIZ] Erro ao carregar MDT de ${favelaId} (${period})`,
      err
    );
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
   * conforme o período ativo
   */
  async loadFavelas() {
    const period = usePeriodStore.getState().period;
    const url = `/api/favelas_${period}.json`;

    console.log(`[FVIZ] Carregando catálogo: ${url}`);

    let res: Response;

    try {
      res = await fetch(url);
    } catch (err) {
      console.warn(
        `[FVIZ] Falha de rede ao carregar favelas (${period})`,
        err
      );
      set({ favelas: [], favelaAtiva: null });
      return;
    }

    if (!res.ok) {
      console.warn(
        `[FVIZ] Nenhum catálogo encontrado para o período ${period}`
      );
      set({ favelas: [], favelaAtiva: null });
      return;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.warn(
        `[FVIZ] Resposta inválida para favelas_${period}.json — content-type: ${contentType}`
      );
      set({ favelas: [], favelaAtiva: null });
      return;
    }

    let data: FavelaResumo[];

    try {
      data = await res.json();
    } catch (err) {
      console.warn(
        `[FVIZ] Erro ao interpretar JSON de favelas_${period}.json`,
        err
      );
      set({ favelas: [], favelaAtiva: null });
      return;
    }

    set({ favelas: data });

    const previousFavelaId = get().favelaAtiva?.id ?? null;

    const initial =
      (previousFavelaId
        ? data.find(f => f.id === previousFavelaId)
        : null) ??
      data.find(f => f.id === "sao_remo") ??
      data[0] ??
      null;


    if (!initial) {
      set({ favelaAtiva: null });
      return;
    }

    const mdt = await loadMDTMeta(initial.id, period);

    set({
      favelaAtiva: {
        ...initial,
        mdt: mdt ?? undefined,
      },
    });
  },

  /**
   * Seleciona uma favela pelo id
   * respeitando o período ativo
   */
  async selectFavela(id) {
    const period = usePeriodStore.getState().period;
    const favela = get().favelas.find(f => f.id === id);

    if (!favela) return;

    const mdt = await loadMDTMeta(favela.id, period);

    set({
      favelaAtiva: {
        ...favela,
        mdt: mdt ?? undefined,
      },
    });
  },
}));
