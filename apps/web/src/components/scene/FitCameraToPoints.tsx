import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Box3, Vector3 } from 'three';

function FitCameraToPoints({ pointsGeometry }) {
  const { camera, controls, size } = useThree();

  useEffect(() => {
    if (!pointsGeometry) return;
    if (!controls) return;

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

    // 3) Distância ideal
    const maxDim = Math.max(sizeBB.x, sizeBB.y, sizeBB.z);
    const distance = maxDim * 1.6;

    // 4) Posição padrão da câmera (45° / 45°)
    camera.position.set(
      0,
      distance * -0.707,
      distance * 0.707
    );

    // 5) Parâmetros de câmera
    camera.fov = 55;
    camera.near = distance * 0.001;
    camera.far = distance * 10;
    camera.updateProjectionMatrix();

    // 6) Atualiza controles
    controls.update();

    // 🔑 🔑 🔑 LINHA CRÍTICA 🔑 🔑 🔑
    // Diz ao OrbitControls que ESTE é o estado inicial correto
    controls.saveState();

  }, [pointsGeometry, camera, controls, size]);

  return null;
}

export default FitCameraToPoints;
