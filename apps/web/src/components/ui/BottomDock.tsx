import Reset3DIcon from "../../assets/icons/Reset3D.svg";
import TopViewIcon from "../../assets/icons/TopView.svg";
import TurnTableIcon from "../../assets/icons/TurnTable.svg";
import VizinhancaIcon from "../../assets/icons/Vizinhanca.svg";
import LegendaIcon from "../../assets/icons/Legenda.svg";
import SampaIcon from "../../assets/icons/Sampa.svg";

import { useOverlayStore } from "../../state/overlayStore";
import { useColorMapStore } from "../../state/colorMapStore";

type BottomDockProps = {
  onTurnTable?: () => void;
  onReset3D?: () => void;
  onTopView?: () => void;
};


export default function BottomDock({
  onTurnTable,
  onReset3D,
  onTopView,
  onNeighborSearch,
}: BottomDockProps) {
  const { visible, toggleVisible } = useColorMapStore();
  const clearOverlay = useOverlayStore((s) => s.clearOverlay);
  const setOverlay = useOverlayStore(s => s.setOverlay);

  return (
    <footer className="h-16 w-full bg-[#EDEDED] flex items-center justify-center">
      <div className="flex items-center gap-2">

      {/* Sampa / Mapa H3 */}
      <button
        type="button"
        onClick={() => setOverlay("sampa_h3")}
        aria-label="Mapa H3 de São Paulo"
        className="
          h-10 w-10
          flex items-center justify-center
          rounded-xl
          hover:bg-black/10
          active:scale-95
          transition
        "
      >
        <img src={SampaIcon} alt="" className="h-6 w-6" />
      </button>

        {/* Vizinhança */}
        <button
          type="button"
          onClick={() => setOverlay("search_neighbor")}
          aria-label="Buscar favelas por vizinhança"
          className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-black/10 active:scale-95 transition"
        >
          <img src={VizinhancaIcon} alt="" className="h-6 w-6" />
        </button>


        {/* TurnTable */}
        <button
          type="button"
          onClick={() => {
            onTurnTable?.();
            clearOverlay();
          }}
          aria-label="Ativar rotação automática (TurnTable)"
          className="
            h-10 w-10
            flex items-center justify-center
            rounded-xl
            hover:bg-black/10
            active:scale-95
            transition
          "
        >
          <img src={TurnTableIcon} alt="" className="h-6 w-6" />
        </button>

        {/* Reset 3D */}
        <button
          type="button"
          onClick={() => {
            onReset3D?.();
            clearOverlay();
          }}
          aria-label="Resetar visualização 3D"
          className="
            h-10 w-10
            flex items-center justify-center
            rounded-xl
            hover:bg-black/10
            active:scale-95
            transition
          "
        >
          <img src={Reset3DIcon} alt="" className="h-6 w-6" />
        </button>

        {/* Top View */}
        <button
          type="button"
          onClick={() => {
            onTopView?.();
            clearOverlay();
          }}
          aria-label="Vista superior (Top View)"
          className="
            h-10 w-10
            flex items-center justify-center
            rounded-xl
            hover:bg-black/10
            active:scale-95
            transition
          "
        >
          <img src={TopViewIcon} alt="" className="h-6 w-6" />
        </button>

        {/* Legenda / ColorBar */}
        <button
          type="button"
          onClick={() => {
            toggleVisible();
            clearOverlay();
          }}
          aria-label="Mostrar/ocultar legenda de cores"
          className={`
            h-10 w-10
            flex items-center justify-center
            rounded-xl
            transition
            active:scale-95
            ${
              visible
                ? "bg-black/10"
                : "hover:bg-black/10"
            }
          `}
        >
          <img src={LegendaIcon} alt="" className="h-6 w-6" />
        </button>

      </div>
    </footer>
  );
}
