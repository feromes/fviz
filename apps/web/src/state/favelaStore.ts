import { create } from "zustand";

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

  // 🔽 NOVOS CAMPOS (vindos do favelas.json)
  bb_normalizado: [number, number, number, number, number, number];
  resolucao: number;
  offset: [number, number, number];

  point_count: number;
};


type FavelaState = {
  // dados
  favelas: FavelaResumo[];
  favelaAtiva: FavelaResumo | null;

  // ações
  loadFavelas: () => Promise<void>;
  selectFavela: (id: string) => void;
};

export const useFavelaStore = create<FavelaState>((set, get) => ({
  // estado inicial
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

    // 🎯 escolha inicial: São Remo (fallback seguro)
    const initial =
      data.find(f => f.id === "sao_remo") ??
      data[0] ??
      null;

    set({ favelaAtiva: initial });
  },

  /**
   * Seleciona uma favela pelo id
   */
  selectFavela(id) {
    const favela = get().favelas.find(f => f.id === id);
    if (!favela) return;

    set({ favelaAtiva: favela });
  },
}));
