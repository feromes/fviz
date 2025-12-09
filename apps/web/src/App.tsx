// apps/web/src/App.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RotatingCube from "./components/scene/RotatingCube";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50 }}
        dpr={[1, 2]}
      >
        {/* Cor de fundo */}
        <color attach="background" args={["#020617"]} />

        {/* Luzes */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        {/* Cubo girando */}
        <RotatingCube />

        {/* Controles de órbita */}
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
}

export default App;
