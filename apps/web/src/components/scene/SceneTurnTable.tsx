import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ReactNode, RefObject } from "react";

interface SceneTurnTableProps {
  enabled: boolean;
  speed?: number;
  sceneRef: RefObject<THREE.Group>;
  children: ReactNode;
}

export default function SceneTurnTable({
  enabled,
  speed = 0.6,
  sceneRef,
  children,
}: SceneTurnTableProps) {
  useFrame((_, delta) => {
    if (!enabled) return;
    const g = sceneRef.current;
    if (!g) return;

    g.rotation.z += delta * speed;
  });

  return <group ref={sceneRef}>{children}</group>;
}
