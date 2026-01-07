import { useSceneStore } from "../../state/sceneStore";
import PointCloudScene from "./PointCloudScene";
import MDTScene from "./MDTScene";

export default function SceneRouter() {
  const scene = useSceneStore((s) => s.scene);
  console.log("SceneRouter → scene =", scene);

  if (scene === "mdt") {
    return <MDTScene />;
  }

  return <PointCloudScene />;
}
