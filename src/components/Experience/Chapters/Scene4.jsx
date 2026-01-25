"use client";
import React from "react";
import { Center, Environment } from "@react-three/drei";

export default function Scene4() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <Center>
        <mesh>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <meshStandardMaterial
            color="#f38181"

          />
        </mesh>
      </Center>
      <Environment preset="city" />

    </>
  );
}
