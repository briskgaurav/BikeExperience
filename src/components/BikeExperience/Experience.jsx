"use client";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Model } from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { SheetProvider } from "@theatre/r3f";
import { editable as e } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";
import theatreData from "@/Theatre/threatrescene.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BikeExperienceSheet = getProject("Bike Experience", {state: theatreData}).sheet("Bike Experience");

export default function Experience() {
  const sequenceRef = useRef(null);

  useEffect(() => {
    // studio.initialize();
    // studio.extend(extension);

    // Get the sequence from the sheet
    sequenceRef.current = BikeExperienceSheet.sequence;

    // Create ScrollTrigger to control the Theatre.js sequence
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        if (sequenceRef.current) {
          // Map scroll progress (0-1) to 10 second sequence
          const position = self.progress * 10;
          sequenceRef.current.position = position;
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen z-99">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <SheetProvider sheet={BikeExperienceSheet}>
          <PerspectiveCamera
            theatreKey="PerspectiveCamera"
            makeDefault
            name="Camera"
            position={[1.14, 0.35, 1.34]}
            fov={50}
          />
          {/* Ambient light for overall illumination */}
          <ambientLight intensity={0.4} />

          {/* Key light - main light from front-right */}
          <directionalLight position={[3, 2, 2]} intensity={1.2} />

          {/* Fill light - softer light from front-left */}
          <directionalLight
            position={[-3, 1.5, 2]}
            intensity={0.6}
            castShadow
          />

          {/* Rim light - back light for edge definition */}
          <directionalLight position={[0, 2, -3]} intensity={0.8} castShadow />

          {/* Additional accent lights around the bike */}
          <pointLight position={[2, 1, 0]} intensity={0.5} color="#ffffff" />
          <pointLight position={[-2, 1, 0]} intensity={0.5} color="#ffffff" />
          <pointLight position={[0, 2, 1]} intensity={0.4} color="#ffffff" />

          <Environment preset="night" environmentIntensity={0.6} />
          <Model />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </SheetProvider>
      </Canvas>
    </div>
  );
}
