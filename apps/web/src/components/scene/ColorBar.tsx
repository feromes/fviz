import { useEffect, useRef } from "react";
import { useColorMapStore } from "../../state/colorMapStore";
import { flazColor } from "../../utils/flazColor";
import { ASPRS_CLASSES } from "../../utils/asprs";


export default function ColorBar() {
  const { min, max, ref, visible, mode } = useColorMapStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const height = 240;
  const width = 22;
  const ticks = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = ctx.createImageData(width, height);

    for (let y = 0; y < height; y++) {
      const t = 1 - y / (height - 1); // topo = max
      const [r, g, b] = flazColor(t);

      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        img.data[i]     = Math.round(r * 255);
        img.data[i + 1] = Math.round(g * 255);
        img.data[i + 2] = Math.round(b * 255);
        img.data[i + 3] = 127;
      }
    }

    ctx.putImageData(img, 0, 0);
}, [visible, min, max, ref, mode]);


  if (!visible) return null;

  const values = Array.from({ length: ticks }, (_, i) => {
    const a = i / (ticks - 1);
    return min + a * (max - min);
  }).reverse();

  
  if (mode === "classification") {
    return (
      <div className="absolute right-4 bottom-20 z-20 bg-white rounded-md shadow-sm p-2 text-[11px]">
        <div className="text-neutral-700 mb-2">
          Classificação (ASPRS)
        </div>

        <div className="space-y-1">
          {ASPRS_CLASSES.map((c) => (
            <div
              key={c.code}
              className="flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-sm border border-neutral-400"
                style={{
                  backgroundColor: `rgb(${c.color.map(v => Math.round(v * 255)).join(",")})`,
                }}
              />
              <span className="text-neutral-800">
                {c.code} — {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute right-4 bottom-20 z-20 pointer-events-none select-none"
    >
      <div className="text-[11px] text-neutral-700 mb-1">
        {ref}
      </div>

      <div className="flex gap-2">
        <canvas
          ref={canvasRef}
          className="rounded-md border border-neutral-300 shadow-sm"
          style={{ width, height }}
        />

        <div className="flex flex-col justify-between text-[11px] text-neutral-800">
          {values.map((v, i) => (
            <div key={i}>{Math.round(v)} m</div>
          ))}
        </div>
      </div>
    </div>
  );
}
