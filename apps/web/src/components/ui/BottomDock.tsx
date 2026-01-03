import Reset3DIcon from "../../assets/icons/Reset3D.svg";
import TopViewIcon from "../../assets/icons/TopView.svg";
import TurnTableIcon from "../../assets/icons/TurnTable.svg";
import VizinhancaIcon from "../../assets/icons/Vizinhanca.svg";
import LegendaIcon from "../../assets/icons/Legenda.svg";

import { useColorMapStore } from "../../state/colorMapStore";

type BottomDockProps = {
  onTurnTable?: () => void;
  onReset3D?: () => void;
  onTopView?: () => void;

  onNeighborSearch?: () => void; // 🔽 NOVO
};

export default function BottomDock({
  onTurnTable,
  onReset3D,
  onTopView,
  onNeighborSearch,
}: BottomDockProps) {
  const { visible, toggleVisible } = useColorMapStore();

  return (
    <footer className="h-16 w-full bg-[#EDEDED] flex items-center justify-center">
      <div className="flex items-center gap-2">

        {/* Vizinhança */}
        <button
          type="button"
          onClick={onNeighborSearch}
          aria-label="Buscar favelas por vizinhança"
          className="
            h-10 w-10
            flex items-center justify-center
            rounded-xl
            hover:bg-black/10
            active:scale-95
            transition
          "
        >
          <img src={VizinhancaIcon} alt="" className="h-6 w-6" />
        </button>

        {/* TurnTable */}
        <button
          type="button"
          onClick={onTurnTable}
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
          onClick={onReset3D}
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
          onClick={onTopView}
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
          onClick={toggleVisible}
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
