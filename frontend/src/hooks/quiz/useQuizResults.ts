"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import type { QuizResult } from "../../types"

export function useQuizResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const [result, setResult] = useState<QuizResult | null>(null)

  useEffect(() => {
    const resultData = location.state?.result as QuizResult
    if (resultData) {
      setResult(resultData)
    } else {
      navigate("/quiz")
    }
  }, [location.state, navigate])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getScorePercentage = () => {
    if (!result) return 0
    return Math.round((result.correct / result.total) * 100)
  }

  const getScoreColor = () => {
    const percentage = getScorePercentage()
    if (percentage >= 80) return "text-green-500"
    if (percentage >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreMessage = () => {
    const percentage = getScorePercentage()
    if (percentage >= 90) return "Excellent work! 🎉"
    if (percentage >= 80) return "Great job! 👏"
    if (percentage >= 70) return "Good effort! 👍"
    if (percentage >= 60) return "Not bad, keep practicing! 📚"
    return "Keep studying and try again! 💪"
  }

  const retakeQuiz = () => navigate("/quiz")
  const goToQuestions = () => navigate("/questions")

  return {
    result,
    setResult,
    formatTime,
    getScorePercentage,
    getScoreColor,
    getScoreMessage,
    retakeQuiz,
    goToQuestions,
  }
}
