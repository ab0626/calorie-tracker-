import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'
import MealForm from './MealForm'
import { API_BASE_URL } from '../utils/api'

function CameraCapture({ userId }) {
  const [image, setImage] = useState(null)
  const [recognizedFoods, setRecognizedFoods] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showMealForm, setShowMealForm] = useState(false)
  const webcamRef = useRef(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setImage(imageSrc)
    }
  }, [webcamRef])

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const recognizeFood = async () => {
    if (!image) return

    setLoading(true)
    setError(null)

    try {
      // Convert data URL to blob
      const response = await fetch(image)
      const blob = await response.blob()

      // Create form data
      const formData = new FormData()
      formData.append('file', blob, 'food-image.jpg')

      // Send to API
      const result = await axios.post(`${API_BASE_URL}/api/recognize-food`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setRecognizedFoods(result.data)
      setShowMealForm(true)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to recognize food. Please try again.')
      console.error('Error recognizing food:', err)
    } finally {
      setLoading(false)
    }
  }

  const resetCapture = () => {
    setImage(null)
    setRecognizedFoods(null)
    setError(null)
    setShowMealForm(false)
  }

  const handleMealSaved = () => {
    resetCapture()
    // Optionally show success message
  }

  if (showMealForm && recognizedFoods) {
    return (
      <MealForm
        userId={userId}
        recognizedFoods={recognizedFoods.foods}
        totalCalories={recognizedFoods.total_calories}
        image={image}
        onSave={handleMealSaved}
        onCancel={resetCapture}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Capture Your Food</h2>
        <p className="text-gray-600 mb-6">
          Take a photo or upload an image of your food, drink, or snack. Our AI will identify it and calculate calories.
        </p>

        {!image ? (
          <div className="space-y-4">
            {/* Webcam */}
            <div className="relative w-full max-w-md mx-auto">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: 'environment'
                }}
              />
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={capture}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  📷 Capture Photo
                </button>
                <label className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors cursor-pointer">
                  📁 Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative w-full max-w-md mx-auto">
              <img src={image} alt="Captured food" className="w-full rounded-lg" />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={recognizeFood}
                disabled={loading}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? '🔍 Analyzing...' : '🔍 Recognize Food'}
              </button>
              <button
                onClick={resetCapture}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Retake
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>

      {recognizedFoods && !showMealForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Recognized Foods</h3>
          <div className="space-y-2">
            {recognizedFoods.foods.map((food, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-semibold">{food.name}</span>
                  <span className="text-gray-600 ml-2">
                    ({food.quantity} {food.unit})
                  </span>
                </div>
                <span className="font-bold text-primary-600">{food.calories} kcal</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-lg font-bold">Total Calories:</span>
              <span className="text-2xl font-bold text-primary-600">
                {recognizedFoods.total_calories} kcal
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CameraCapture

