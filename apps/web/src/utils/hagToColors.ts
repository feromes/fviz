function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function hagToColors(
  hag: Uint8Array,
  min: number,
  max: number
): Float32Array {
  const n = hag.length;
  const colors = new Float32Array(n * 3);
  const range = max - min || 1;

  for (let i = 0; i < n; i++) {
    const hagReal = min + (hag[i] / 255) * range;
    const t = Math.min(1, Math.max(0, (hagReal - min) / range));

    let r = 0, g = 0, b = 0;

    if (t < 0.33) {
      // azul → verde
      const k = t / 0.33;
      r = 0;
      g = lerp(0, 1, k);
      b = lerp(1, 0, k);
    } else if (t < 0.66) {
      // verde → amarelo
      const k = (t - 0.33) / 0.33;
      r = lerp(0, 1, k);
      g = 1;
      b = 0;
    } else {
      // amarelo → vermelho
      const k = (t - 0.66) / 0.34;
      r = 1;
      g = lerp(1, 0, k);
      b = 0;
    }

    colors[i * 3 + 0] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  return colors;
}
