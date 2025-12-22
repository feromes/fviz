import Reset3DIcon from "../../assets/icons/Reset3D.svg";

export default function BottomDock() {
  return (
    <footer className="h-16 w-full bg-[#EDEDED] flex items-center justify-center">
      <button
        type="button"
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
        <img
          src={Reset3DIcon}
          alt=""
          className="h-8 w-8"
        />
      </button>
    </footer>
  );
}
