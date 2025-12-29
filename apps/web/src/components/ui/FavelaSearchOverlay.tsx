import { useFavelaStore } from "../../state/favelaStore";
import FavelaCard from "./FavelaCard";

type FavelaSearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function FavelaSearchOverlay({
  open,
  onClose,
}: FavelaSearchOverlayProps) {
  const favelas = useFavelaStore((s) => s.favelas);

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
        {favelas.map((favela) => (
          <FavelaCard key={favela.id} favela={favela} />
        ))}
      </div>
    </div>
  );
}
