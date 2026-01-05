import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./styles/leaflet.css";
import * as THREE from "three";

import { useFavelaStore } from "./state/favelaStore";
import { useFavela } from "./hooks/useFavela";
import { useUIStore } from "./state/uiStore";
import { useOverlayStore } from "./state/overlayStore";

import SideDrawer, { DRAWER_WIDTH } from "./components/layout/SideDrawer";
import TopBar from "./components/ui/TopBar";
import BottomDock from "./components/ui/BottomDock";
import FavelaCard from "./components/ui/FavelaCard";
import FavelaSearchOverlay from "./components/ui/FavelaSearchOverlay";

import { PointCloud } from "./components/scene/PointCloud";
import ColorBar from "./components/scene/ColorBar";
import H3LeafletMap from "./components/map/H3LeafletMap";

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
    g.rotation.z += delta * speed;
  });

  return <group ref={sceneRef}>{children}</group>;
}

export default function App() {
  const controlsRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Group>(null);

  const isMenuOpen = useUIStore((s) => s.isMenuOpen);
  const activeOverlay = useOverlayStore((s) => s.activeOverlay);
  const clearOverlay = useOverlayStore((s) => s.clearOverlay);

  const [turnTable, setTurnTable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] =
    useState<"name" | "neighbor">("name");

  const loadFavelas = useFavelaStore((s) => s.loadFavelas);
  const favela = useFavela();

  useEffect(() => {
    loadFavelas();
  }, []);

  // 🔧 viewport height real
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  const pointCloudUrl = favela
    ? `/api/favela/${favela.id}/periodos/2017/flaz.arrow`
    : null;

  function resetSceneRotation() {
    if (!sceneRef.current) return;
    sceneRef.current.rotation.set(0, 0, 0);
  }

  function handleReset3D() {
    setTurnTable(false);
    resetSceneRotation();
    controlsRef.current?.reset();
  }

  function handleTopView() {
    setTurnTable(false);
    resetSceneRotation();

    const controls = controlsRef.current;
    if (!controls) return;

    const camera = controls.object as THREE.PerspectiveCamera;
    const target = controls.target as THREE.Vector3;
    const distance = camera.position.distanceTo(target);

    camera.position.set(target.x, target.y, target.z + distance);
    camera.up.set(0, 1, 0);
    camera.lookAt(target);
    controls.update();
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">

      {/* Drawer lateral */}
      <SideDrawer />

      {/* 🔥 OVERLAY GLOBAL — fora do container com transform */}
      <FavelaSearchOverlay
        open={activeOverlay.startsWith("search_")}
        searchQuery={searchQuery}
        searchMode={
          activeOverlay === "search_neighbor"
            ? "neighbor"
            : activeOverlay === "search_hex"
            ? "hex"
            : "name"
        }
        onClose={clearOverlay}
      />

      {/* 🔽 CONTAINER PRINCIPAL (transformável) */}
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
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* CENA */}
        <div className="relative flex-1">

          {/* Card fixo */}
          {favela && (
            <div
              className="absolute z-30"
              style={{ top: 16, left: 16, right: 16 }}
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
                <PointCloud url={pointCloudUrl} meta={favela} />
              )}
            </SceneTurnTable>
          </Canvas>

          {activeOverlay === "sampa_h3" && (
            <div className="absolute inset-0 z-40 leaflet-desaturated">
              <H3LeafletMap />
            </div>
          )}

          <ColorBar />
        </div>

        {/* Footer fixo */}
        <BottomDock
          onTurnTable={() => setTurnTable((v) => !v)}
          onReset3D={handleReset3D}
          onTopView={handleTopView}
          onNeighborSearch={() => {
            setSearchMode("neighbor");
            setSearchQuery("");
            useOverlayStore.getState().setOverlay("search_neighbor");
          }}
        />
      </div>
    </div>
  );
}
