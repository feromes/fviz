import { useFavelaStore } from "../../state/favelaStore";
import FavelaCard from "./FavelaCard";
import { useNeighborStore } from "../../state/neighborStore";


type FavelaSearchOverlayProps = {
  open: boolean;
  searchQuery?: string;   // 👈 opcional
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

  const reference = useNeighborStore((s) => s.reference);

  const query = (searchQuery ?? "").trim().toLowerCase();
  // const searchMode = DEFAULT_SEARCH_MODE;

  // 🔽 filtro continua exatamente como já estava
  const filtered = query
    ? favelas.filter((f) =>
        f.nome.toLowerCase().includes(query)
      )
    : favelas;

  function distance2D(
    a: [number, number],
    b: [number, number]
  ): number {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  const ordered = (() => {
    if (searchMode === "name") {
      return [...filtered].sort((a, b) =>
        a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
      );
    }

    if (searchMode === "neighbor" && favelaAtiva?.centroid) {
      const ref = favelaAtiva.centroid;

      return [...filtered]
        .filter((f) => f.centroid) // segurança extra
        .sort((a, b) =>
          distance2D(a.centroid, ref) -
          distance2D(b.centroid, ref)
        );
    }

    if (searchMode === "neighbor" && reference) {
      const ref = reference; // [lng, lat]

      return [...filtered]
        .filter((f) => f.centroid)
        .sort(
          (a, b) =>
            distance2D(a.centroid, ref) -
            distance2D(b.centroid, ref)
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
        {ordered.map((favela) => {
          const isNeighborMode =
            searchMode === "neighbor" &&
            favelaAtiva?.centroid &&
            favela.centroid;

          return (
            <FavelaCard
              key={favela.id}
              favela={favela}
              active={favela.id === favelaAtiva?.id}
              // 🔽 só passa distância/ref quando for vizinhança
              distanceM={
                isNeighborMode
                  ? distance2D(favela.centroid, favelaAtiva.centroid)
                  : undefined
              }
              distanceRef={
                isNeighborMode
                  ? { type: "favela", nome: favelaAtiva.nome }
                  : undefined
              }
              onClick={() => {
                selectFavela(favela.id);
                onClose();
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
