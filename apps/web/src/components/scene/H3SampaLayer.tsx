export default function H3SampaLayer() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20000, 20000]} />
        <meshBasicMaterial
          color="#dddddd"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
