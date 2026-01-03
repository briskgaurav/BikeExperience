"use client";

import React, { useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";
import * as THREE from "three";

export function Model() {
  const { nodes, materials } = useGLTF("/model/BikeScene.glb");

  // Custom material for Object_3 with modified color and roughness
  const customObject3Material = materials.tex_u1_v1.clone();
  customObject3Material.color.setHex(0x808080); // Little gray color
  customObject3Material.roughness = 1.0;

  return (
    <group scale={0.5}>
      <group dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.015}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={customObject3Material}
            position={[0, 0, -1.053]}
            rotation={[-0.026, 0, -0.151]}
            scale={56.449}
          />
        </group>
        <group
          rotation={[-Math.PI / 2, degToRad(0), degToRad(0)]}
          position={[0, -0.04, 0]}
          scale={0.01}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_Bike_Body_0.geometry}
            material={materials["Bike_Body.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_Bike_Other_0.geometry}
            material={materials["Bike_Other.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Wheels_Wheels&Cables_0"].geometry}
            material={materials["WheelsCables.001"]}
          />
        </group>
        {/* <mesh
          receiveShadow
          geometry={nodes.baseParticles.geometry}
          position={[-0.248, 0.016, 0]}
          rotation={[0, 0, 3.076]}
          scale={1.466}
        >
          <meshBasicMaterial side={THREE.DoubleSide} transparent  opacity={0.1} color="#18181b" />
        </mesh> */}
      </group>
    </group>
  );
}

useGLTF.preload("/BikeScene.glb");
