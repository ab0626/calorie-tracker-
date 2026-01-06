import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../utils/api'

function MealForm({ userId, recognizedFoods, totalCalories, image, onSave, onCancel }) {
  const [mealType, setMealType] = useState('snack')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const mealData = {
        user_id: userId,
        meal_type: mealType,
        food_items: recognizedFoods,
        total_calories: totalCalories,
        notes: notes || null
      }

      await axios.post(`${API_BASE_URL}/api/meals`, mealData)

      onSave()
      navigate('/meals')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save meal. Please try again.')
      console.error('Error saving meal:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Log Your Meal</h2>

      {image && (
        <div className="mb-4">
          <img src={image} alt="Food" className="w-full max-w-xs mx-auto rounded-lg" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meal Type
          </label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recognized Foods
          </label>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {recognizedFoods.map((food, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{food.name}</span>
                <span className="text-primary-600 font-semibold">
                  {food.calories} kcal
                </span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between items-center font-bold">
              <span>Total:</span>
              <span className="text-primary-600">{totalCalories} kcal</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Add any notes about this meal..."
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Meal'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default MealForm

