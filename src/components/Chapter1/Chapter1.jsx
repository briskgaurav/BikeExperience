"use client";
import {
  Center,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  Stage,
  Stats,
} from "@react-three/drei";
import React from "react";
import { Model } from "./Model";
import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import { SheetProvider, PerspectiveCamera } from "@theatre/r3f";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import theatrejson from "@/Theatre/chap1.json";
import { useAspectRatioDimensions } from "@/hooks/useAspectRatioDimensions";
import { editable as e } from "@theatre/r3f";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Chapter1Track from "./Chapter1Track";
import { degToRad } from "three/src/math/MathUtils";
import { Bloom, BrightnessContrast, DepthOfField, EffectComposer, ToneMapping } from "@react-three/postprocessing";
gsap.registerPlugin(ScrollTrigger);

// Initialize Theatre.js studio in development
// if (typeof window !== "undefined") {
//   studio.initialize();
//   studio.extend(extension);
// }

// Create a Theatre.js project and sheet
const project = getProject("Chapter1", { state: theatrejson });
const sheet = project.sheet("F1Experience");

const ASPECT_RATIO = 16 / 9;

export default function Chapter1() {
  const dimensions = useAspectRatioDimensions(ASPECT_RATIO);
  const containerRef = useRef(null);

  useEffect(() => {
    project.ready.then(() => {
      ScrollTrigger.create({
        trigger: "#chapter1",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const sequencePosition = self.progress * 3;
          sheet.sequence.position = sequencePosition;
        },
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen bg-background flex items-center justify-center">
      <Canvas
        // style={{ width: dimensions.width, height: dimensions.height }}
        gl={{ preserveDrawingBuffer: false }}
        camera={{ near: 0.1, far: 1000, fov: 50, position: [0, 1, 5] }}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
      >
        <SheetProvider sheet={sheet}>
          {/* <Stage adjustCamera={false} environment="studio" intensity={.1} /> */}
          {/* <Environment preset="studio" environmentRotation={[degToRad(5), 0, 0]} environmentIntensity={0.5} /> */}

          <Environment resolution={512} environmentIntensity={1}>
            {/* Ceiling */}
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, -9]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, -6]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, -3]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, 0]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, 3]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, 6]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, 9]}
              scale={[10, 1, 1]}
            />
            {/* Sides */}
            <Lightformer
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-50, 2, 0]}
              scale={[100, 2, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={-Math.PI / 2}
              position={[50, 2, 0]}
              scale={[100, 2, 1]}
            />
            {/* Key */}
            <Lightformer
              form="ring"
              color="red"
              intensity={10}
              scale={2}
              position={[10, 5, 10]}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
            />
          </Environment>

          <Stats />

          <Center>
            <e.group theatreKey="Chapter1Model">
              <Model />
            </e.group>
          </Center>

          
          <Chapter1Track />

          {/* <OrbitControls /> */}
        </SheetProvider>

        <EffectComposer disableNormalPass>
          <Bloom
            luminanceThreshold={0}
            mipmapBlur
            luminanceSmoothing={0.0}
            intensity={.2}
          />
          <BrightnessContrast
            brightness={0.1}
            contrast={0.4}
          />
          {/* <ToneMapping fa /> */}
        </EffectComposer>
      </Canvas>
    </div>
  );
}
