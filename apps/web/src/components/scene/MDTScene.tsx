import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

export default function MDTScene() {
  const texture = useLoader(
    TextureLoader,
    "/api/favela/sao_remo/periodos/2017/mdt.png"
  );

  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.NoColorSpace;

  return (
    <mesh rotation={[0, 0, 0]}>
      <planeGeometry args={[3000, 3000, 256, 256]} />

      <meshStandardMaterial
        map={texture}
        displacementMap={texture}
        displacementScale={200}
        alphaMap={texture}   // 🔥 aqui está o truque
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
