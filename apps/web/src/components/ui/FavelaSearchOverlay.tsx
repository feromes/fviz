import { useFavelaStore } from "../../state/favelaStore";
import FavelaCard from "./FavelaCard";

type FavelaSearchOverlayProps = {
  open: boolean;
  searchQuery: string;
  searchMode: SearchMode;
  onClose: () => void;
};

type SearchMode = "name" | "neighbor";

export default function FavelaSearchOverlay({
  open,
  searchQuery,
  searchMode,
  onClose,
}: FavelaSearchOverlayProps) {
  const favelas = useFavelaStore((s) => s.favelas);
  const selectFavela = useFavelaStore((s) => s.selectFavela);
  const favelaAtiva = useFavelaStore((s) => s.favelaAtiva);

  const query = searchQuery.trim().toLowerCase();
  // const searchMode = DEFAULT_SEARCH_MODE;

  // 🔽 filtro continua exatamente como já estava
  const filtered = query
    ? favelas.filter((f) =>
        f.nome.toLowerCase().includes(query)
      )
    : favelas;

  // 🔽 NOVO: ordenação explícita por modo
  const ordered = (() => {
    if (searchMode === "name") {
      return [...filtered].sort((a, b) =>
        a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
      );
    }
    return filtered;
  })();

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
        top: 56, // logo abaixo da TopBar (h-14)
        bottom: 0,
      }}
    >
      {/* Área scrollável */}
      <div className="h-full overflow-y-auto px-4 py-4 space-y-3">
        {ordered.map((favela) => (
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
