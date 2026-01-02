export function fvizGeoColor(t: number): [number, number, number] {
  // placeholder: gradiente simples
  const r = Math.round(255 * t);
  const g = Math.round(180 * (1 - t));
  const b = Math.round(255 * (1 - t));
  return [r, g, b];
}
