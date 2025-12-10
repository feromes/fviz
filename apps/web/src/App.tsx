import { Canvas } from "@react-three/fiber";
import saoRemoMeta from "./data/sao_remo.json";
import { PointCloud } from "./components/scene/PointCloud";
import { OrbitControls } from "@react-three/drei";

export default function App() {
  return (
    <Canvas camera={{ 
              position: [0,0,1000/0.125],
              near: 1,
              far: 5000/0.125 
            }}> 
      <ambientLight />
      <OrbitControls makeDefault />
      <PointCloud 
        url="/data/sao_remo_2017.arrow"
        meta={saoRemoMeta}
      />
    </Canvas>
  );
}
