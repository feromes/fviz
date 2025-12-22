import { useUIStore } from "../../state/uiStore";
import Logo from "../../assets/icons/Logo.svg";
import HamburguerMenu from "../../assets/icons/HamburguerMenu.svg";

export default function TopBar() {
  const toggleMenu = useUIStore((s) => s.toggleMenu);

  return (
    <header
      className="h-14 w-full flex items-center px-4"
      style={{ backgroundColor: "#EDEDED" }}
    >
      <button
        onClick={toggleMenu}
        className="w-8 h-8 flex items-center justify-center"
        aria-label="Abrir menu"
      >
        <img src={HamburguerMenu} className="w-6 h-6" />
      </button>

      <div className="w-4" />

      <img src={Logo} className="h-[44px] w-auto" />
    </header>
  );
}
