import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import saoRemoMeta from "./data/sao_remo.json";
import { PointCloud } from "./components/scene/PointCloud";
import BottomDock from "./components/ui/BottomDock";

export default function App() {
  return (
    <div className="h-screen w-screen">
      {/* Área do Canvas: altura total menos 64px do rodapé */}
      <div className="h-[calc(100vh-64px)] w-full">
        <Canvas
          camera={{
            position: [0, 0, 1000 / 0.125],
            near: 1,
            far: 5000 / 0.125,
          }}
        >
          <ambientLight />
          <OrbitControls makeDefault />
          <PointCloud url="/data/sao_remo_2017.arrow" meta={saoRemoMeta} />
        </Canvas>
      </div>

      {/* Dock inferior */}
      <BottomDock />
    </div>
  );
}
