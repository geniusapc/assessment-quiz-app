import { Plus } from "lucide-react"
import { useQuestionOperations } from "../hooks/questions/useQuestionOperations"
import { QuestionCard, QuestionFormModal } from "../components/questions"
import { ErrorMessage, EmptyState } from "../components/ui"

import { Button } from "../components/ui/Button"
import LoadingState from "../components/ui/LoadingState"
import { useQuestions } from "../hooks/questions/useQuestions"

export default function QuestionsPage() {
  const { questions, loading, error } = useQuestions()

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



  if (loading && questions.length === 0) {
    return <LoadingState message="Loading questions..." size="lg" />
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