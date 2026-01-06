import Logo from "../../assets/icons/Logo.svg";

import MDSIcon from "../../assets/icons/MDS.svg";
import MDTIcon from "../../assets/icons/MDT.svg";
import ClassificacaoIcon from "../../assets/icons/Classificacao.svg";
import HAGIcon from "../../assets/icons/HAG.svg";
import DeltaIcon from "../../assets/icons/Delta.svg";

import HamburguerMenu from "../../assets/icons/HamburguerMenu.svg";

import { useUIStore } from "../../state/uiStore";

export const DRAWER_WIDTH = 320;


type LayerItem = {
  id: string;
  short: string;
  title: string;
  icon: string;
  enabled: boolean;
};

const LAYERS: LayerItem[] = [
  {
    id: "mds",
    short: "MDS",
    title: "Modelo Digital de Superfície",
    icon: MDSIcon,
    enabled: true,
  },
  {
    id: "mdt",
    short: "MDT",
    title: "Modelo Digital de Terreno",
    icon: MDTIcon,
    enabled: false,
  },
  {
    id: "classificacao",
    short: "Classificação",
    title: "Classes originais segundo ASPRS",
    icon: ClassificacaoIcon,
    enabled: false,
  },
  {
    id: "hag",
    short: "ARS",
    title: "Altura em relação ao solo",
    icon: HAGIcon,
    enabled: false,
  },
  {
    id: "delta",
    short: "Delta",
    title: "Diferença entre levantamentos sucessivos",
    icon: DeltaIcon,
    enabled: false,
  },
];

export default function SideDrawer() {
  const isMenuOpen = useUIStore((s) => s.isMenuOpen);
  const toggleMenu = useUIStore((s) => s.toggleMenu);

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50
        h-full w-80
        bg-[#EDEDED]
        shadow-lg
        transform transition-transform duration-300
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{ width: DRAWER_WIDTH }}
    >
      {/* HEADER */}
      <div className="h-14 flex items-center gap-3 px-4 border-b border-neutral-300">
        <button onClick={toggleMenu}>
          <img
            src={HamburguerMenu}
            alt="Fechar menu"
            className="h-6 w-6"
          />
        </button>

        <img
          src={Logo}
          alt="FVIZ"
          className="h-[36px] w-auto select-none"
        />
      </div>

      {/* LISTA DE LAYERS */}
      <nav className="p-4 space-y-2">
        {LAYERS.map((layer) => {
          const isActive = layer.id === "mds"; // por enquanto fixo

          return (
            <button
              key={layer.id}
              disabled={!layer.enabled}
              className={`
                w-full flex items-center gap-3
                px-3 py-2 rounded-md
                text-left
                transition
                ${
                  isActive
                    ? "bg-white shadow-sm"
                    : "hover:bg-neutral-200"
                }
                ${
                  !layer.enabled
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
            >
              <img
                src={layer.icon}
                alt={layer.short}
                className="h-6 w-6"
              />

              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">
                  {layer.short}
                </span>
                <span className="text-xs text-neutral-600">
                  {layer.title}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
