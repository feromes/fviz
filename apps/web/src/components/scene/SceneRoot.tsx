// src/components/scene/SceneRoot.tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useUIStore } from "../../state/uiStore";

export default function SceneRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const turnTable = useUIStore((s) => s.turnTableEnabled);
  const speed = 0.6;

  useFrame((_, delta) => {
    if (!turnTable) return;
    if (!groupRef.current) return;

    groupRef.current.rotation.z += delta * speed;
  });

  return <group ref={groupRef}>{children}</group>;
}
