"use client"

import { useState, useRef } from "react"
import { Upload, RotateCw, User } from "lucide-react"

export default function CustomizationPanel({
  clothingType,
  onClothingTypeChange,
  onClothingUpload,
  processingImage,
  hairStyle,
  onHairStyleChange,
  beardStyle,
  onBeardStyleChange,
}) {
  const [activeTab, setActiveTab] = useState("clothing")
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onClothingUpload(e.target.files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
            activeTab === "clothing" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("clothing")}
        >
          <Upload className="inline-block w-4 h-4 mr-1" />
          Kıyafet
        </button>
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
            activeTab === "hair" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("hair")}
        >
          <User className="inline-block w-4 h-4 mr-1" />
          Saç Stili
        </button>
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
            activeTab === "animation" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("animation")}
        >
          <RotateCw className="inline-block w-4 h-4 mr-1" />
          Animasyon
        </button>
      </div>

      <div className="p-6">
        {activeTab === "clothing" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kıyafet Tipi</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    clothingType === "tshirt"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onClothingTypeChange("tshirt")}
                >
                  Tişört / Üst
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    clothingType === "pants"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onClothingTypeChange("pants")}
                >
                  Pantolon / Alt
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    clothingType === "jacket"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onClothingTypeChange("jacket")}
                >
                  Ceket / Dış Giyim
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    clothingType === "dress"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onClothingTypeChange("dress")}
                >
                  Elbise
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kıyafet Resmi Yükle</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span onClick={triggerFileInput}>Bir dosya seçin</span>
                      <input
                        ref={fileInputRef}
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={processingImage}
                      />
                    </label>
                    <p className="pl-1">veya sürükleyip bırakın</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF maks. 10MB</p>
                </div>
              </div>
              {processingImage && <p className="mt-2 text-sm text-blue-500">Resim işleniyor, lütfen bekleyin...</p>}
            </div>
          </div>
        )}

        {activeTab === "hair" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Saç Stili</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    hairStyle === "short"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onHairStyleChange("short")}
                >
                  Kısa
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    hairStyle === "medium"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onHairStyleChange("medium")}
                >
                  Orta
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    hairStyle === "long"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onHairStyleChange("long")}
                >
                  Uzun
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    hairStyle === "curly"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onHairStyleChange("curly")}
                >
                  Kıvırcık
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    hairStyle === "none"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onHairStyleChange("none")}
                >
                  Saçsız
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Saç Rengi</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    hairStyle === "black"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onHairStyleChange("black")}
                >
                  Siyah
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    hairStyle === "brown"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onHairStyleChange("brown")}
                >
                  Kahverengi
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    hairStyle === "blonde"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onHairStyleChange("blonde")}
                >
                  Sarı
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    hairStyle === "red"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onHairStyleChange("red")}
                >
                  Kızıl
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    hairStyle === "gray"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onHairStyleChange("gray")}
                >
                  Gri
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sakal Stili</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    beardStyle === "none"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onBeardStyleChange("none")}
                >
                  Sakalsız
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    beardStyle === "stubble"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onBeardStyleChange("stubble")}
                >
                  Kirli Sakal
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    beardStyle === "short"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onBeardStyleChange("short")}
                >
                  Kısa Sakal
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    beardStyle === "full"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onBeardStyleChange("full")}
                >
                  Tam Sakal
                </button>
                <button
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    beardStyle === "goatee"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => onBeardStyleChange("goatee")}
                >
                  Keçi Sakalı
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "animation" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Avatarınızın animasyonunu kontrol etmek için sayfanın alt kısmındaki düğmeleri kullanın. İki farklı mod
              mevcuttur: "Bekle" (idle) ve "Döndür" (spin).
            </p>
            <p className="text-sm text-gray-700 font-medium">
              İpucu: Kıyafetleri daha iyi görmek için avatarınızı döndürebilirsiniz.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}