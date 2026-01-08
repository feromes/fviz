import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

import SceneTurnTable from "./SceneTurnTable";
import { PointCloud } from "./PointCloud";

import { useFavelaStore } from "../../state/favelaStore";
import { useSceneControlStore } from "../../state/sceneControlStore";
import { useEffect } from "react";

import MDTScene from "./MDTScene";
import MDTSceneVoxel from "./MDTSceneVoxel";
import { useSceneStore } from "../../state/sceneStore";
import { sizeFromBounds } from "../../utils/mdt";

export default function PointCloudScene() {
  const favelaAtiva = useFavelaStore((s) => s.favelaAtiva);

  const controlsRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Group>(null);

  const turnTable = useSceneControlStore((s) => s.turnTable);

  const cameraMode = useSceneControlStore(s => s.cameraMode);
  const cameraTick = useSceneControlStore(s => s.cameraTick);

  const scene = useSceneStore((s) => s.scene);

  useEffect(() => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const camera = controls.object as THREE.PerspectiveCamera;
    const target = new THREE.Vector3(0, 0, 0);

    if (cameraMode === "reset") {
      sceneRef.current?.rotation.set(0, 0, 0);
      controls.reset();
      controls.update();
      return;
    }

    if (cameraMode === "top") {
      const dist = camera.position.distanceTo(target) || 1000;

      camera.position.set(target.x, target.y, target.z + dist);
      camera.up.set(0, 1, 0);
      camera.lookAt(target);

      controls.update();
      return;
    }

  }, [cameraMode, cameraTick]); // 🔥 TICK É A CHAVE


  if (!favelaAtiva) {
    console.log("PointCloudScene: favelaAtiva ainda não definida");
    return null;
  }

  const favela = favelaAtiva;
  const mdtSize = sizeFromBounds(favela.mdt?.bounds);
  const pointCloudUrl = `/api/favela/${favela.id}/periodos/2017/flaz.arrow`;
  const mdtUrl = `/api/favela/${favela.id}/periodos/2017/mdt.png`;

  console.log("favela:", favela);
  console.log("mdt_size:", favela?.mdt_size);

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
      {scene === "pointcloud" && pointCloudUrl && (
        <PointCloud url={pointCloudUrl} meta={favela} />
      )}

      {scene === "mdt" && mdtSize && (
        <MDTScene
          mdtUrl={mdtUrl}
          size={mdtSize}
          displacementScale={favela.mdt_scale ?? 200}
        />
      )}

      {/* {scene === "mdt" && (
        <MDTSceneVoxel
          url="/api/favela/sao_remo/periodos/2017/mds.png"
          pixelSize={8}
          heightScale={0.8}
          step={2}        // começa com 2 pra não matar performance
          nodata={0}
          minHeight={2}
        />
      )} */}

    </SceneTurnTable>

    </Canvas>
  );
}
