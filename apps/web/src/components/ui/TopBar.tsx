import Logo from "../../assets/icons/Logo.svg";
import HamburguerMenu from "../../assets/icons/HamburguerMenu.svg";

export default function TopBar() {
  return (
    <header
      className="h-14 w-full flex items-center px-4"
      style={{ backgroundColor: "#EDEDED" }}
    >
      {/* Grupo esquerdo */}
      <div className="flex items-center">
        {/* Hamburguer */}
        <button
          className="w-8 h-8 flex items-center justify-center cursor-pointer"
          aria-label="Abrir menu"
        >
          <img
            src={HamburguerMenu}
            alt=""
            className="w-6 h-6 select-none"
          />
        </button>

        {/* Espaço consciente */}
        <div className="w-4" /> {/* 16px */}

        {/* Logo */}
        <img
          src={Logo}
          alt="FVIZ"
          className="h-[44px] w-auto select-none"
        />
      </div>
    </header>
  );
}
