import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format, startOfWeek, addDays } from 'date-fns'
import { API_BASE_URL } from '../utils/api'

function DailyStats({ userId }) {
  const [dailyStats, setDailyStats] = useState(null)
  const [weeklyStats, setWeeklyStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [viewMode, setViewMode] = useState('daily') // 'daily' or 'weekly'

  useEffect(() => {
    if (viewMode === 'daily') {
      fetchDailyStats()
    } else {
      fetchWeeklyStats()
    }
  }, [selectedDate, viewMode])

  const fetchDailyStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stats/daily`, {
        params: {
          user_id: userId,
          target_date: selectedDate
        }
      })
      setDailyStats(response.data)
    } catch (err) {
      setError('Failed to load daily stats. Please try again.')
      console.error('Error fetching daily stats:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchWeeklyStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stats/weekly`, {
        params: {
          user_id: userId,
          week_start: selectedDate
        }
      })
      setWeeklyStats(response.data)
    } catch (err) {
      setError('Failed to load weekly stats. Please try again.')
      console.error('Error fetching weekly stats:', err)
    } finally {
      setLoading(false)
    }
  }

  const calorieGoal = 2000 // Default goal, can be made configurable

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-gray-600">Loading statistics...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Statistics</h2>

        {/* View Mode Toggle */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setViewMode('daily')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
              viewMode === 'daily'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
              viewMode === 'weekly'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Weekly
          </button>
        </div>

        {viewMode === 'daily' && (
          <>
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

            {dailyStats && (
              <div className="space-y-4">
                {/* Total Calories */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
                  <div className="text-sm opacity-90 mb-1">Total Calories</div>
                  <div className="text-4xl font-bold">{dailyStats.total_calories}</div>
                  <div className="text-sm opacity-90 mt-2">
                    Goal: {calorieGoal} kcal
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min((dailyStats.total_calories / calorieGoal) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Meal Breakdown */}
                {dailyStats.meal_breakdown && Object.keys(dailyStats.meal_breakdown).length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Meal Breakdown</h3>
                    <div className="space-y-2">
                      {Object.entries(dailyStats.meal_breakdown).map(([mealType, calories]) => (
                        <div key={mealType} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="capitalize font-medium">{mealType}</span>
                          <span className="text-primary-600 font-semibold">{calories} kcal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-600 text-center pt-4">
                  {dailyStats.meal_count} meal{dailyStats.meal_count !== 1 ? 's' : ''} logged
                </div>
              </div>
            )}
          </>
        )}

        {viewMode === 'weekly' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Week Starting
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

            {weeklyStats && (
              <div className="space-y-4">
                {/* Weekly Summary */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
                  <div className="text-sm opacity-90 mb-1">Weekly Total</div>
                  <div className="text-4xl font-bold">{Math.round(weeklyStats.weekly_total)}</div>
                  <div className="text-sm opacity-90 mt-2">
                    Average Daily: {Math.round(weeklyStats.average_daily)} kcal
                  </div>
                </div>

                {/* Daily Breakdown */}
                {weeklyStats.daily_totals && Object.keys(weeklyStats.daily_totals).length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Daily Breakdown</h3>
                    <div className="space-y-2">
                      {Object.entries(weeklyStats.daily_totals)
                        .sort((a, b) => a[0].localeCompare(b[0]))
                        .map(([date, calories]) => (
                          <div key={date} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">
                              {format(new Date(date), 'EEE, MMM dd')}
                            </span>
                            <span className="text-primary-600 font-semibold">{calories} kcal</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default DailyStats

