import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import { cellToBoundary } from "h3-js";
import { useOverlayStore } from "../../state/overlayStore";
import { useNeighborStore } from "../../state/neighborStore";


type H3Hex = {
  h3: string;
  center: [number, number]; // [lng, lat]
  color: string;           // "#RRGGBB"
};

function FitToHexes({ hexes }: { hexes: H3Hex[] }) {
  const map = useMap();

  useEffect(() => {
    if (!hexes.length) return;

    const bounds = hexes.flatMap((hex) =>
      cellToBoundary(hex.h3, true).map(
        ([lng, lat]) => [lat, lng] as [number, number]
      )
    );

    map.fitBounds(bounds, {
      padding: [10, 10],
      animate: true,
      duration: 1.2,
    });
  }, [hexes, map]);

  return null;
}

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

  const setReference = useNeighborStore((s) => s.setReference);
  const setOverlay = useOverlayStore((s) => s.setOverlay);

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
        className="desaturated"
      />

      <FitToHexes hexes={hexes} />

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
              color: hex.color,
              fillColor: hex.color,
              weight: 1,
              fillOpacity: 0.6,
            }}
            eventHandlers={{
              click: () => {
                // 1️⃣ guarda o centro do hex
                setReference(hex.center); // [lng, lat]

                // 2️⃣ abre o overlay de busca
                setOverlay("none"); // fecha mapa, se quiser
                setOverlay("favela_search"); // se preferir, ou controlar no App

                // se você já controla isso pelo App:
                // apenas deixe o estado preparado
              },
            }}
          />
        );
      })}



    </MapContainer>
  );
}
