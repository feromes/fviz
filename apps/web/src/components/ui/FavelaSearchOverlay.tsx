import { useFavelaStore } from "../../state/favelaStore";
import FavelaCard from "./FavelaCard";
import { useOverlayStore } from "../../state/overlayStore";



type FavelaSearchOverlayProps = {
  open: boolean;
  searchQuery?: string;   // 👈 opcional
  searchMode: SearchMode;
  onClose: () => void;
};


type SearchMode = "name" | "neighbor" | "hex";


export default function FavelaSearchOverlay({
  open,
  searchQuery,
  searchMode,
  onClose,
}: FavelaSearchOverlayProps) {
  const favelas = useFavelaStore((s) => s.favelas);
  const selectFavela = useFavelaStore((s) => s.selectFavela);
  const favelaAtiva = useFavelaStore((s) => s.favelaAtiva);
  const hexRef = useOverlayStore((s) => s.hexRef);


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

    if (searchMode === "hex" && hexRef) {
      const ref = hexRef.center; // [lng, lat]

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
        fixed z-40
        left-0 right-0
        bg-white/90
        backdrop-blur
      "
      style={{
        top: 56, // logo abaixo da TopBar (h-14)
        height: "calc((var(--vh, 1vh) * 100) - 56px - 64px)",
      }}
    >
      {/* Área scrollável */}
      <div className="h-full overflow-y-auto px-4 py-4 space-y-3">
        {ordered.map((favela) => {
          const isNeighborMode =
            searchMode === "neighbor" &&
            favelaAtiva?.centroid &&
            favela.centroid;

          const isHexMode =
            searchMode === "hex" &&
            hexRef &&
            favela.centroid;

          return (
            <FavelaCard
              key={favela.id}
              favela={favela}
              active={favela.id === favelaAtiva?.id}
              distanceM={
                isHexMode
                  ? distance2D(favela.centroid, hexRef.center)
                  : isNeighborMode
                  ? distance2D(favela.centroid, favelaAtiva.centroid)
                  : undefined
              }
              distanceRef={
                isHexMode
                  ? { type: "hex" }
                  : isNeighborMode
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
