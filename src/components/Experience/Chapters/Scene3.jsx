"use client";
import React from "react";
import { Center, Environment } from "@react-three/drei";

export default function Scene3() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <Center>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color="#4ecdc4"

          />
        </mesh>
      </Center>
      <Environment preset="city" />
    </>
  );
}
