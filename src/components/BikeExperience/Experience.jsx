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
      <Canvas>
        <fog attach="fog" args={["#ecedef", 5, 10]} />
        <Stats />
        {/* <Environment preset="warehouse"  environmentIntensity={1} /> */}
        <Stage adjustCamera={false} />
        <Center>
          <Model />
          <mesh rotation-x={-Math.PI / 2}>
            <planeGeometry args={[100, 40]} />
            <MeshReflectorMaterial
              side={THREE.DoubleSide}
              blur={[300, 100]}
              mirror={0.4}
              resolution={2048}
              mixBlur={0.7}
              // mixStrength={80}
              roughness={1}
              distortionTexture={
                "https://as1.ftcdn.net/jpg/04/63/98/24/1000_F_463982482_I310LXkFzX7Bf0RB7ojgVXmmenExRSOL.jpg"
              }
              distortion={1.90}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#ffffff"
              metalness={0.5}
            />
          </mesh>
        </Center>
        <mesh position-y={-1.5} position-z={-15} scale={100}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial color="black" />
        </mesh>
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
