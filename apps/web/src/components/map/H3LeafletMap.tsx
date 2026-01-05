import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { cellToBoundary } from "h3-js";

type H3Hex = {
  h3: string;
  center: [number, number]; // [lng, lat]
  color: string;           // "#RRGGBB"
};

export default function H3LeafletMap() {
  const [hexes, setHexes] = useState<H3Hex[]>([]);

  useEffect(() => {
    fetch("/api/h3_r8_buf1200.json")
      .then((r) => r.json())
      .then((data) => {
        setHexes(data.hexes);
        console.log("🟢 H3 Leaflet carregado:", data.hexes.length);
      });
  }, []);

  return (
    <MapContainer
      center={[-23.55, -46.63]} // São Paulo
      zoom={11}
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hexes.map((hex) => {
        const boundary = cellToBoundary(hex.h3, true);

        const polygon = boundary.map(
          ([lng, lat]) => [lat, lng]
        ) as [number, number][];

        return (
          <Polygon
            key={hex.h3}
            positions={polygon}
            pathOptions={{
              color: hex.color || "#ff0000",
              fillColor: hex.color || "#ff0000",
              weight: 1,
              fillOpacity: 0.6,
            }}
          />
        );
      })}



    </MapContainer>
  );
}
