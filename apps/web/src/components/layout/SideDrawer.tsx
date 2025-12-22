import { useUIStore } from "../../state/uiStore";

const DRAWER_WIDTH = 280; // px

export default function SideDrawer() {
  const isOpen = useUIStore((s) => s.isMenuOpen);

  return (
    <aside
      className="fixed top-0 left-0 h-screen bg-base-100 z-30 transition-transform duration-300 ease-in-out"
      style={{
        width: DRAWER_WIDTH,
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      }}
    >
      {/* Conteúdo do menu */}
      <div className="p-4">
        <h2 className="text-sm font-semibold">FVIZ</h2>
        {/* itens depois */}
      </div>
    </aside>
  );
}

export { DRAWER_WIDTH };
