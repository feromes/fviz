// src/components/scene/MDTScene.tsx
import { useMemo } from "react";
import * as THREE from "three";

export default function MDTScene() {
  const mesh = useMemo(() => {
    const geometry = new THREE.BoxGeometry(300, 300, 50);
    const material = new THREE.MeshStandardMaterial({
      color: "#8B5CF6",
      roughness: 0.7,
      metalness: 0.1,
    });

    return new THREE.Mesh(geometry, material);
  }, []);

  return <primitive object={mesh} />;
}
