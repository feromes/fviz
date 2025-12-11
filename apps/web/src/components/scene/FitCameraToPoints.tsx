import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Box3, Vector3 } from 'three';

function FitCameraToPoints({ pointsGeometry }) {
  const { camera, controls, size } = useThree();

  useEffect(() => {
    if (!pointsGeometry) return;

    // 1) Calcula o bounding box
    const bb = new Box3().setFromBufferAttribute(pointsGeometry.getAttribute('position'));

    const center = new Vector3();
    const sizeBB = new Vector3();
    bb.getCenter(center);
    bb.getSize(sizeBB);

    // 2) Define o target do OrbitControls
    if (controls) controls.target.copy(center);

    // 3) Distância ideal sem animação
    const maxDim = Math.max(sizeBB.x, sizeBB.y, sizeBB.z);
    const distance = maxDim * 1.6; // ajustável: 1.6 é perfeito

    // 4) Coloca a câmera numa posição padrão (azimute 45°, elevação 45°)
    camera.position.set(0,distance * -0.707,distance * .707);


    // 5) FOV fixo
    camera.fov = 55;
    camera.near = distance * 0.001;
    camera.far = distance * 10;

    camera.updateProjectionMatrix();

    if (controls) controls.update();
  }, [pointsGeometry, camera, controls, size]);

  return null;
}

export default FitCameraToPoints;
