import { useMemo } from "react";
import * as THREE from "three";
import { cellToBoundary } from "h3-js";

export type H3Hex = {
  h3: string;
  center: [number, number];
  color: string; // "#RRGGBB"
};

type Props = {
  hex: H3Hex;
  onClick?: (hex: H3Hex) => void;
};

export default function H3HexMesh({ hex, onClick }: Props) {
  const geometry = useMemo(() => {
    // boundary do H3 (lat/lng ou mundo — ver nota abaixo)
    const boundary = cellToBoundary(hex.h3, true);

    const shape = new THREE.Shape();

    boundary.forEach(([lat, lng], i) => {
      // ⚠️ IMPORTANTE:
      // isto só funciona direto se o JSON já estiver no "mundo FVIZ"
      const x = lng;
      const y = lat;

      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });

    shape.closePath();

    return new THREE.ShapeGeometry(shape);
  }, [hex.h3]);

  return (
    <mesh
      geometry={geometry}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(hex);
      }}
    >
      <meshBasicMaterial
        color={hex.color}
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
