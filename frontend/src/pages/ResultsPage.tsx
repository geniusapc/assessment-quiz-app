// src/pages/ResultsPage.tsx
"use client"

import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, ArrowLeft } from "lucide-react"
import type { QuizResult } from "../types"
import { useQuizResults } from "../hooks/quiz/useQuizResults"

export default function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { result, setResult, formatTime, getScorePercentage, getScoreColor, getScoreMessage, retakeQuiz, goToQuestions } =
    useQuizResults()

  // Load result from location state
  useEffect(() => {
    const resultData = location.state?.result as QuizResult | undefined
    if (!resultData) {
      navigate("/quiz")
      return
    }
    setResult(resultData)
  }, [location.state, navigate, setResult])

  if (!result) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No quiz results found</p>
          <button onClick={retakeQuiz} className="btn-primary">
            Take Quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Results Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Trophy className={`h-16 w-16 ${getScoreColor()}`} />
        </div>
        <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
        <p className="text-muted-foreground">{getScoreMessage()}</p>
      </div>

      {/* Score Card */}
      <div className="card p-8">
        <div className="text-center space-y-6">
          <div>
            <div className={`text-6xl font-bold ${getScoreColor()}`}>{getScorePercentage()}%</div>
            <p className="text-muted-foreground mt-2">Overall Score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border">
            <Stat icon={<CheckCircle className="h-8 w-8 text-green-500" />} value={result.correct} label="Correct" />
            <Stat
              icon={<XCircle className="h-8 w-8 text-red-500" />}
              value={result.total - result.correct}
              label="Incorrect"
            />
            <Stat
              icon={<Clock className="h-8 w-8 text-primary" />}
              value={formatTime(result.timeTaken)}
              label="Time Taken"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Quiz Summary</h2>
        <SummaryRow label="Total Questions" value={result.total} />
        <SummaryRow label="Correct Answers" value={result.correct} color="text-green-500" />
        <SummaryRow label="Incorrect Answers" value={result.total - result.correct} color="text-red-500" />
        <SummaryRow label="Accuracy" value={`${getScorePercentage()}%`} color={getScoreColor()} />
        <SummaryRow label="Time Taken" value={formatTime(result.timeTaken)} />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={retakeQuiz} className="btn-primary flex items-center space-x-2">
          <RotateCcw className="h-4 w-4" />
          <span>Take Quiz Again</span>
        </button>
        <button onClick={goToQuestions} className="btn-secondary flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Questions</span>
        </button>
      </div>
    </div>
  )
}

/* --- Small UI Components --- */
function Stat({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function SummaryRow({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${color || ""}`}>{value}</span>
    </div>
  )
}
