// apps/web/src/App.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RotatingCube from "./components/scene/RotatingCube";

function App() {
  return (
    <div className="w-screen h-[100dvh] bg-red-600">
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50 }}
        dpr={[1, 2]} 
        className="w-full h-full bg-red-600"
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <RotatingCube />
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
}

export default App;
