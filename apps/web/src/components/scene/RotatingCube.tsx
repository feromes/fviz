// apps/web/src/components/scene/RotatingCube.tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

const RotatingCube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // animação por frame
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.6;
    meshRef.current.rotation.y += delta * 0.8;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#38bdf8"} />
    </mesh>
  );
};

export default RotatingCube;
