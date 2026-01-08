import { useLoader } from "@react-three/fiber";
import { TextureLoader, ShaderMaterial } from "three";
import * as THREE from "three";
import { useMemo } from "react";

type MDTSceneProps = {
  mdtUrl: string;
  size: [number, number];
  displacementScale?: number;
  heightMin: number;
  heightMax: number;
};

export default function MDTScene({
  mdtUrl,
  size,
  displacementScale = 200,
  heightMin,
  heightMax,
}: MDTSceneProps) {
  if (!size) return null;

  // 🔑 mesma escala da nuvem (1 unidade = 12.5 cm)
  const SCALE = 1 / 0.125;

  const texture = useLoader(TextureLoader, mdtUrl);

  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.NoColorSpace;

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          heightMap: { value: texture },
          hMin: { value: heightMin },
          hMax: { value: heightMax },
          dispScale: { value: displacementScale },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform sampler2D heightMap;
          uniform float dispScale;

          void main() {
            vUv = uv;

            float h = texture2D(heightMap, uv).r;
            vec3 displacedPosition = position + normal * h * dispScale;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform sampler2D heightMap;

          vec3 terrain(float t) {
            return mix(
              mix(
                vec3(0.2, 0.4, 0.0),   // verde escuro
                vec3(0.4, 0.6, 0.2),   // verde
                smoothstep(0.0, 0.4, t)
              ),
              mix(
                vec3(0.6, 0.5, 0.3),   // marrom
                vec3(1.0, 1.0, 1.0),   // branco
                smoothstep(0.6, 1.0, t)
              ),
              smoothstep(0.4, 1.0, t)
            );
          }

          void main() {
            float h = texture2D(heightMap, vUv).r;

            // 🌈 colormap correto (0–1)
            vec3 color = terrain(h);

            // ☀️ hillshade fake (derivadas simples)
            float dx = dFdx(h);
            float dy = dFdy(h);

            vec3 normal = normalize(vec3(-dx, -dy, 1.0));
            vec3 lightDir = normalize(vec3(0.4, 0.6, 1.0));

            float shade = dot(normal, lightDir);
            shade = clamp(shade * 0.8 + 0.2, 0.0, 1.0);

            gl_FragColor = vec4(color * shade, 1.0);
          }
        `,
        side: THREE.DoubleSide,
      }),
    [texture, heightMin, heightMax, displacementScale]
  );

  return (
    <mesh scale={[SCALE, SCALE, 1]}>
      <planeGeometry args={[size[0], size[1], 256, 256]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
