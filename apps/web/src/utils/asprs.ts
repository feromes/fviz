// utils/asprs.ts
export const ASPRS_CLASSES: {
  code: number;
  label: string;
  color: [number, number, number];
}[] = [
  { code: 2, label: "Ground", color: [0.55, 0.27, 0.07] },
  { code: 3, label: "Low vegetation", color: [0.0, 0.6, 0.0] },
  { code: 4, label: "Medium vegetation", color: [0.0, 0.8, 0.0] },
  { code: 5, label: "High vegetation", color: [0.0, 1.0, 0.0] },
  { code: 6, label: "Building", color: [0.8, 0.0, 0.0] },
  { code: 9, label: "Water", color: [0.0, 0.4, 0.8] },
];
