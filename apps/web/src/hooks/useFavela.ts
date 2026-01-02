import { useEffect } from "react";
import { useFavelaStore } from "../state/favelaStore";
import { useColorMapStore } from "../state/colorMapStore";

export function useFavela() {
  const favela = useFavelaStore((s) => s.favelaAtiva);
  const setColorMap = useColorMapStore((s) => s.setColorMap);

  useEffect(() => {
    if (!favela?.elevation) return;

    // 🔁 inicializa o ColorMap junto com a favela
    setColorMap({
      mode: "elevation",
      min: favela.elevation.min,
      max: favela.elevation.max,
      ref: favela.elevation.ref, // "NMM"
      visible: true,
    });
  }, [favela, setColorMap]);

  if (!favela) return null;

  return {
    ...favela,

    // 🔹 assets
    iconUrl: `/api/${favela.icon}`,

    // 🔹 caminhos base
    basePath: `/api/favela/${favela.id}`,

    // 🔹 nuvem de pontos
    pointCloudPath: `/api/favela/${favela.id}/pointcloud`,
    flazUrl: `/api/favela/${favela.id}/2017.flaz`,

    // 🔹 metadados explícitos (auto-documentação)
    pointCloudMeta: {
      bb_normalizado: favela.bb_normalizado,
      resolucao: favela.resolucao,
      offset: favela.offset,
      point_count: favela.point_count,
    },

    // 🔹 metadados semânticos (novo)
    elevationMeta: favela.elevation,
  };
}
