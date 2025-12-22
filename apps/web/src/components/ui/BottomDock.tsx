import Reset3DIcon from "../../assets/icons/Reset3D.svg";
import TopViewIcon from "../../assets/icons/TopView.svg";

type BottomDockProps = {
  onReset3D?: () => void;
  onTopView?: () => void; // ainda não usado
};

export default function BottomDock({
  onReset3D,
  onTopView,
}: BottomDockProps) {
  return (
    <footer className="h-16 w-full bg-[#EDEDED] flex items-center justify-center">
      <div className="flex items-center gap-2">
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
      </div>
    </footer>
  );
}
