import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFavelaStore } from "./state/favelaStore";
import { useFavela } from "./hooks/useFavela";
import FavelaSearchOverlay from "./components/ui/FavelaSearchOverlay";
import * as THREE from "three";

import { PointCloud } from "./components/scene/PointCloud";
import BottomDock from "./components/ui/BottomDock";
import TopBar from "./components/ui/TopBar";

import SideDrawer, { DRAWER_WIDTH } from "./components/layout/SideDrawer";
import { useUIStore } from "./state/uiStore";
import FavelaCard from "./components/ui/FavelaCard";

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
  const isMenuOpen = useUIStore((s) => s.isMenuOpen);

  const [turnTable, setTurnTable] = useState(false);

  const loadFavelas = useFavelaStore(s => s.loadFavelas);

  useEffect(() => {
    loadFavelas();
  }, []);

  const favela = useFavela();

  useEffect(() => {
    if (favela) {
      console.log("📦 Favela derivada:", favela);
    }
  }, [favela]);

  const pointCloudUrl = favela
    ? `/api/favela/${favela.id}/periodos/2017/flaz.arrow`
    : null;

  useEffect(() => {
    if (pointCloudUrl) {
      console.log("☁️ PointCloud URL:", pointCloudUrl);
    }
  }, [pointCloudUrl]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="relative w-screen h-screen overflow-hidden">
      <SideDrawer />

      <div 
        className="
          h-full w-full
          flex flex-col
          transition-transform duration-300 ease-in-out
        "
        style={{
          transform: isMenuOpen
            ? `translateX(${DRAWER_WIDTH}px)`
            : "translateX(0)",
        }}
      >

        <TopBar
          className="relative z-20"
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <FavelaSearchOverlay
          open={searchOpen}
          searchQuery={searchQuery}
          onClose={() => setSearchOpen(false)}
        />

        {/* CENA */}
        <div className="relative flex-1">

          {/* CARD FIXO DA FAVELA */}
          {favela && (
            <div
              className="absolute z-30"
              style={{
                top: 16,      // abaixo da TopBar
                left: 16,
                right: 16,
              }}
            >
              <FavelaCard favela={favela} />
            </div>
          )}

          <Canvas
            camera={{
              position: [0, 0, 1000 / 0.125],
              near: 1,
              far: 5000 / 0.125,
            }}
            className="w-full h-full"
          >
            <ambientLight />
            <OrbitControls ref={controlsRef} makeDefault />

            <SceneTurnTable enabled={turnTable} sceneRef={sceneRef}>
              {pointCloudUrl && (
                <PointCloud
                  url={pointCloudUrl}
                  meta={favela} // ainda fixo, tudo bem por enquanto
                />
              )}
            </SceneTurnTable>

          </Canvas>
        </div>

        <BottomDock
          onTurnTable={handleTurnTable}
          onReset3D={handleReset3D}
          onTopView={handleTopView}
          className="z-20 shrink-0"
        />

      </div>
    </div>
  );
}
