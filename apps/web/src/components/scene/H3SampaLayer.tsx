import { useEffect, useState } from "react";
import H3HexMesh from "./H3HexMesh";

type H3Hex = {
  h3: string;
  center: [number, number];
  color: string; // "#RRGGBB"
};

export default function H3SampaLayer() {
  const [hexes, setHexes] = useState<H3Hex[]>([]);

  useEffect(() => {
    fetch("/api/h3_r8_buf1200.json")
      .then((r) => r.json())
      .then((data) => {
        setHexes(data.hexes);
      });
  }, []);

  return (
    <group>
      {hexes.map((hex) => (
        <H3HexMesh key={hex.h3} hex={hex} />
      ))}
    </group>
  );
}
