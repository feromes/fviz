import * as THREE from "three";

export function pointsFromArrow(table: any) {
  const xs = table.getColumn("x").toArray();
  const ys = table.getColumn("y").toArray();
  const zs = table.getColumn("z").toArray();

  const n = xs.length;
  const positions = new Float32Array(n * 3);

  for (let i = 0; i < n; i++) {
    positions[i * 3 + 0] = xs[i];
    positions[i * 3 + 1] = ys[i];
    positions[i * 3 + 2] = zs[i];
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  return geometry;
}
