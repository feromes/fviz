export function hagToColors(
  hag: Uint8Array,
  min: number,
  max: number
): Float32Array {
  const n = hag.length;
  const colors = new Float32Array(n * 3);
  const range = max - min || 1;

  for (let i = 0; i < n; i++) {
    // 🔑 reconstrói valor real
    const hagReal = min + (hag[i] / 255) * range;

    // normaliza 0–1
    const t = Math.min(
      1,
      Math.max(0, (hagReal - min) / range)
    );

    // azul → vermelho
    colors[i * 3 + 0] = t;
    colors[i * 3 + 1] = 0.0;
    colors[i * 3 + 2] = 1.0 - t;
  }

  return colors;
}
