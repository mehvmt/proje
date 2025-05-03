"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function HairModel({ style, scale }) {
  const meshRef = useRef()

  // In a real app, you would have multiple hair models in your GLB file
  // or separate GLB files for each hair style
  // For this example, we'll create simple geometries

  useEffect(() => {
    if (meshRef.current) {
      // Position the hair on top of the head
      meshRef.current.position.set(0, scale * 1.6, 0)
      // Scale according to overall avatar scale
      meshRef.current.scale.set(scale * 0.4, scale * 0.15, scale * 0.4)
    }
  }, [scale])

  const getHairColor = () => {
    switch (style) {
      case "blonde":
        return new THREE.Color("#E6C78C")
      case "brown":
        return new THREE.Color("#5A3825")
      case "black":
        return new THREE.Color("#0A0A0A")
      case "red":
        return new THREE.Color("#8D2E16")
      case "gray":
        return new THREE.Color("#AAAAAA")
      default:
        return new THREE.Color("#5A3825")
    }
  }

  const getHairGeometry = () => {
    switch (style) {
      case "short":
        return <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      case "medium":
        return <cylinderGeometry args={[1, 1.1, 1, 16]} />
      case "long":
        return <cylinderGeometry args={[1, 1.2, 2, 16]} />
      case "curly":
        return <sphereGeometry args={[1.1, 16, 16]} />
      default:
        return <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
    }
  }

  return (
    <mesh ref={meshRef}>
      {getHairGeometry()}
      <meshStandardMaterial color={getHairColor()} roughness={0.7} metalness={0.1} />
    </mesh>
  )
}