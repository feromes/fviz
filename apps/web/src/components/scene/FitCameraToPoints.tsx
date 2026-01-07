import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Box3, Vector3 } from 'three';

type FitCameraToPointsProps = {
  pointsGeometry: THREE.BufferGeometry | null;
};

function FitCameraToPoints({ pointsGeometry }: FitCameraToPointsProps) {
  const { camera, controls, size } = useThree();

  // 🔒 garante execução única
  const didFitRef = useRef(false);

  useEffect(() => {
    if (!pointsGeometry) return;
    if (!controls) return;
    if (didFitRef.current) return;

    didFitRef.current = true; // 🔑 trava definitiva

    // 1) Calcula o bounding box
    const bb = new Box3().setFromBufferAttribute(
      pointsGeometry.getAttribute('position')
    );

    const center = new Vector3();
    const sizeBB = new Vector3();
    bb.getCenter(center);
    bb.getSize(sizeBB);

    // 2) Define o target do OrbitControls
    controls.target.copy(center);

    // 3) Distância ideal (mantida exatamente como a sua)
    const maxDim = Math.max(sizeBB.x, sizeBB.y, sizeBB.z);
    const distance = maxDim * 1.6;

    // 4) Posição padrão (45° / 45°) — IGUAL À SUA
    camera.position.set(
      0,
      distance * -0.707,
      distance * 0.707
    );

    // 5) FOV e planos
    camera.fov = 55;
    camera.near = distance * 0.001;
    camera.far = distance * 10;
    camera.updateProjectionMatrix();

    // 6) Atualiza controles
    controls.update();

    // 🔥 estado inicial correto do OrbitControls
    controls.saveState();

    console.log('✅ FitCameraToPoints aplicado uma única vez');
  }, [pointsGeometry, camera, controls, size]);

  return null;
}

export default FitCameraToPoints;
