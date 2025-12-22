import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

import saoRemoMeta from "./data/sao_remo.json";
import { PointCloud } from "./components/scene/PointCloud";
import BottomDock from "./components/ui/BottomDock";

function SceneTurnTable({
  enabled,
  speed = 0.6,
  sceneRef,
  children,
}: {
  enabled: boolean;
  speed?: number;
  sceneRef: React.RefObject<THREE.Group>;
  children: React.ReactNode;
}) {
  useFrame((_, delta) => {
    if (!enabled) return;
    const g = sceneRef.current;
    if (!g) return;

    // ✅ seu mundo é Z-up (você confirmou que isso "funciona")
    g.rotation.z += delta * speed;
  });

  return <group ref={sceneRef}>{children}</group>;
}

export default function App() {
  const controlsRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Group>(null);

  const [turnTable, setTurnTable] = useState(false);

  function resetSceneRotation() {
    if (!sceneRef.current) return;
    sceneRef.current.rotation.set(0, 0, 0);
  }

  function handleTurnTable() {
    setTurnTable((v) => !v);
  }

  function handleReset3D() {
    setTurnTable(false);
    resetSceneRotation();

    // 🔑 sem isso, Reset3D não faz nada de câmera
    controlsRef.current?.reset();
  }

  function handleTopView() {
    setTurnTable(false);
    resetSceneRotation();

    const controls = controlsRef.current;
    if (!controls) return;

    const camera = controls.object as THREE.PerspectiveCamera;
    const target = controls.target as THREE.Vector3;

    // distância atual câmera → target
    const distance = camera.position.distanceTo(target);

    // ✅ TopView em Z-up: sobe no eixo Z e olha pro target
    camera.position.set(target.x, target.y, target.z + distance);
    camera.up.set(0, 1, 0); // mantém orientação estável
    camera.lookAt(target);

    controls.update();
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

          {/* 🔑 precisa do ref para Reset3D e TopView */}
          <OrbitControls ref={controlsRef} makeDefault />

          <SceneTurnTable enabled={turnTable} speed={0.6} sceneRef={sceneRef}>
            <PointCloud url="/data/sao_remo_2017.arrow" meta={saoRemoMeta} />
          </SceneTurnTable>
        </Canvas>
      </div>

      <BottomDock
        onTurnTable={handleTurnTable}
        onReset3D={handleReset3D}
        onTopView={handleTopView}
      />
    </div>
  );
}
