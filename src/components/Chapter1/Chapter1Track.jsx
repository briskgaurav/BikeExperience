import React from "react";
import { EnergyShaderMaterial } from "./LinesShader.js";

export default function Chapter1Track() {
  return (
    <>
      <mesh position-y={-0.99} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 200]} />
        <EnergyShaderMaterial
          config={{
            numLines: 35.0,
            flowSpeed: 1.5,
            flowIntensity: 1.5,
            lineWidth: 0.1,
            color: "white",
            baseLineColor: "white",
            baselineIntensity: 0.1,
          }}
        />
      </mesh>

      <mesh position-y={-0.99}  rotation-x={-Math.PI / 2}>
      <cylinderGeometry args={[5, 5, 100, 50, 1, true]} />
      {/* <meshStandardMaterial color="white" /> */}
      <EnergyShaderMaterial 
        config={{
          numLines: 50.0,
          flowSpeed: .5,
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
