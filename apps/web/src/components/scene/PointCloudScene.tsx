import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

import SceneTurnTable from "./SceneTurnTable";
import { PointCloud } from "./PointCloud";

import { useFavelaStore } from "../../state/favelaStore";
import { useSceneControlStore } from "../../state/sceneControlStore";
import { useEffect } from "react";


export default function PointCloudScene() {
  const favelaAtiva = useFavelaStore((s) => s.favelaAtiva);

  const controlsRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Group>(null);

  const turnTable = useSceneControlStore((s) => s.turnTable);

  const cameraMode = useSceneControlStore((s) => s.cameraMode);

  useEffect(() => {
    const controls = controlsRef.current;
    const group = sceneRef.current;
    if (!controls) return;

    const camera = controls.object as THREE.PerspectiveCamera;
    const target = new THREE.Vector3(0, 0, 0);

    controls.target.copy(target);

    // distância "padrão" baseada na distância atual
    const dist = camera.position.distanceTo(target) || 8000;

    if (cameraMode === "reset") {
      // ✅ reset = vista 3D (não top)
      controls.reset();
      group?.rotation.set(0, 0, 0);

      // camera.position.set(dist * 0.8, -dist * 0.8, dist * 0.55);
      // camera.up.set(0, 1, 0);
      // camera.lookAt(target);

      // controls.update();
      // controls.saveState(); // 🔥 faz o controls.reset voltar pra esse preset
      return;
    }

    if (cameraMode === "top") {
      // ✅ top = vista superior real
      group?.rotation.set(0, 0, 0);

      camera.position.set(target.x, target.y, target.z + dist);
      camera.up.set(0, 1, 0);
      camera.lookAt(target);

      controls.update();
      // controls.saveState();
      console.log("Setou câmera para top view");
      return;
    }
  }, [cameraMode]);



  if (!favelaAtiva) {
    console.log("PointCloudScene: favelaAtiva ainda não definida");
    return null;
  }

  const favela = favelaAtiva;
  const pointCloudUrl = `/api/favela/${favela.id}/periodos/2017/flaz.arrow`;

  return (
    <Canvas
      camera={{
        position: [0, 0, 1000 / 0.125],
        near: 1,
        far: 1000 / 0.125,
      }}
      className="w-full h-full"
    >
      <ambientLight />
      <OrbitControls ref={controlsRef} makeDefault />

      {/* <mesh position={[0, 0, 0]}>
        <boxGeometry args={[100, 100, 100]} />
        <meshStandardMaterial color="red" />
      </mesh> */}

    <SceneTurnTable enabled={turnTable} sceneRef={sceneRef}>
      {pointCloudUrl && (
        <PointCloud url={pointCloudUrl} meta={favela} />
      )}
    </SceneTurnTable>

    </Canvas>
  );
}
