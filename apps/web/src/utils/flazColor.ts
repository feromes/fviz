import * as THREE from "three";

/**
 * Função de cor usada pelo FLAZ / FVIZ
 *
 * Entrada:
 *  - t: number no intervalo [0, 1]
 *
 * Saída:
 *  - [r, g, b] também em [0, 1]
 *
 * Esta função replica exatamente a rampa HSL
 * que estava embutida no parseArrowPoints.
 */
export function flazColor(t: number): [number, number, number] {
  const tt = Math.min(1, Math.max(0, t)); // clamp defensivo

  const color = new THREE.Color();
  color.setHSL(0.66 - 0.66 * tt, 1.0, 0.5);

  return [color.r, color.g, color.b];
}
