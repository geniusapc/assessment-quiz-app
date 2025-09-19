import QuestionForm from "./QuestionForm"
import type { Question } from "../../types"

interface QuestionFormModalProps {
  isOpen: boolean
  editingQuestion: Question | null
  onSubmit: (questionData: {
    questionText: string
    options: string[]
    correctAnswer: number
  }) => Promise<void>
  onCancel: () => void
}

export default function QuestionFormModal({ isOpen, editingQuestion, onSubmit, onCancel }: QuestionFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingQuestion ? "Edit Question" : "Add New Question"}
          </h2>
          <QuestionForm initialData={editingQuestion} onSubmit={onSubmit} onCancel={onCancel} />
        </div>
      </div>
    </div>
  )
}