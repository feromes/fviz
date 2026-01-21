export function deltaToColors(
  values: Uint8Array,
  min: number,
  max: number
) {
  const colors = new Float32Array(values.length * 3);

  for (let i = 0; i < values.length; i++) {
    const t = values[i] / 255; // normalizado
    const [r, g, b] = flazColor(t);

    colors[i * 3 + 0] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  return colors;
}
