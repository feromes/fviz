import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

type MDTSceneProps = {
  mdtUrl: string;
  size?: [number, number];
  displacementScale?: number;
};

export default function MDTScene({
  mdtUrl,
  size,
  displacementScale = 200,
}: MDTSceneProps) {
  if (!size) return null; // ⛔ nada de WebGL inválido

  const texture = useLoader(TextureLoader, mdtUrl);

  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.NoColorSpace;

  return (
    <mesh rotation={[0, 0, 0]}>
      <planeGeometry args={[size[0], size[1], 256, 256]} />

      <meshStandardMaterial
        map={texture}
        displacementMap={texture}
        displacementScale={displacementScale}
        alphaMap={texture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
