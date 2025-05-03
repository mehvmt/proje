"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function BeardModel({ style, scale }) {
  const meshRef = useRef()

  useEffect(() => {
    if (meshRef.current) {
      // Position the beard on the face
      meshRef.current.position.set(0, scale * 1.35, scale * 0.15)
      // Scale according to overall avatar scale
      meshRef.current.scale.set(scale * 0.25, scale * 0.1, scale * 0.25)
    }
  }, [scale])

  if (style === "none") {
    return null
  }

  const getBeardColor = () => {
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

  const getBeardGeometry = () => {
    switch (style) {
      case "stubble":
        return <boxGeometry args={[1, 0.5, 0.75]} />
      case "short":
        return <coneGeometry args={[1, 1, 16]} />
      case "full":
        return <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, Math.PI * 0.25, Math.PI * 0.5]} />
      case "goatee":
        return <coneGeometry args={[0.5, 1, 16]} />
      default:
        return <boxGeometry args={[1, 0.5, 0.75]} />
    }
  }

  return (
    <mesh ref={meshRef}>
      {getBeardGeometry()}
      <meshStandardMaterial color={getBeardColor()} roughness={0.8} metalness={0.05} />
    </mesh>
  )
}