
import { useFavelaStore } from "../state/favelaStore";
import { usePeriodStore } from "../state/periodStore";


export function useFavela() {
  const favela = useFavelaStore((s) => s.favelaAtiva);
  const period = usePeriodStore((s) => s.period);

  if (!favela) return null;

  return {
    ...favela,

    // 🔹 assets
    iconUrl: `/api/${favela.icon}`,

    // 🔹 caminhos base
    basePath: `/api/favela/${favela.id}`,

    // 🔹 período ativo
    period,

    // 🔹 nuvem de pontos
    flazUrl: `/api/favela/${favela.id}/periodos/${period}/flaz.arrow`,
    hagUrl: `/api/favela/${favela.id}/periodos/${period}/hag_flaz.arrow`,
    vvvUrl: `/api/favela/${favela.id}/periodos/${period}/via_viela_vazio_flaz.arrow`,

    // 🔹 metadados explícitos
    pointCloudMeta: {
      bb_normalizado: favela.bb_normalizado,
      resolucao: favela.resolucao,
      offset: favela.offset,
      point_count: favela.point_count,
    },
  };
}

