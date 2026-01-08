import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import { cellToBoundary, cellToLatLng } from "h3-js";
import { useOverlayStore } from "../../state/overlayStore";
import proj4 from "proj4";

// WGS84
proj4.defs(
  "EPSG:4326",
  "+proj=longlat +datum=WGS84 +no_defs"
);

// SIRGAS 2000 / UTM 23S (São Paulo)
proj4.defs(
  "EPSG:31983",
  "+proj=utm +zone=23 +south +datum=SIRGAS2000 +units=m +no_defs"
);

type H3Hex = {
  h3: string;
  center: [number, number]; // ⚠️ backend provavelmente [lat, lng]
  color: string;
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

function wgs84ToSirgas(
  lng: number,
  lat: number
): [number, number] {
  return proj4(
    "EPSG:4326",
    "EPSG:31983",
    [lng, lat]
  ) as [number, number];
}


export default function H3LeafletMap() {
  const [hexes, setHexes] = useState<H3Hex[]>([]);
  const setHexSearch = useOverlayStore((s) => s.setHexSearch);

  useEffect(() => {
    fetch("/api/h3_r8_buf1200.json")
      .then((r) => r.json())
      .then((data) => {
        setHexes(data.hexes);
      });
  }, []);

  return (
    <MapContainer
      center={[-23.55, -46.63]} // [lat, lng]
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
                const [lng, lat] = hex.center;

                const centerSirgas = wgs84ToSirgas(lng, lat);

                setHexSearch({
                  h3: hex.h3,
                  center: centerSirgas, // [x, y] em metros ✅
                });
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
}
