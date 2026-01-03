"use client";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Model } from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { SheetProvider } from "@theatre/r3f";
import { editable as e } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";

const BikeExperienceSheet =
  getProject("Bike Experience").sheet("Bike Experience");

export default function Experience() {
  //   useEffect(() => {
  //     studio.initialize();
  //     studio.extend(extension);
  //   }, []);

  return (
    <Canvas shadows>
      <SheetProvider sheet={BikeExperienceSheet}>
        <PerspectiveCamera
          theatreKey="PerspectiveCamera"
          makeDefault
          name="Camera"
          position={[1.14, 0.35, 1.34]}
          fov={50}
        />
        <ambientLight castShadow intensity={10} />
        {/* <Environment preset="night" environmentIntensity={1} /> */}
        <Model />
        <OrbitControls />
      </SheetProvider>
    </Canvas>
  );
}
