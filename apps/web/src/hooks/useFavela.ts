import { useFavelaStore } from "../state/favelaStore";

export function useFavela() {
  const favela = useFavelaStore(s => s.favelaAtiva);

  if (!favela) return null;

  return {
    ...favela,

    // assets
    iconUrl: `/api/${favela.icon}`,

    // caminhos base
    basePath: `/api/favela/${favela.id}`,

    // 🔽 caminhos semânticos da nuvem
    pointCloudPath: `/api/favela/${favela.id}/pointcloud`,
    flazUrl: `/api/favela/${favela.id}/2017.flaz`, // fixo por enquanto (como você quer)

    // 🔽 metadados explícitos (auto-documentação)
    pointCloudMeta: {
      bb_normalizado: favela.bb_normalizado,
      resolucao: favela.resolucao,
      offset: favela.offset,
      point_count: favela.point_count,
    },
  };
}

