import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

import SceneTurnTable from "./SceneTurnTable";
import { PointCloud } from "./PointCloud";

import { useFavelaStore } from "../../state/favelaStore";

export default function PointCloudScene() {
  const controlsRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Group>(null);

  const favelaAtiva = useFavelaStore((s) => s.favelaAtiva);

  if (!favelaAtiva) {
    console.log("PointCloudScene: favelaAtiva ainda não definida");
    return null;
  }

  const favela = favelaAtiva;
  const pointCloudUrl = `/api/favela/${favela.id}/periodos/2017/flaz.arrow`;

  // const favela = useFavelaStore((s) => s.favela);
  // const pointCloudUrl = favela?.pointCloudUrl;

  console.log("favela =", favela);
  console.log("pointCloudUrl =", pointCloudUrl);


  return (
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

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <SceneTurnTable enabled={true} sceneRef={sceneRef}>
        {pointCloudUrl && (
          <PointCloud url={pointCloudUrl} meta={favela} />
        )}
      </SceneTurnTable>
    </Canvas>
  );
}
