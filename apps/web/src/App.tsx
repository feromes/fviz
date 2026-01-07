import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./styles/leaflet.css";
import * as THREE from "three";

import { useFavelaStore } from "./state/favelaStore";
import { useUIStore } from "./state/uiStore";
import { useOverlayStore } from "./state/overlayStore";

import SideDrawer, { DRAWER_WIDTH } from "./components/layout/SideDrawer";
import TopBar from "./components/ui/TopBar";
import BottomDock from "./components/ui/BottomDock";
import FavelaCard from "./components/ui/FavelaCard";
import FavelaSearchOverlay from "./components/ui/FavelaSearchOverlay";

import ColorBar from "./components/scene/ColorBar";
import H3LeafletMap from "./components/map/H3LeafletMap";

import SceneRouter from "./components/scene/SceneRouter";


export default function App() {
  const controlsRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Group>(null);

  const isMenuOpen = useUIStore((s) => s.isMenuOpen);
  const activeOverlay = useOverlayStore((s) => s.activeOverlay);
  const clearOverlay = useOverlayStore((s) => s.clearOverlay);

  const [searchQuery, setSearchQuery] = useState("");

  const loadFavelas = useFavelaStore((s) => s.loadFavelas);
  const favelas = useFavelaStore((s) => s.favelas);
  const favelaAtiva = useFavelaStore((s) => s.favelaAtiva);
  const selectFavela = useFavelaStore((s) => s.selectFavela);

  useEffect(() => {
    if (!favelaAtiva && favelas.length > 0) {
      selectFavela(favelas[0]); // São Remo, aleatória, etc.
    }
  }, [favelaAtiva, favelas, selectFavela]);


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

  const pointCloudUrl = favelaAtiva
    ? `/api/favela/${favelaAtiva.id}/periodos/2017/flaz.arrow`
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
          {favelaAtiva && (
            <div
              className="absolute z-30"
              style={{ top: 16, left: 16, right: 16 }}
            >
              <FavelaCard favela={favelaAtiva} />
            </div>
          )}

          {/* Cena 3D / MDT */}
          <SceneRouter/>

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
