import { useEffect, useRef, useState } from "react";

import Logo from "../../assets/icons/Logo.svg";
import HamburguerMenu from "../../assets/icons/HamburguerMenu.svg";
import SearchIcon from "../../assets/icons/Search.svg";

import { useUIStore } from "../../state/uiStore";

export default function TopBar({ className = "" }: { className?: string }) {
  const toggleMenu = useUIStore((s) => s.toggleMenu);

  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // foco automático ao abrir
  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <header
      className={`
        relative
        h-14 w-full
        flex items-center
        px-4
        bg-[#EDEDED]
        shadow-md
        ${className}
      `}
    >
      {/* ESQUERDA — Menu + Logo */}
      <div className="flex items-center gap-3">
        <button onClick={toggleMenu}>
          <img src={HamburguerMenu} alt="Menu" className="h-6 w-6" />
        </button>

        <img
          src={Logo}
          alt="FVIZ"
          className="h-[44px] w-auto select-none"
        />
      </div>

      {/* CENTRO — Search input */}
      {searchOpen && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar favela, distrito…"
            onKeyDown={(e) => {
              if (e.key === "Escape") setSearchOpen(false);
            }}
            className="
              h-9 w-[280px]
              rounded-md
              px-3
              text-sm
              outline-none
              border border-neutral-300
              bg-white
            "
          />
        </div>
      )}

      {/* DIREITA — Search toggle */}
      <button
        onClick={() => setSearchOpen((v) => !v)}
        className="absolute right-4"
      >
        <img src={SearchIcon} alt="Search" className="h-6 w-6" />
      </button>
    </header>
  );
}
