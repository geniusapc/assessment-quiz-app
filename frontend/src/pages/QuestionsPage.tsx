import { useEffect } from "react"
import { Plus } from "lucide-react"
import { useAppStore } from "../stores/appStore"
import { useQuestionOperations } from "../hooks/questions/useQuestionOperations"
import { QuestionCard, QuestionFormModal } from "../components/questions"
import { LoadingSpinner, ErrorMessage, EmptyState } from "../components/ui"
import { useQuestionStore } from "../stores/questionStore"
import { questionService } from "../utils/services/questionService"
import { Button } from "../components/ui/Button"

export default function QuestionsPage() {
  const { questions, loading, error, setQuestions, setLoading, setError } = useQuestionStore()
  const { addNotification } = useAppStore()

  console.log({ questions })

  const {
    showForm,
    editingQuestion,
    setShowForm,
    handleCreateQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    handleEditQuestion,
    handleCancelForm,
    isLoading

  } = useQuestionOperations()

  useEffect(() => {
    loadQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadQuestions = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await questionService.getAllQuestions()
      setQuestions(data.data)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to load questions"
      setError(errorMessage)
      addNotification({
        type: "error",
        title: "Error Loading Questions",
        message: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading && questions.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading your questions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Questions Management</h1>
          <p className="text-gray-600 mt-2">Create and manage quiz questions</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-5 w-5" />
          <span>Add Question</span>
        </Button>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      <QuestionFormModal
        isOpen={showForm}
        editingQuestion={editingQuestion}
        onSubmit={editingQuestion ? handleUpdateQuestion : handleCreateQuestion}
        onCancel={handleCancelForm}
        isLoading={isLoading}
      />

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="pt-8">
          <EmptyState
            title="No questions yet"
            description="Start building your quiz by adding your first question."
            action={
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-5 w-5" />
                <span>Add Your First Question</span>
              </Button>

            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              onEdit={handleEditQuestion}
              onDelete={handleDeleteQuestion}
            />
          ))}
        </div>
      )}
    </div>
  )
}