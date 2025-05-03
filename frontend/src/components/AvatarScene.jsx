"use client"

import { Suspense, useRef, useEffect } from "react"
import { useGLTF, useAnimations, Environment, OrbitControls } from "@react-three/drei"
import ClothingLayer from "./ClothingLayer"
import HairModel from "./HairModel"
import BeardModel from "./BeardModel"

export default function AvatarScene({ measurements, clothingImage, clothingType, hairStyle, beardStyle, animation }) {
  const avatarRef = useRef()
  const { scene, animations } = useGLTF("/avatar_model.glb")
  const { actions, mixer } = useAnimations(animations, avatarRef)

  // Calculate avatar scale based on measurements
  const height = measurements.height / 100 // Convert cm to meters
  const bodyScale = calculateBodyScale(measurements)

  // Handle animation changes
  useEffect(() => {
    // Reset all animations
    Object.values(actions).forEach((action) => action.stop())

    // Play selected animation
    if (actions[animation]) {
      actions[animation].reset().play()
      actions[animation].setEffectiveTimeScale(1)
      actions[animation].setEffectiveWeight(1)
    }
  }, [actions, animation])

  // Apply measurements to avatar model
  useEffect(() => {
    if (avatarRef.current) {
      // Apply overall height scale
      avatarRef.current.scale.set(bodyScale.width, height, bodyScale.depth)

      // Find and scale specific body parts if needed
      avatarRef.current.traverse((object) => {
        if (object.isMesh) {
          // Apply waist scale to specific parts
          if (object.name.includes("torso") || object.name.includes("waist")) {
            const waistScale = measurements.waist / 80 // Normalize to default
            object.scale.x *= waistScale
            object.scale.z *= waistScale
          }
        }
      })
    }
  }, [measurements, height, bodyScale])

  // Clone and set up the avatar model
  const avatarModel = scene.clone()

  return (
    <Suspense fallback={null}>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={1.5}
        maxDistance={4}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />

      <hemisphereLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize={1024} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} />

      <group ref={avatarRef}>
        <primitive object={avatarModel} position={[0, -height, 0]} />

        {hairStyle !== "none" && <HairModel style={hairStyle} scale={height} />}

        {beardStyle !== "none" && <BeardModel style={beardStyle} scale={height} />}

        {clothingImage && (
          <ClothingLayer imageUrl={clothingImage} type={clothingType} bodyScale={bodyScale} height={height} />
        )}
      </group>

      <Environment preset="city" />
    </Suspense>
  )
}

// Helper function to calculate body scale based on measurements
function calculateBodyScale(measurements) {
  // Convert weight to approximate body width using BMI-inspired calculation
  const height = measurements.height / 100 // Convert to meters
  const bmi = measurements.weight / (height * height)

  // Normalize BMI to a reasonable scale factor (1.0 is average)
  const widthFactor = Math.max(0.8, Math.min(1.4, bmi / 22.5))

  return {
    width: widthFactor,
    depth: widthFactor,
  }
}

// Preload the avatar model
useGLTF.preload("/avatar_model.glb")