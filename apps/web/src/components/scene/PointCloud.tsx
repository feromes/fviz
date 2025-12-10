import { useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { loadArrow } from "../../loaders/loadArrow";
import { parseArrowPoints } from "../../loaders/parseArrowPoints";

export function PointCloud({ url, meta }) {
  const { camera } = useThree();
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    async function run() {
      const table = await loadArrow(url);
      const { geometry, center } = parseArrowPoints(table, meta);

      // Auto-fit básico
      const [xmin, xmax, ymin, ymax, zmin, zmax] = meta.bb_normalizado;
      const maxDim = Math.max(xmax - xmin, ymax - ymin, zmax - zmin);
      const dist = maxDim * 1.5;

    //   camera.position.set(0, 0, dist);
    //   camera.lookAt(0, 0, 0);

      camera.position.set(0, 1000, 1500/0.125);
      camera.lookAt(0, 0, 0);


      console.log("GEOMETRIA CHEGOU, verts:", geometry.attributes.position.count);
      console.log("BB:", geometry.boundingBox);

      setGeometry(geometry);
    }

    run();
  }, [url]);

  if (!geometry) return null;

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.02} color="white" />
    </points>
  );
}
