import { useEffect, useState } from "react";
import * as THREE from "three";
import { flazColor } from "../../utils/flazColor";

type MDTSceneProps = {
  mdtUrl: string;
  size: [number, number];
  displacementScale?: number;
  segments?: number;
};

export default function MDTScene({
  mdtUrl,
  size,
  displacementScale = 200,
  segments = 256,
}: MDTSceneProps) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  // mesma escala da nuvem (1 unidade = 12.5 cm)
  const SCALE = 1 / 0.125;

  useEffect(() => {
    let cancelled = false;

    async function build() {
      // 1️⃣ carregar imagem
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = mdtUrl;
      await img.decode();

      const w = img.width;
      const h = img.height;

      // 2️⃣ canvas para ler pixels
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const { data } = ctx.getImageData(0, 0, w, h);

      // 3️⃣ geometria
      const geom = new THREE.PlaneGeometry(
        size[0],
        size[1],
        w - 1,
        h - 1
      );

      const pos = geom.attributes.position.array as Float32Array;
      const colors = new Float32Array(w * h * 3);

      // 4️⃣ preencher vértices
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = y * w + x;

          const px = i * 4;
          const hNorm = data[px] / 255; // grayscale

          // z (deslocamento)
          pos[i * 3 + 2] = hNorm * displacementScale;

          // cor (mesma função do ColorBar)
          const [r, g, b] = flazColor(hNorm);

          colors[i * 3 + 0] = r;
          colors[i * 3 + 1] = g;
          colors[i * 3 + 2] = b;
        }
      }

      geom.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );

      geom.computeVertexNormals();

      if (!cancelled) setGeometry(geom);
    }

    build();
    return () => {
      cancelled = true;
    };
  }, [mdtUrl, size, displacementScale]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry} scale={[SCALE, SCALE, 1]}>
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
