import type { FavelaResumo } from "../../state/favelaStore";
import { useSceneStore } from "../../state/sceneStore";

type DistanceRef =
  | { type: "se" }
  | { type: "favela"; nome: string };

type FavelaCardProps = {
  favela: FavelaResumo;
  onClick?: () => void;

  distanceM?: number;
  distanceRef?: DistanceRef;
};

export default function FavelaCard({
  favela,
  onClick,
  distanceM,
  distanceRef,
}: FavelaCardProps) {
  const finalDistanceM = distanceM ?? favela.dist_se_m;
  const finalRef: DistanceRef = distanceRef ?? { type: "se" };

  const km =
    finalDistanceM != null
      ? Math.round((finalDistanceM / 1000) * 10) / 10
      : null;

  const refLabel =
    finalRef.type === "favela" ? `da ${finalRef.nome}` : "da Sé";

  const sceneTitle = useSceneStore((s) => s.sceneTitle);
  const scene = useSceneStore((s) => s.scene);

  const sceneLabel =
    sceneTitle ??
    (scene === "pointcloud" ? "Point Cloud" : "MDT");

  return (
    <div
      onClick={onClick}
      className="
        flex items-center gap-3
        px-3
        bg-white
        shadow-sm
        cursor-pointer
        hover:bg-neutral-100
        rounded-lg
        transition
      "
      style={{ height: 64, borderRadius: 12 }}
    >
      <img
        src={`/api/${favela.icon}`}
        alt={favela.nome}
        className="w-8 h-8"
      />

      <div className="flex flex-col leading-tight">
        {/* Linha principal */}
        <span className="text-sm font-semibold text-gray-900">
          {favela.nome}
          <span className="mx-1 opacity-40">|</span>
          <span className="font-normal text-gray-700">
            {sceneLabel}
          </span>
        </span>

        {/* Distância */}
        {km != null && (
          <span className="text-xs text-gray-500">
            {km} km {refLabel}
          </span>
        )}
      </div>
    </div>
  );
}
