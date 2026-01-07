// src/components/scene/MDTSceneVoxel.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  url: string;
  pixelSize?: number;     // tamanho da célula no mundo
  heightScale?: number;   // escala vertical (valor 0..255 * heightScale)
  step?: number;          // downsample: 1 = todos pixels, 2 = pula de 2 em 2...
  nodata?: number;        // valor nodata (geralmente 0)
  minHeight?: number;     // altura mínima para "não sumir"
};

export default function MDTSceneVoxel({
  url,
  pixelSize = 8,
  heightScale = 1,
  step = 2,
  nodata = 0,
  minHeight = 1,
}: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [count, setCount] = useState(0);

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d1d5db",
        roughness: 1,
        metalness: 0,
      }),
    []
  );

  useEffect(() => {
    let cancelled = false;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;

    img.onload = () => {
      if (cancelled) return;

      const w = img.width;
      const h = img.height;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, w, h).data;

      // 1) primeiro conta quantas instâncias teremos
      let n = 0;
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4;
          const v = data[i]; // canal R (grayscale)
          if (v === nodata) continue;
          n++;
        }
      }

      setCount(n);

      // 2) no próximo tick, quando o instancedMesh já existir com o count certo, preenche matrices
      requestAnimationFrame(() => {
        const inst = meshRef.current;
        if (!inst || cancelled) return;

        const dummy = new THREE.Object3D();

        const halfW = (w * pixelSize) / 2;
        const halfH = (h * pixelSize) / 2;

        let k = 0;
        for (let y = 0; y < h; y += step) {
          for (let x = 0; x < w; x += step) {
            const i = (y * w + x) * 4;
            const v = data[i];
            if (v === nodata) continue;

            const height = Math.max(minHeight, v * heightScale);

            // ✅ centraliza no origin
            const px = x * pixelSize - halfW;
            const py = -(y * pixelSize - halfH); // invertendo Y pra ficar "pra cima" na tela
            const pz = height / 2;

            dummy.position.set(px, py, pz);
            dummy.scale.set(pixelSize, pixelSize, height);
            dummy.updateMatrix();

            inst.setMatrixAt(k, dummy.matrix);
            k++;
          }
        }

        inst.instanceMatrix.needsUpdate = true;
      });
    };

    img.onerror = () => {
      // se cair aqui, quase sempre é URL errada ou CORS bloqueando
      console.warn("MDTSceneVoxel: falhou ao carregar imagem", url);
    };

    return () => {
      cancelled = true;
    };
  }, [url, pixelSize, heightScale, step, nodata, minHeight]);

  if (count === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
}
