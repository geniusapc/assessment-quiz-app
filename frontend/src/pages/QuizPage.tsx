import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuizStore } from "../stores/quizStore"
import { quizService } from "../utils/services/quizService"
import { useQuizTimer } from "../hooks/quiz/useQuizTimer"
import { QuizHeader, QuizNavigation } from "../components/quiz"
import { LoadingSpinner, ErrorMessage, EmptyState } from "../components/ui"

export default function QuizPage() {
  const navigate = useNavigate()
  const {
    questions,
    currentQuestionIndex,
    answers,
    startTime,
    loading,
    error,
    setQuestions,
    setCurrentQuestionIndex,
    setAnswer,
    startQuiz,
    endQuiz,
    resetQuiz,
    setLoading,
    setError,
    getCurrentQuestion,
    getAnswer,
    getElapsedTime,
    isLastQuestion,
    isFirstQuestion,
  } = useQuizStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { elapsedTime, formatTime } = useQuizTimer(startTime, getElapsedTime)

  // Load quiz questions
  useEffect(() => {
    loadQuiz()
    return () => {
      resetQuiz()
    }
  }, [])

  const loadQuiz = async () => {
    try {
      setLoading(true)
      setError(null)
      const quizQuestions = await quizService.startQuiz()

      if (quizQuestions.data.length === 0) {
        setError("No questions available for the quiz")
        return
      }

      setQuestions(quizQuestions.data)
      startQuiz()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load quiz")
    } finally {
      setLoading(false)
    }
  }

  const currentQuestion = getCurrentQuestion()
  const currentAnswer = currentQuestion ? getAnswer(currentQuestion.id) : null

  const handleAnswerSelect = (answer: number) => {
    if (currentQuestion) {
      setAnswer(currentQuestion.id, answer)
    }
  }

  const handleNext = () => {
    if (!isLastQuestion()) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstQuestion()) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = async () => {
    if (!startTime) return

    setIsSubmitting(true)
    try {
      endQuiz()
      const timeTaken = getElapsedTime()

      const result = await quizService.submitQuiz({
        answers,
        timeTaken,
      })

      console.log(result.data)

      navigate("/results", { state: { result: result.data } })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit quiz")
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <ErrorMessage message={error} />
        <div className="text-center">
          <button onClick={loadQuiz} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <EmptyState
        title="No questions available"
        description="There are no questions available for the quiz at the moment."
        action={
          <button onClick={() => navigate("/questions")} className="btn-primary">
            Manage Questions
          </button>
        }
      />
    )
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Question not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <QuizHeader
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        answeredCount={answers.length}
        elapsedTime={elapsedTime}
        formatTime={formatTime}
      />

      {/* Question Card */}
      <div className="card p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.questionText}</h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${currentAnswer === index
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-muted-foreground"
                  }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={currentAnswer === index}
                  onChange={() => handleAnswerSelect(index)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm font-medium text-muted-foreground min-w-[20px]">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="flex-1">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <QuizNavigation
        isFirstQuestion={isFirstQuestion()}
        isLastQuestion={isLastQuestion()}
        isSubmitting={isSubmitting}
        answersCount={answers.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
