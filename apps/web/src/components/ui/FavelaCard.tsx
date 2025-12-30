import type { FavelaResumo } from "../../state/favelaStore";

type FavelaCardProps = {
  favela: FavelaResumo;
  onClick?: () => void;
};

export default function FavelaCard({ favela, onClick }: FavelaCardProps) {
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
      style={{
        height: 64,
        borderRadius: 12,
      }}
    >
      {/* Ícone */}
      <img
        src={`/api/${favela.icon}`}
        alt={favela.nome}
        className="w-8 h-8"
      />

      {/* Texto */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-gray-900">
          {favela.nome}
        </span>

        <span className="text-xs text-gray-500">
          {Math.round(favela.dist_se_m / 1000 * 10) / 10} km
        </span>
      </div>
    </div>
  );
}
