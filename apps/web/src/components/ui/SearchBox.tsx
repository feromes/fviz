import { useState, useMemo, useRef, useEffect } from "react";

export function SearchBox({
  items = [],
  onSelect = () => {},
  placeholder = "Buscar…",
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Filtragem simples
  const filtered = useMemo(() => {
    if (!query) return items;
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  return (
    <div ref={ref} className="absolute top-4 left-4 w-64 z-50">
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />

      {open && (
        <ul className="menu bg-base-100 rounded-box shadow-lg mt-2 max-h-64 overflow-auto">
          {filtered.length === 0 && (
            <li className="p-2 text-sm opacity-50">Nenhum resultado</li>
          )}

          {filtered.map((item) => (
            <li key={item}>
              <button
                onClick={() => {
                  setQuery(item);
                  setOpen(false);
                  onSelect(item);
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
