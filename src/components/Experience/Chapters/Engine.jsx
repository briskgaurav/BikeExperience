"use client";
import React from "react";
import { Center } from "@react-three/drei";

export default function Engine() {
  return (
    <>
    <color attach="background" args={['#000000']} />
      <Center>
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial 
            color="#ff6b6b" 
        
          />
        </mesh>
      </Center>
      
      <ambientLight intensity={0.5} />
    </>
  );
}
