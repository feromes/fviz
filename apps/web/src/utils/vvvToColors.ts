// utils/vvvToColors.ts
export function vvvToColors(vvv: Uint8Array | Uint8ClampedArray) {
  const count = vvv.length;
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const c = vvv[i] > 0 ? 0.0 : 0.6; // preto vs cinza

    colors[i * 3 + 0] = c;
    colors[i * 3 + 1] = c;
    colors[i * 3 + 2] = c;
  }

  return colors;
}
