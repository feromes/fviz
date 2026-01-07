import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function MDTScene() {
  return (
    <Canvas
      camera={{
        position: [4, 4, 4],
        fov: 50,
        near: 0.1,
        far: 100,
      }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <OrbitControls makeDefault />

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
    </Canvas>
  );
}
