import { Clock, CheckCircle } from "lucide-react"

interface QuizHeaderProps {
  currentQuestionIndex: number
  totalQuestions: number
  answeredCount: number
  elapsedTime: number
  formatTime: (seconds: number) => string
}

export default function QuizHeader({
  currentQuestionIndex,
  totalQuestions,
  answeredCount,
  elapsedTime,
  formatTime,
}: QuizHeaderProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Quiz in Progress</h1>
          <p className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">
              {answeredCount}/{totalQuestions} answered
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{
            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
