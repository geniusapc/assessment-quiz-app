import type React from "react"
import { useState, useEffect } from "react"
import { X, Plus, Trash2 } from "lucide-react"
import type { Question } from "../../types"
import ErrorMessage from "../ui/ErrorMessage"
import { questionSchema } from "../../schemas"
import { validateWithSchema, getFirstError } from "../../utils/validation"

interface QuestionFormProps {
  initialData?: Question | null
  onSubmit: (data: {
    questionText: string
    options: string[]
    correctAnswer: number
  }) => void
  onCancel: () => void
}

export default function QuestionForm({ initialData, onSubmit, onCancel }: QuestionFormProps) {
  const [formData, setFormData] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  })
  const [error, setError] = useState("")

  useEffect(() => {
    if (initialData) {
      setFormData({
        questionText: initialData.questionText,
        options: [...initialData.options],
        correctAnswer: initialData.correctAnswer,
      })
    }
  }, [initialData])

  const handleTextChange = (value: string) => {
    setFormData((prev) => ({ ...prev, questionText: value }))
    if (error) setError("")
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData((prev) => ({ ...prev, options: newOptions }))
    if (error) setError("")
  }

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, ""],
      }))
    }
  }

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index)
      setFormData((prev) => ({
        ...prev,
        options: newOptions,
        correctAnswer:
          prev.correctAnswer >= index && prev.correctAnswer > 0 ? prev.correctAnswer - 1 : prev.correctAnswer,
      }))
    }
  }

  const handleCorrectAnswerChange = (index: number) => {
    setFormData((prev) => ({ ...prev, correctAnswer: index }))
  }

  const validateForm = () => {
    const dataToValidate = {
      questionText: formData.questionText,
      options: formData.options.filter((opt) => opt.trim()),
      correctAnswer: formData.correctAnswer,
    }

    const result = validateWithSchema(questionSchema, dataToValidate)

    if (!result.success) {
      setError(getFirstError(result.errors))
      return false
    }

    // Additional validation for correct answer index
    const filledOptions = formData.options.filter((opt) => opt.trim())
    if (formData.correctAnswer >= filledOptions.length) {
      setError("Please select a valid correct answer")
      return false
    }

    if (!formData.options[formData.correctAnswer]?.trim()) {
      setError("The correct answer option cannot be empty")
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Filter out empty options
    const filteredOptions = formData.options.filter((opt) => opt.trim())

    onSubmit({
      questionText: formData.questionText.trim(),
      options: filteredOptions,
      correctAnswer: formData.correctAnswer,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Question Text */}
      <div className="space-y-2">
        <label htmlFor="question-text" className="block text-sm font-medium text-gray-700 mb-2">
          Question Text *
        </label>
        <textarea
          id="question-text"
          value={formData.questionText}
          onChange={(e) => handleTextChange(e.target.value)}
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Enter your question here..."
          rows={3}
        />
      </div>

      {/* Answer Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Answer Options *</label>
          {formData.options.length < 6 && (
            <button
              type="button"
              onClick={addOption}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-lg flex items-center space-x-1 transition-all duration-200"
            >
              <Plus className="h-3 w-3" />
              <span>Add Option</span>
            </button>
          )}
        </div>

        <div className="space-y-3">
          {formData.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={formData.correctAnswer === index}
                  onChange={() => handleCorrectAnswerChange(index)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-600 min-w-[20px]">
                  {String.fromCharCode(65 + index)}.
                </span>
              </div>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
              />
              {formData.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Remove option"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500">Select the radio button next to the correct answer</p>
      </div>

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl flex items-center space-x-2 transition-all duration-200"
        >
          <X className="h-4 w-4" />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl transition-all duration-200"
        >
          {initialData ? "Update Question" : "Create Question"}
        </button>
      </div>
    </form>
  )
}