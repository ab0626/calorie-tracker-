import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CameraCapture from './components/CameraCapture'
import MealList from './components/MealList'
import DailyStats from './components/DailyStats'
import './App.css'

function App() {
  const [userId] = useState(1) // In production, implement proper user authentication

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile-friendly header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-primary-600">CalAI</h1>
            <p className="text-sm text-gray-600">AI-Powered Calorie Tracker</p>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-t border-gray-200 sticky bottom-0 z-50 md:hidden">
          <div className="flex justify-around">
            <Link to="/" className="flex-1 py-4 text-center text-gray-600 hover:text-primary-600">
              <div className="text-2xl">📷</div>
              <div className="text-xs mt-1">Capture</div>
            </Link>
            <Link to="/meals" className="flex-1 py-4 text-center text-gray-600 hover:text-primary-600">
              <div className="text-2xl">🍽️</div>
              <div className="text-xs mt-1">Meals</div>
            </Link>
            <Link to="/stats" className="flex-1 py-4 text-center text-gray-600 hover:text-primary-600">
              <div className="text-2xl">📊</div>
              <div className="text-xs mt-1">Stats</div>
            </Link>
          </div>
        </nav>

        {/* Desktop Navigation */}
        <nav className="hidden md:block bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex space-x-6">
              <Link to="/" className="py-4 text-gray-600 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600">
                Capture Food
              </Link>
              <Link to="/meals" className="py-4 text-gray-600 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600">
                My Meals
              </Link>
              <Link to="/stats" className="py-4 text-gray-600 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600">
                Statistics
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-6 pb-20 md:pb-6">
          <Routes>
            <Route path="/" element={<CameraCapture userId={userId} />} />
            <Route path="/meals" element={<MealList userId={userId} />} />
            <Route path="/stats" element={<DailyStats userId={userId} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

