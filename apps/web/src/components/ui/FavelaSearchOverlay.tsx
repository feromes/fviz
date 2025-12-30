import { useFavelaStore } from "../../state/favelaStore";
import FavelaCard from "./FavelaCard";

type FavelaSearchOverlayProps = {
  open: boolean;
  searchQuery: string;
  onClose: () => void;
};


export default function FavelaSearchOverlay({
  open,
  searchQuery,
  onClose,
}: FavelaSearchOverlayProps) {
  const favelas = useFavelaStore((s) => s.favelas);
  const selectFavela = useFavelaStore((s) => s.selectFavela);
  const query = searchQuery.trim().toLowerCase();

  const favelaAtiva = useFavelaStore(s => s.favelaAtiva);


  const filtered = query
    ? favelas.filter((f) =>
        f.nome.toLowerCase().includes(query)
        )
    : favelas;

  if (!open) return null;

  return (
    <div
      className="
        absolute z-40
        left-0 right-0
        bg-white/90
        backdrop-blur
      "
      style={{
        top: 56,        // logo abaixo da TopBar (h-14)
        bottom: 0,
      }}
    >
      {/* Área scrollável */}
      <div className="h-full overflow-y-auto px-4 py-4 space-y-3">
        {filtered.map((favela) => (
          <FavelaCard
            key={favela.id}
            favela={favela}
            active={favela.id === favelaAtiva?.id}
            onClick={() => {
              selectFavela(favela.id);
              onClose();
            }}
          />
        ))}
      </div>
    </div>
  );
}
