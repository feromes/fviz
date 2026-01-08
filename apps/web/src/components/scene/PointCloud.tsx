import { useState, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { loadArrow } from "../../loaders/loadArrow";
import { parseArrowPoints } from "../../loaders/parseArrowPoints";
import FitCameraToPoints from "./FitCameraToPoints";
import { useColorModeStore } from "../../state/colorModeStore";
import * as THREE from "three";


export function PointCloud({ url, meta }) {
  const { camera } = useThree();
  const [geometry, setGeometry] = useState(null);
  const colorMode = useColorModeStore((s) => s.colorMode);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const originalColorRef = useRef<Float32Array | null>(null);


  useEffect(() => {
    console.log("🎨 colorMode atual:", colorMode);
  }, [colorMode]);

  useEffect(() => {
    async function run() {
      const table = await loadArrow(url);
      const { geometry, center } = parseArrowPoints(table, meta);

      // 🔐 guarda a cor original (elevation)
      const colorAttr = geometry.getAttribute("color");
      if (colorAttr && colorAttr.array instanceof Float32Array) {
        originalColorRef.current = new Float32Array(colorAttr.array);
      }

      geometryRef.current = geometry;
      setGeometry(geometry); // se você ainda usa state
    }

    run();
  }, [url]);

  useEffect(() => {
    if (!geometryRef.current) return;

    const geometry = geometryRef.current;

    // 🔵 VOLTA PARA ELEVATION
    if (colorMode === "elevation") {
      if (!originalColorRef.current) return;

      geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(originalColorRef.current, 3)
      );

      geometry.attributes.color.needsUpdate = true;
    }

    // 🔴 MODO HAG (teste simples por enquanto)
    if (colorMode === "hag") {
      const count = geometry.attributes.position.count;
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        colors[i * 3 + 0] = 1.0;
        colors[i * 3 + 1] = 0.0;
        colors[i * 3 + 2] = 0.0;
      }

      geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );

      geometry.attributes.color.needsUpdate = true;
    }
  }, [colorMode, geometry]);


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
