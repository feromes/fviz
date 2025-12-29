import { useFavelaStore } from "../state/favelaStore";

export function useFavela() {
  const favela = useFavelaStore(s => s.favelaAtiva);

  if (!favela) return null;

  return {
    ...favela,

    // caminhos derivados (sem carregar nada ainda)
    iconUrl: `/api/${favela.icon}`,
    basePath: `/api/favela/${favela.id}`,
  };
}
