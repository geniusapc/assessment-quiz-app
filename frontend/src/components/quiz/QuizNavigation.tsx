"use client"

import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import LoadingSpinner from "../ui/LoadingSpinner"

interface QuizNavigationProps {
  isFirstQuestion: boolean
  isLastQuestion: boolean
  isSubmitting: boolean
  answersCount: number
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
}

export default function QuizNavigation({
  isFirstQuestion,
  isLastQuestion,
  isSubmitting,
  answersCount,
  onPrevious,
  onNext,
  onSubmit,
}: QuizNavigationProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>

      <div className="flex items-center space-x-4">
        {isLastQuestion ? (
          <button
            onClick={onSubmit}
            disabled={isSubmitting || answersCount === 0}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Submit Quiz</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={isLastQuestion}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
