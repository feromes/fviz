import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

import saoRemoMeta from "./data/sao_remo.json";
import { PointCloud } from "./components/scene/PointCloud";
import BottomDock from "./components/ui/BottomDock";

export default function App() {
  const controlsRef = useRef<any>(null);

  function handleReset3D() {
    controlsRef.current?.reset();
  }

  return (
    <div className="h-screen w-screen">
      <div className="h-[calc(100vh-64px)] w-full">
        <Canvas
          camera={{
            position: [0, 0, 1000 / 0.125],
            near: 1,
            far: 5000 / 0.125,
          }}
        >
          <ambientLight />
          <OrbitControls ref={controlsRef} makeDefault />
          <PointCloud
            url="/data/sao_remo_2017.arrow"
            meta={saoRemoMeta}
          />
        </Canvas>
      </div>

      <BottomDock onReset3D={handleReset3D} />
    </div>
  );
}
