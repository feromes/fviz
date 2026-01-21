// src/utils/deltaColor.ts

export function deltaColor(t: number): [number, number, number] {
  // clamp
  t = Math.max(0, Math.min(1, t));

  // zona neutra perceptual (zero ≈ cinza)
  if (Math.abs(t - 0.5) < 0.05) {
    return [0.7, 0.7, 0.7];
  }

  if (t < 0.5) {
    // perdas: azul → cinza
    const k = t / 0.5;
    return [
      0.1 + 0.6 * k,
      0.1 + 0.6 * k,
      1.0
    ];
  } else {
    // ganhos: cinza → vermelho
    const k = (t - 0.5) / 0.5;
    return [
      1.0,
      0.6 * (1 - k),
      0.6 * (1 - k)
    ];
  }
}
