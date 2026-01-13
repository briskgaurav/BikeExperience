import React from "react";
import { EnergyShaderMaterial } from "./LinesShader.js";

export default function Chapter1Track() {
  return (
    <mesh position-y={-0.99}  rotation-x={-Math.PI / 2}>
      <planeGeometry args={[10, 100]} />
      <EnergyShaderMaterial 
        config={{
          numLines: 15.0,
          flowSpeed: 0.5,
          flowIntensity: 1.5,
          color: "#87CEEB",
          baseLineColor: "#87CEEB",
        }}
      />
    </mesh>
  );
}
