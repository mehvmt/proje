"use client"

import { useState, useEffect } from "react"

export default function MeasurementForm({ measurements, onMeasurementChange }) {
  const [formValues, setFormValues] = useState(measurements)

  useEffect(() => {
    setFormValues(measurements)
  }, [measurements])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: Number.parseFloat(value),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onMeasurementChange(formValues)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Vücut Ölçüleriniz</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Boy (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formValues.height}
              onChange={handleInputChange}
              min="140"
              max="220"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <span className="text-xs text-gray-500">Önerilen aralık: 140-220 cm</span>
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Kilo (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formValues.weight}
              onChange={handleInputChange}
              min="40"
              max="150"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <span className="text-xs text-gray-500">Önerilen aralık: 40-150 kg</span>
          </div>

          <div>
            <label htmlFor="waist" className="block text-sm font-medium text-gray-700">
              Bel Çevresi (cm)
            </label>
            <input
              type="number"
              id="waist"
              name="waist"
              value={formValues.waist}
              onChange={handleInputChange}
              min="60"
              max="140"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <span className="text-xs text-gray-500">Önerilen aralık: 60-140 cm</span>
          </div>

          <div>
            <label htmlFor="chest" className="block text-sm font-medium text-gray-700">
              Göğüs Çevresi (cm)
            </label>
            <input
              type="number"
              id="chest"
              name="chest"
              value={formValues.chest}
              onChange={handleInputChange}
              min="70"
              max="150"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <span className="text-xs text-gray-500">Önerilen aralık: 70-150 cm</span>
          </div>

          <div>
            <label htmlFor="shoulders" className="block text-sm font-medium text-gray-700">
              Omuz Genişliği (cm)
            </label>
            <input
              type="number"
              id="shoulders"
              name="shoulders"
              value={formValues.shoulders}
              onChange={handleInputChange}
              min="35"
              max="65"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <span className="text-xs text-gray-500">Önerilen aralık: 35-65 cm</span>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Avatarı Güncelle
          </button>
        </div>
      </form>
    </div>
  )
}