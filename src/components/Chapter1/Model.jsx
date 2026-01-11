
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/model/f1.glb')
  return (
    <group {...props} scale={0.01} dispose={null}>
      <group position={[-79.728, 35.813, -152.483]} rotation={[-Math.PI / 2, 0, 0]} scale={36.026}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FronyWheelHub_Body_Wings_0.geometry}
          material={materials.Body_Wings}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FronyWheelHub_Titanium_0.geometry}
          material={materials.Titanium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FronyWheelHub_BlackHole_0.geometry}
          material={materials.BlackHole}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FronyWheelHub_Details_0.geometry}
          material={materials.Details}
        />
      </group>
      <group position={[0, 60.041, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontWheelHubInner_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontWheelHubInner_BlackHole_0.geometry}
          material={materials.BlackHole}
        />
      </group>
      <group position={[0, 60.041, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RearWheelHubInner_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RearWheelHubInner_BlackHole_0.geometry}
          material={materials.BlackHole}
        />
      </group>
      <group
        position={[-76.121, 35.813, 187.647]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[36.026, 36.026, 42.4]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RearWheelHub_Body_Wings_0.geometry}
          material={materials.Body_Wings}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RearWheelHub_Titanium_0.geometry}
          material={materials.Titanium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RearWheelHub_BlackHole_0.geometry}
          material={materials.BlackHole}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RearWheelHub_Details_0.geometry}
          material={materials.Details}
        />
      </group>
      <group position={[0, 60.041, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_low_Body_Main_0.geometry}
          material={materials.Body_Main}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_low_BlackHole_0.geometry}
          material={materials.BlackHole}
        />
      </group>
      <group position={[0, 61.163, -140.381]} rotation={[-Math.PI / 2, 0, 0]} scale={4.758}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Aeriel01005_Details_0.geometry}
          material={materials.Details}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Aeriel01005_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
      </group>
      <group position={[0, 60.097, -151.031]} rotation={[-Math.PI / 2, 0, 0]} scale={4.758}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Aeriel03005_Titanium_0.geometry}
          material={materials.Titanium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Aeriel03005_Details_0.geometry}
          material={materials.Details}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Aeriel03005_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
      </group>
      <group
        position={[9.606, 118.534, 36.104]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        scale={133.872}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['T-Cam004_Glass_0'].geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['T-Cam004_Carbon_Fiber_0'].geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['T-Cam004_Details_0'].geometry}
          material={materials.Details}
        />
      </group>
      <group position={[0, 60.041, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontSusp01005_Body_Wings_0.geometry}
          material={materials.Body_Wings}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontSusp01005_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
      </group>
      <group position={[0, 60.041, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontSusp02005_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontSusp02005_Body_Wings_0.geometry}
          material={materials.Body_Wings}
        />
      </group>
      <group position={[0, 60.041, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontSusp03005_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontSusp03005_Body_Wings_0.geometry}
          material={materials.Body_Wings}
        />
      </group>
      <group position={[0, 60.041, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontSusp04005_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontSusp04005_Titanium_0.geometry}
          material={materials.Titanium}
        />
      </group>
      <group position={[0, 60.041, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SteeringColumn005_Titanium_0.geometry}
          material={materials.Titanium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SteeringColumn005_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
      </group>
      <group position={[0, 29.53, -6.456]} rotation={[-1.386, 0, 0]} scale={3.63}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder020_Titanium_0.geometry}
          material={materials.Titanium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder020_Details_0.geometry}
          material={materials.Details}
        />
      </group>
      <group position={[-3.225, 27.049, -9.347]} rotation={[-1.386, 0, 0.836]} scale={2.887}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Buckle02005_Titanium_0.geometry}
          material={materials.Titanium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Buckle02005_Details_0.geometry}
          material={materials.Details}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Buckle02005_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
      </group>
      <group position={[0, 60.041, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.465}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Seatbelt_Details_0.geometry}
          material={materials.Details}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Seatbelt_Titanium_0.geometry}
          material={materials.Titanium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Seatbelt_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
      </group>
      <group position={[0, 60.041, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube026_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube026_Titanium_0.geometry}
          material={materials.Titanium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube026_Details_0.geometry}
          material={materials.Details}
        />
      </group>
      <group position={[22.027, 40.207, -49.275]} rotation={[-0.96, 0, 0]} scale={1.165}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube027_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube027_Details_0.geometry}
          material={materials.Details}
        />
      </group>
      <group position={[-22.21, 41.516, -51.011]} rotation={[-0.752, 0.55, -0.057]} scale={0.875}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder021_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder021_Details_0.geometry}
          material={materials.Details}
        />
      </group>
      <group position={[0, 60.041, 204.1]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CrashStruct005_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CrashStruct005_Glass_0.geometry}
          material={materials.Glass}
        />
      </group>
      <group position={[0, 60.041, 203.409]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CrashStruct_RainLight_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CrashStruct_RainLight_Titanium_0.geometry}
          material={materials.Titanium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CrashStruct_RainLight_GlassLight_0.geometry}
          material={materials.GlassLight}
        />
      </group>
      <group position={[-59.424, 51.808, 203.744]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RearWingLights002_Carbon_Fiber_0.geometry}
          material={materials.Carbon_Fiber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RearWingLights002_Glass_0.geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RearWingLights002_GlassLight_0.geometry}
          material={materials.GlassLight}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RearWingLights002_Titanium_0.geometry}
          material={materials.Titanium}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontTyre_Tyre_0.geometry}
        material={materials.Tyre}
        position={[-79.73, 35.811, -152.482]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RearTyre_Tyre_0.geometry}
        material={materials.Tyre}
        position={[-76.592, 35.811, 187.647]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[117.636, 100, 100]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontTyre004_Tyre_0.geometry}
        material={materials.Tyre}
        position={[79.605, 35.811, -152.482]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RearTyre001_Tyre_0.geometry}
        material={materials.Tyre}
        position={[76.149, 35.811, 187.647]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[117.636, 100, 100]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RearWing_low_Body_Wings_0.geometry}
        material={materials.Body_Wings}
        position={[0, 60.041, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WingMirrorHousing_low_Body_Main_0.geometry}
        material={materials.Body_Main}
        position={[0, 90.753, -51.273]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontWing_low_Body_Wings_0.geometry}
        material={materials.Body_Wings}
        position={[0, 60.041, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RearWingDRS_low_Body_Wings_0.geometry}
        material={materials.Body_Wings}
        position={[0, 90.753, 212.512]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WingMirrorGlass_Mirror_0.geometry}
        material={materials.Mirror}
        position={[0, 90.753, -51.983]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Headrest_low_Body_Main_0.geometry}
        material={materials.Body_Main}
        position={[0, 60.041, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.HaloWing_Body_Main_0.geometry}
        material={materials.Body_Main}
        position={[0, 60.041, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WingSupport_low_Body_Wings_0.geometry}
        material={materials.Body_Wings}
        position={[0, 60.041, 200.643]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={13.678}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Aeriel02005_Titanium_0.geometry}
        material={materials.Titanium}
        position={[0, 60.097, -145.002]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={4.758}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontCameraBox005_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 38.502, -180.043]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TopCameraBox005_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 94.442, 40.841]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WindScreen002_Glass_0.geometry}
        material={materials.Glass}
        position={[0, 72.27, -67.652]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.817}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RearSusp01005_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 47.479, 186.505]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RearSusp02005_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 36.131, 186.505]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RearSusp03005_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 29.115, 186.505]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RearSusp04005_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 29.115, 201.858]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Interior005_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 47.736, -8.969]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={20.244}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Seat005_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 53.404, -3.189]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={16.34}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SteeringCog02005_Titanium_0.geometry}
        material={materials.Titanium}
        position={[0, 64.926, -67.687]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        scale={8.587}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder022_Details_0.geometry}
        material={materials.Details}
        position={[-22.188, 40.04, -49.559]}
        rotation={[-0.845, 0.507, -0.024]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder023_Details_0.geometry}
        material={materials.Details}
        position={[21.953, 41.573, -50.441]}
        rotation={[-0.923, -0.609, -0.073]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube028_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 66.513, -59.741]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.394}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube029_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 62.943, -59.741]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.394}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SteeringWheel012_Details_0.geometry}
        material={materials.Details}
        position={[0, 64.284, -58.257]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={11.066}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SteeringWheel013_Details_0.geometry}
        material={materials.Details}
        position={[0, 64.284, -58.287]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={11.066}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plank005_Details_0.geometry}
        material={materials.Details}
        position={[0, 60.041, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Exhaust005_Titanium_0.geometry}
        material={materials.Titanium}
        position={[0, 60.041, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor_low003_Carbon_Fiber_0.geometry}
        material={materials.Carbon_Fiber}
        position={[0, 60.041, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube025_Details_0.geometry}
        material={materials.Details}
        position={[-21.771, 62.015, -48.112]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={2.517}
      />
    </group>
  )
}

useGLTF.preload('/model/f1.glb')
