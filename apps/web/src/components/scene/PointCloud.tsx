import { useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { loadArrow } from "../../loaders/loadArrow";
import { parseArrowPoints } from "../../loaders/parseArrowPoints";
import FitCameraToPoints from "./FitCameraToPoints";
import { useColorModeStore } from "../../state/colorModeStore";

export function PointCloud({ url, meta }) {
  const { camera } = useThree();
  const [geometry, setGeometry] = useState(null);
  const colorMode = useColorModeStore((s) => s.colorMode);

  useEffect(() => {
    console.log("🎨 colorMode atual:", colorMode);
  }, [colorMode]);

  useEffect(() => {
    async function run() {
      const table = await loadArrow(url);
      const { geometry, center } = parseArrowPoints(table, meta);
      setGeometry(geometry);
    }

    run();
  }, [url]);

  if (!geometry) return null;

  return (
    <points geometry={geometry}>
      <pointsMaterial 
        size={3} 
        vertexColors
        transparent={true}
        opacity={0.5} 
      />
      <FitCameraToPoints pointsGeometry={geometry} />
    </points>
  );
}
