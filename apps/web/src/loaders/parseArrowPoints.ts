import * as THREE from "three";

export function parseArrowPoints(table: any, meta: any) {
  const xs = table.getChild("x").data[0].values;
  const ys = table.getChild("y").data[0].values;
  const zs = table.getChild("z").data[0].values;

  const [xmin, xmax, ymin, ymax, zmin, zmax] = meta.bb_normalizado;

  const cx = (xmax + xmin) / 2;
  const cy = (ymax + ymin) / 2;
  const cz = (zmax + zmin) / 2;

  const n = xs.length;
  const positions = new Float32Array(n * 3);

  for (let i = 0; i < n; i++) {
    positions[i * 3 + 0] = xs[i] - cx;
    positions[i * 3 + 1] = ys[i] - cy;
    positions[i * 3 + 2] = zs[i] - cz;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geom.computeBoundingBox();

  return {
    geometry: geom,
    center: new THREE.Vector3(cx, cy, cz),
    count: n
  };
}
