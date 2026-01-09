// ASPRS LAS Classification (cores sugeridas)
export const ASPRS_COLORS: Record<number, [number, number, number]> = {
  0: [0.6, 0.6, 0.6], // Created, never classified
  1: [0.7, 0.7, 0.7], // Unclassified
  2: [0.55, 0.27, 0.07], // Ground (marrom)
  3: [0.0, 0.6, 0.0], // Low vegetation (verde)
  4: [0.0, 0.8, 0.0], // Medium vegetation
  5: [0.0, 1.0, 0.0], // High vegetation
  6: [0.8, 0.0, 0.0], // Building (vermelho)
  7: [0.5, 0.5, 0.5], // Low point / noise
  8: [0.0, 0.6, 0.6], // Model key-point
  9: [0.0, 0.4, 0.8], // Water (azul)
  10: [0.6, 0.6, 0.0], // Rail
  11: [0.6, 0.0, 0.6], // Road surface
  12: [1.0, 1.0, 0.0], // Overlap points
};

// fallback seguro
const DEFAULT_COLOR: [number, number, number] = [1.0, 0.0, 1.0]; // magenta = erro

export function classificationToColors(
  classes: Uint8Array | Uint16Array | Int32Array
): Float32Array {
  const n = classes.length;
  const colors = new Float32Array(n * 3);

  for (let i = 0; i < n; i++) {
    const cls = classes[i];
    const [r, g, b] =
      ASPRS_COLORS[cls] ?? DEFAULT_COLOR;

    colors[i * 3 + 0] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  return colors;
}
