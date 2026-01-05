"use client";
import {
  Center,
  ContactShadows,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  Stage,
  Stats,
} from "@react-three/drei";
import React from "react";
import { Model } from "./Model";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";


export default function Experience() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#ecedef]">
      <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ near: 0.1, far: 1000 }}>
        <fog attach="fog" args={["#ecedef", 5, 10]} />
        <Stats />
        {/* <Environment preset="warehouse"  environmentIntensity={1} /> */}
        <Stage adjustCamera={false} />
        <Center>
          <Model />
          
        </Center>
        <mesh position-y={-1.5} position-z={-15} scale={100}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <OrbitControls />
      
      </Canvas>
    </div>
  );
}
