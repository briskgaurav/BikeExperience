"use client";
import {
  Center,
  Environment,
  Float,
  OrbitControls,
  Stats,
  Text,
} from "@react-three/drei";
import React, { Suspense } from "react";
import { Model } from "./Model";
import { Canvas } from "@react-three/fiber";
import { useAspectRatioDimensions } from "@/hooks/useAspectRatioDimensions";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { degToRad } from "three/src/math/MathUtils";
import {
  EffectComposer,
  Glitch,
  SMAA,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import LightTrail from "../LightTrail/LightTrail";

gsap.registerPlugin(ScrollTrigger);

const ASPECT_RATIO = 16 / 9;

export default function Chapter1() {
  const dimensions = useAspectRatioDimensions(ASPECT_RATIO);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#chapter1",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      markers: false,
      onUpdate: (self) => {
        const sequencePosition = self.progress * 3;
      },
    });
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Cursor trail - renders to its own canvas behind everything, unaffected by postprocessing */}
      <LightTrail />

      {/* Main 3D scene with postprocessing */}
      <Canvas
        flat
        gl={{
          preserveDrawingBuffer: false,
          antialias: true,
          alpha: true, // Enable alpha so we can see the LightTrail behind
          powerPreference: "high-performance",
        }}
        dpr={1}
        camera={{
          near: 0.1,
          far: 100,
          fov: 45,
          position: [0, 0, 5],
        }}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Main scene content */}
        <Float
          speed={1.5}
          rotationIntensity={0.1}
          floatIntensity={0.3}
          floatingRange={[-0.05, 0.05]}
        >
          <Center>
            <group
              position={[0, 0, 0]}
              scale={0.6}
              rotation={[-degToRad(30), -degToRad(20), degToRad(30)]}
            >
              <Model />
            </group>
          </Center>
        </Float>

        <Text
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          letterSpacing={-0.09}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[0, 0, 0]}
        >
          LIMITLESS
          <meshStandardMaterial color="orangered" />
        </Text>

        <Environment preset="sunset" />

        <Stats />

        {/* Postprocessing - only affects the 3D scene, not the cursor trail */}
        <Suspense fallback={null}>
          <EffectComposer multisampling={0}>
            <Glitch
              delay={[1.5, 3.5]}
              duration={[0.6, 1.0]}
              strength={[0.3, 1.0]}
              active
              ratio={1}
            />
            <SMAA />
            <ToneMapping
              blendFunction={BlendFunction.COLOR_BURN}
              adaptive={true}
              resolution={256}
              middleGrey={1}
              maxLuminance={26.0}
              averageLuminance={2}
              adaptationRate={2}
            />
          </EffectComposer>
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
