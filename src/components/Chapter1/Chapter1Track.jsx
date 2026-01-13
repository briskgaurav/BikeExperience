import React from "react";
import { EnergyShaderMaterial } from "./LinesShader.js";
import { MeshReflectorMaterial } from "@react-three/drei";

export default function Chapter1Track() {
  return (
    <>
      <mesh position-y={-0.99} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 200]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={100}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          transparent={true}
          opacity={0.2}
          color="#0e0e0e"
          metalness={1}
        />
      </mesh>

      <mesh position-y={-0.99} rotation-x={-Math.PI / 2}>
        <cylinderGeometry args={[5, 5, 100, 50, 1, true]} />
        {/* <meshStandardMaterial color="white" /> */}
        <EnergyShaderMaterial
          config={{
            numLines: 50.0,
            flowSpeed: 0.5,
            flowIntensity: 1.5,
            lineWidth: 0.1,
            color: "white",
            baseLineColor: "white",
          }}
        />
      </mesh>
    </>
  );
}
