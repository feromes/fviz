import { useState, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { loadArrow } from "../../loaders/loadArrow";
import { parseArrowPoints } from "../../loaders/parseArrowPoints";
import FitCameraToPoints from "./FitCameraToPoints";
import { useColorModeStore } from "../../state/colorModeStore";
import * as THREE from "three";
import { loadArrowColumn } from "../../loaders/loadArrowColumn";
import { hagToColors } from "../../utils/hagToColors";
import { classificationToColors } from "../../utils/classificationToColors";
import { vvvToColors } from "../../utils/vvvToColors";

export function PointCloud({ url, meta }) {
  const { camera } = useThree();
  const [geometry, setGeometry] = useState(null);
  const colorMode = useColorModeStore((s) => s.colorMode);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const originalColorRef = useRef<Float32Array | null>(null);
  const [geometryVVV, setGeometryVVV] = useState<THREE.BufferGeometry | null>(null);



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

    if (colorMode === "elevation") {
      if (!originalColorRef.current) return;

      geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(originalColorRef.current, 3)
      );
      geometry.attributes.color.needsUpdate = true;
    }

    if (colorMode === "hag") {
      async function applyHag() {
        const hag = await loadArrowColumn(
          `/api/favela/${meta.id}/periodos/2017/hag_flaz.arrow`,
          "hag_colormap"
        );

        const colors = hagToColors(
          hag,
          meta.hag.min,
          meta.hag.max
        );

        geometry.setAttribute(
          "color",
          new THREE.BufferAttribute(colors, 3)
        );
        geometry.attributes.color.needsUpdate = true;
      }

      applyHag();
    }

    // if (colorMode === "classification") {
    //   const count =
    //     geometry.attributes.position.count;

    //   const colors = new Float32Array(count * 3);

    //   for (let i = 0; i < count; i++) {
    //     colors[i * 3 + 0] = 1.0; // R
    //     colors[i * 3 + 1] = 0.0; // G
    //     colors[i * 3 + 2] = 0.0; // B
    //   }

    //   geometry.setAttribute(
    //     "color",
    //     new THREE.BufferAttribute(colors, 3)
    //   );
    //   geometry.attributes.color.needsUpdate = true;
    // }

    if (colorMode === "classification") {
      async function applyClassification() {
        const classes = await loadArrowColumn(
          `/api/favela/${meta.id}/periodos/2017/class_flaz.arrow`,
          "classification"
        );

        const colors = classificationToColors(classes);

        geometry.setAttribute(
          "color",
          new THREE.BufferAttribute(colors, 3)
        );
        geometry.attributes.color.needsUpdate = true;
      }

      applyClassification();
    }

    if (colorMode === "vvv") {
      async function applyVVV() {
        const vvv = await loadArrowColumn(
          `/api/favela/${meta.id}/periodos/2017/via_viela_vazio_flaz.arrow`,
          "via_viela_vazio"
        );

        const base = geometryRef.current;
        if (!base) return;

        const positions = base.getAttribute("position").array as Float32Array;
        const colors = base.getAttribute("color").array as Float32Array;

        const vPositions: number[] = [];
        const vColors: number[] = [];

        for (let i = 0; i < vvv.length; i++) {
          if (vvv[i] > 0) {
            // posição
            vPositions.push(
              positions[i * 3 + 0],
              positions[i * 3 + 1],
              positions[i * 3 + 2]
            );

            // cor preta
            vColors.push(0, 0, 0);
          }
        }

        const g = new THREE.BufferGeometry();
        g.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(vPositions, 3)
        );
        g.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(vColors, 3)
        );

        setGeometryVVV(g);
      }

      applyVVV();
    }


  }, [colorMode, geometry]);



  if (!geometry) return null;

  return (
    <>
      {/* Layer base — contexto */}
      <points geometry={geometry}>
        <pointsMaterial
          size={2}
          vertexColors
          transparent
          opacity={0.7}
        />
        <FitCameraToPoints pointsGeometry={geometry} />
      </points>

      {/* Layer VVV — destaque */}
      {colorMode === "vvv" && geometryVVV && (
        <points geometry={geometryVVV}>
          <pointsMaterial
            size={6}
            vertexColors
            transparent={false}
            opacity={1.0}
          />
        </points>
      )}
    </>
  );

}
