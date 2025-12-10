import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import RotatingCube from "./components/scene/RotatingCube";
import { SearchBox } from "./components/ui/SearchBox";

import { loadFavelas } from "./loaders/loadFavelas";
import { useFvizStore } from "./state/store";

export default function App() {
  const favelas = useFvizStore((s) => s.favelas);
  const setFavelas = useFvizStore((s) => s.setFavelas);
  const setFavelaSelecionada = useFvizStore((s) => s.setFavelaSelecionada);

  useEffect(() => {
    loadFavelas().then((data) => {
      setFavelas(data);
    });
  }, []);

  return (
    <div className="w-screen h-screen relative">

      <SearchBox
        items={favelas.map((f) => f.nome)}
        onSelect={(nome) => {
          const f = favelas.find((x) => x.nome === nome);
          if (f) setFavelaSelecionada(f);
        }}
        placeholder="Buscar favela…"
      />

      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight />
        <RotatingCube />
      </Canvas>
    </div>
  );
}
