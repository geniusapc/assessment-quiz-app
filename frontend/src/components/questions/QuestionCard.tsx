import { Edit, Trash2, CheckCircle } from "lucide-react"
import type { Question } from "../../types"

interface QuestionCardProps {
  question: Question
  index: number
  onEdit: (question: Question) => void
  onDelete: (id: string) => void
}

export default function QuestionCard({ question, index, onEdit, onDelete }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              #{index + 1}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-2 leading-tight">
            {question.questionText}
          </h3>
        </div>
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={() => onEdit(question)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-150"
            title="Edit question"
          >
            <Edit className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(question.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-150"
            title="Delete question"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {question.options?.slice(0, 4).map((option, optionIndex) => (
          <div
            key={optionIndex}
            className={`flex items-center space-x-2 p-2 rounded-md border text-xs transition-all duration-150 ${optionIndex === question.correctAnswer
              ? "border-green-400 bg-green-50"
              : "border-gray-150 bg-gray-50"
              }`}
          >
            <span className="text-xs font-medium text-gray-600 min-w-[16px]">
              {String.fromCharCode(65 + optionIndex)}
            </span>
            <span className="flex-1 text-gray-700 truncate">{option}</span>
            {optionIndex === question.correctAnswer && (
              <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
            )}
          </div>
        ))}
        {question.options && question.options.length > 4 && (
          <div className="text-xs text-gray-500 text-center pt-1">
            +{question.options.length - 4} more options
          </div>
        )}
      </div>
    </div>
  )
}