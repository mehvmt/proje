"use client"

import { useEffect, useRef } from "react"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

export default function ClothingLayer({ imageUrl, type, bodyScale, height }) {
  const meshRef = useRef()
  const texture = useTexture(imageUrl)

  // Set proper texture parameters for transparent PNGs
  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.format = THREE.RGBAFormat
      texture.needsUpdate = true
    }
  }, [texture])

  // Determine clothing position and size based on type and body measurements
  const getClothingConfig = () => {
    switch (type) {
      case "tshirt":
        return {
          position: [0, height * 0.75, 0.05],
          scale: [bodyScale.width * 0.55, height * 0.4, 1],
          rotation: [0, 0, 0],
        }
      case "pants":
        return {
          position: [0, height * 0.4, 0.05],
          scale: [bodyScale.width * 0.4, height * 0.5, 1],
          rotation: [0, 0, 0],
        }
      case "jacket":
        return {
          position: [0, height * 0.7, 0.1],
          scale: [bodyScale.width * 0.6, height * 0.45, 1],
          rotation: [0, 0, 0],
        }
      default:
        return {
          position: [0, height * 0.7, 0.05],
          scale: [bodyScale.width * 0.55, height * 0.4, 1],
          rotation: [0, 0, 0],
        }
    }
  }

  const config = getClothingConfig()

  return (
    <mesh ref={meshRef} position={config.position} scale={config.scale} rotation={config.rotation}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}