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
  const triggerReset3D = useSceneControlStore((s) => s.triggerReset3D);

  const controlsRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Group>(null);

  const turnTable = useSceneControlStore((s) => s.turnTable);

  const reset3D = useSceneControlStore((s) => s.reset3D);

  useEffect(() => {
    if (!sceneRef.current || !controlsRef.current) return;

    sceneRef.current.rotation.set(0, 0, 0);
    controlsRef.current.reset();
  }, [reset3D]);

  useEffect(() => {
    if (!favelaAtiva) return;

    // 🧘 sempre começa parada e bem posicionada
    triggerReset3D();
  }, [favelaAtiva, triggerReset3D]);


  const topView = useSceneControlStore((s) => s.topView);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || !favelaAtiva) return;

    const camera = controls.object as THREE.PerspectiveCamera;

    // 🎯 centro da cena (favela já está normalizada)
    const target = new THREE.Vector3(0, 0, 0);
    controls.target.copy(target);

    const distance = 2000; // pode ajustar depois via bbox

    // 🔝 TOP VIEW = deslocamento no eixo Z (Z-up world)
    camera.position.set(
      target.x,
      target.y,
      target.z + distance
    );

    // ⚠️ eixo vertical CORRETO para mundo Z-up
    camera.up.set(0, 1, 0);

    camera.lookAt(target);
    controls.update();
    console.log("PointCloudScene: Top View ativado");
  }, [topView, favelaAtiva]);



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

    <SceneTurnTable enabled={turnTable} sceneRef={sceneRef}>
      {pointCloudUrl && (
        <PointCloud url={pointCloudUrl} meta={favela} />
      )}
    </SceneTurnTable>

    </Canvas>
  );
}
