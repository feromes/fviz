import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Box3, Vector3 } from "three";

type FitCameraToPointsProps = {
  pointsGeometry: THREE.BufferGeometry | null;
};

export default function FitCameraToPoints({
  pointsGeometry,
}: FitCameraToPointsProps) {
  const { camera, controls } = useThree();

  // 🔒 garante que o ajuste acontece apenas UMA vez
  const didFitRef = useRef(false);

  useEffect(() => {
    if (!pointsGeometry) return;
    if (!controls) return;
    if (didFitRef.current) return;

    didFitRef.current = true; // 🔑 trava definitiva

    // 1) Bounding box da nuvem
    const bb = new Box3().setFromBufferAttribute(
      pointsGeometry.getAttribute("position")
    );

    const center = new Vector3();
    const size = new Vector3();
    bb.getCenter(center);
    bb.getSize(size);

    // 2) Centro da cena
    controls.target.copy(center);

    // 3) Distância segura
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim * 1.6;

    // 4) Posição inicial da câmera (3D isométrico leve)
    camera.position.set(
      center.x + distance * 0.8,
      center.y - distance * 0.8,
      center.z + distance * 0.6
    );

    // 5) Mundo Z-up
    camera.up.set(0, 1, 0);

    // 6) Parâmetros de câmera
    camera.near = distance * 0.001;
    camera.far = distance * 10;
    camera.updateProjectionMatrix();

    // 7) Atualiza controles
    controls.update();

    // 🔥 ESTE saveState agora é seguro
    // porque só roda UMA vez
    controls.saveState();

    console.log("✅ FitCameraToPoints aplicado (uma única vez)");
  }, [pointsGeometry, camera, controls]);

  return null;
}
