import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { API_BASE_URL } from '../utils/api'

function MealList({ userId }) {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    fetchMeals()
  }, [selectedDate])

  const fetchMeals = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/meals`, {
        params: {
          user_id: userId,
          date: selectedDate
        }
      })
      setMeals(response.data.meals || [])
    } catch (err) {
      setError('Failed to load meals. Please try again.')
      console.error('Error fetching meals:', err)
    } finally {
      setLoading(false)
    }
  }

  const mealTypeEmoji = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🍪'
  }

  const mealTypeLabel = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-gray-600">Loading meals...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">My Meals</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
            {error}
          </div>
        )}

        {meals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🍽️</div>
            <p>No meals logged for this date.</p>
            <p className="text-sm mt-2">Capture a food photo to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {meals.map((meal) => (
              <div key={meal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-2xl mr-2">{mealTypeEmoji[meal.meal_type] || '🍽️'}</span>
                    <span className="font-bold text-lg">{mealTypeLabel[meal.meal_type] || meal.meal_type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{meal.total_calories}</div>
                    <div className="text-sm text-gray-600">kcal</div>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  {meal.food_items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                      <span>{item.name}</span>
                      <span className="text-primary-600 font-semibold">
                        {item.calories} kcal
                      </span>
                    </div>
                  ))}
                </div>

                {meal.notes && (
                  <div className="text-sm text-gray-600 italic border-t border-gray-200 pt-2 mt-2">
                    {meal.notes}
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-2">
                  {format(new Date(meal.date), 'MMM dd, yyyy')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MealList

