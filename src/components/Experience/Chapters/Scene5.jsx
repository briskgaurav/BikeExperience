"use client";
import React from "react";
import { Center, Environment } from "@react-three/drei";

export default function Scene5() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <Center>
        <mesh>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial
            color="#a8e6cf"

            wireframe={false}
          />
        </mesh>
      </Center>
      <Environment preset="city" />
    </>
  );
}
