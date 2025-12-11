import * as THREE from "three";

export function parseArrowPoints(table: any, meta: any) {
  const xs = table.getChild("x").data[0].values;
  const ys = table.getChild("y").data[0].values;
  const zs = table.getChild("z").data[0].values;

  // ------------------------------------------------------
  // NOVO — pega o flaz_colormap
  // ------------------------------------------------------
  const cmapCol = table.getChild("flaz_colormap");
  const hasColor = !!cmapCol;
  const cmap = hasColor ? cmapCol.data[0].values : null;

  const [xmin, xmax, ymin, ymax, zmin, zmax] = meta.bb_normalizado;

  const cx = (xmax + xmin) / 2;
  const cy = (ymax + ymin) / 2;
  const cz = (zmax + zmin) / 2;

  const n = xs.length;
  const positions = new Float32Array(n * 3);

  // ------------------------------------------------------
  // Se houver colormap → criamos array de cores
  // ------------------------------------------------------
  const colors = hasColor ? new Float32Array(n * 3) : null;
  const tempColor = new THREE.Color();

  for (let i = 0; i < n; i++) {
    // ----------------
    // POSIÇÕES
    // ----------------
    positions[i * 3 + 0] = xs[i] - cx;
    positions[i * 3 + 1] = ys[i] - cy;
    positions[i * 3 + 2] = zs[i] - cz;

    // ----------------
    // CORES (se existir flaz_colormap)
    // ----------------
    if (hasColor) {
      const t = cmap[i] / 255; // normaliza 0–255 → 0–1

      // Rampa simples HSL (elegante e temporária)
      tempColor.setHSL(0.66 - 0.66 * t, 1.0, 0.5);

      colors[i * 3 + 0] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  if (hasColor) {
    geom.setAttribute("color", new THREE.BufferAttribute(colors!, 3));
  }

  geom.computeBoundingBox();

  return {
    geometry: geom,
    center: new THREE.Vector3(cx, cy, cz),
    count: n
  };
}
