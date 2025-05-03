"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import AvatarScene from "./components/AvatarScene"
import MeasurementForm from "./components/MeasurementForm"
import CustomizationPanel from "./components/CustomizationPanel"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function App() {
  const [measurements, setMeasurements] = useState({
    height: 175, // cm
    weight: 70, // kg
    waist: 80, // cm
    chest: 90, // cm
    shoulders: 45, // cm
  })

  const [clothingImage, setClothingImage] = useState(null)
  const [clothingType, setClothingType] = useState("tshirt")
  const [processingImage, setProcessingImage] = useState(false)
  const [hairStyle, setHairStyle] = useState("default")
  const [beardStyle, setBeardStyle] = useState("none")
  const [animation, setAnimation] = useState("idle")

  const handleMeasurementChange = (newMeasurements) => {
    setMeasurements(newMeasurements)
  }

  const handleClothingUpload = async (file) => {
    if (!file) return

    setProcessingImage(true)

    const formData = new FormData()
    formData.append("image", file)
    formData.append("type", clothingType)

    try {
      // Assuming API is hosted on Render
      const response = await fetch("https://your-backend-service.onrender.com/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Image processing failed")
      }

      const data = await response.json()
      setClothingImage(data.image)
      toast.success("Kıyafet başarıyla yüklendi!")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Kıyafet yüklenirken hata oluştu!")
    } finally {
      setProcessingImage(false)
    }
  }

  const handleAnimationChange = (newAnimation) => {
    setAnimation(newAnimation)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">3D Sanal Prova Odası</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
            <div className="h-[600px]">
              <Canvas shadows camera={{ position: [0, 1.5, 3], fov: 50 }}>
                <AvatarScene
                  measurements={measurements}
                  clothingImage={clothingImage}
                  clothingType={clothingType}
                  hairStyle={hairStyle}
                  beardStyle={beardStyle}
                  animation={animation}
                />
              </Canvas>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-center space-x-4">
                <button
                  className={`px-4 py-2 rounded-md ${animation === "idle" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => handleAnimationChange("idle")}
                >
                  Bekle
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${animation === "spin" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => handleAnimationChange("spin")}
                >
                  Döndür (360°)
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <MeasurementForm measurements={measurements} onMeasurementChange={handleMeasurementChange} />

            <CustomizationPanel
              clothingType={clothingType}
              onClothingTypeChange={setClothingType}
              onClothingUpload={handleClothingUpload}
              processingImage={processingImage}
              hairStyle={hairStyle}
              onHairStyleChange={setHairStyle}
              beardStyle={beardStyle}
              onBeardStyleChange={setBeardStyle}
            />
          </div>
        </div>
      </main>

      <ToastContainer position="bottom-right" />
    </div>
  )
}