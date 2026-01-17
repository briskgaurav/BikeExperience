"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import LightTrail from '@/components/LightTrail/LightTrail';
import { Stats } from '@react-three/drei';

export default function page() {
  return (
    <div className="fixed inset-0 w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <Canvas
        camera={{
          near: 0.1,
          far: 100,
          fov: 45,
          position: [0, 0, 5],
        }}
      >
        <Stats />
        <LightTrail />
      </Canvas>
    </div>
  )
}
