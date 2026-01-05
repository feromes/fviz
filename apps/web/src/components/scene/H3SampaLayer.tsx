import { Html } from "@react-three/drei";

export default function H3SampaLayer() {
  console.log("🟢 H3SampaLayer MONTADO");

  return (
    <group>
      {/* Texto flutuante */}
      <Html center>
        <div
          style={{
            background: "black",
            color: "lime",
            padding: "12px 16px",
            borderRadius: 8,
            fontFamily: "monospace",
            fontSize: 14,
          }}
        >
          H3 SAMPA ATIVO
        </div>
      </Html>

      {/* Cubo gigante no centro */}
      <mesh position={[0, 0, 200]}>
        <boxGeometry args={[300, 300, 300]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </group>
  );
}
