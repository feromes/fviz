import { useEffect, useRef } from "react";

import Logo from "../../assets/icons/Logo.svg";
import HamburguerMenu from "../../assets/icons/HamburguerMenu.svg";
import SearchIcon from "../../assets/icons/Search.svg";

import { useUIStore } from "../../state/uiStore";
import { useOverlayStore } from "../../state/overlayStore";

export default function TopBar({
  className = "",
  searchQuery,
  setSearchQuery,
}: {
  className?: string;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}) {
  const toggleMenu = useUIStore((s) => s.toggleMenu);

  const activeOverlay = useOverlayStore((s) => s.activeOverlay);
  const setOverlay = useOverlayStore((s) => s.setOverlay);
  const clearOverlay = useOverlayStore((s) => s.clearOverlay);

  const searchOpen = activeOverlay.startsWith("search_");

  const inputRef = useRef<HTMLInputElement>(null);

  const isMenuOpen = useUIStore((s) => s.isMenuOpen);

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
        {!isMenuOpen && (
          <button onClick={toggleMenu}>
            <img src={HamburguerMenu} alt="Menu" className="h-6 w-6" />
          </button>
        )}

        {!isMenuOpen && (
          <img
            src={Logo}
            alt="FVIZ"
            className="h-[44px] w-auto select-none"
          />
        )}
      </div>

      {/* CENTRO — Search input */}
      {searchOpen && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar favela…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") clearOverlay();
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
        onClick={() => setOverlay("search_name")}
        className="absolute right-4"
      >
        <img src={SearchIcon} alt="Search" className="h-6 w-6" />
      </button>
    </header>
  );
}
