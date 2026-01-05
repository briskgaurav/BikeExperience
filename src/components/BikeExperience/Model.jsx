import React, { useRef, useMemo } from "react";
import { MeshReflectorMaterial, useGLTF, useTexture } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";
import * as THREE from "three";

export function Model(props) {
  const { nodes, materials } = useGLTF("/model/BikeFixed.glb");
  const texture = useTexture(
    "https://as1.ftcdn.net/jpg/04/63/98/24/1000_F_463982482_I310LXkFzX7Bf0RB7ojgVXmmenExRSOL.jpg"
  );


  return (
    <>
      <group
        rotation={[degToRad(0), degToRad(-90), degToRad(0)]}
        {...props}
        scale={0.04}
        dispose={null}
      >
        <group rotation={[-Math.PI / 2, 0, 0]}>
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
      </group>

      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[28, 28]}  />
        <MeshReflectorMaterial
          side={THREE.DoubleSide}
          blur={[300, 100]}
          mirror={0.5}
          resolution={512}
          mixBlur={0.7}
          // mixStrength={40}
          roughness={1}
          distortionMap={texture}
          distortion={.24}
          depthScale={10.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          // reflectorOffset={0.1}
          color="#ffffff"
          metalness={1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("/BikeFixed.glb");
