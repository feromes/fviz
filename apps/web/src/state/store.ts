import { create } from "zustand";

interface Favela {
  nome: string;
  nome_secundario: string;
}

interface StoreState {
  favelas: Favela[];
  favelaSelecionada: Favela | null;

  setFavelas: (items: Favela[]) => void;
  setFavelaSelecionada: (item: Favela) => void;
}

export const useFvizStore = create<StoreState>((set) => ({
  favelas: [],
  favelaSelecionada: null,

  setFavelas: (items) => set({ favelas: items }),
  setFavelaSelecionada: (item) => set({ favelaSelecionada: item }),
}));
