
import { useState } from "react"
import { useQuestionStore } from "../../stores/questionStore"
import { useAppStore } from "../../stores/appStore"
import { questionService } from "../../utils/services/questionService"
import type { Question } from "../../types"

export function useQuestionOperations() {
  const { addQuestion, updateQuestion, removeQuestion, setError } = useQuestionStore()
  const { addNotification } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateQuestion = async (questionData: {
    questionText: string
    options: string[]
    correctAnswer: number
  }) => {
    try {
      setIsLoading(true)
      const newQuestion = await questionService.createQuestion(questionData)
      addQuestion(newQuestion.data)
      setShowForm(false)
      addNotification({
        type: "success",
        title: "Question Created",
        message: "Your question has been successfully created.",
      })
      setIsLoading(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setIsLoading(false)
      const errorMessage = err.response?.data?.message || "Failed to create question"
      setError(errorMessage)
      addNotification({
        type: "error",
        title: "Error Creating Question",
        message: errorMessage,
      })
    }
  }

  const handleUpdateQuestion = async (questionData: {
    questionText: string
    options: string[]
    correctAnswer: number
  }) => {
    if (!editingQuestion) return

    try {
      const updatedQuestion = await questionService.updateQuestion({
        id: editingQuestion.id,
        ...questionData,
      })

      console.log({ updatedQuestion });

      updateQuestion(updatedQuestion.data)
      setEditingQuestion(null)
      setShowForm(false)
      addNotification({
        type: "success",
        title: "Question Updated",
        message: "Your question has been successfully updated.",
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update question"
      setError(errorMessage)
      addNotification({
        type: "error",
        title: "Error Updating Question",
        message: errorMessage,
      })
    }
  }

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return

    try {
      await questionService.deleteQuestion(id)
      removeQuestion(id)
      addNotification({
        type: "success",
        title: "Question Deleted",
        message: "The question has been successfully deleted.",
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to delete question"
      setError(errorMessage)
      addNotification({
        type: "error",
        title: "Error Deleting Question",
        message: errorMessage,
      })
    }
  }

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingQuestion(null)
  }

  return {
    isLoading,
    showForm,
    editingQuestion,
    setShowForm,
    handleCreateQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    handleEditQuestion,
    handleCancelForm,
  }
}
