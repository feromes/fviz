import { Canvas } from "@react-three/fiber";
import RotatingCube from "./components/scene/RotatingCube";
import { SearchBox } from "./components/ui/SearchBox";

export default function App() {
  const favelas = [
    "Heliópolis",
    "Paraisópolis",
    "São Remo",
    "Rocinha",
    "Jacarezinho",
  ];

  function handleSelect(item: string) {
    console.log("Selecionado:", item);
  }

  return (
    <div className="w-screen h-screen relative">
      {/* HUD */}
      <SearchBox items={favelas} onSelect={handleSelect} />

      {/* CENA 3D */}
      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight />
        <RotatingCube />
      </Canvas>
    </div>
  );
}

