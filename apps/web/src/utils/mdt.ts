export function sizeFromBounds(
  bounds?: [number, number, number, number]
): [number, number] | undefined {
  if (!bounds || bounds.length !== 4) return undefined;

  const [minX, minY, maxX, maxY] = bounds;

  return [maxX - minX, maxY - minY];
}
