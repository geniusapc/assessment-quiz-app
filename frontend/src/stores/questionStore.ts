import { create } from "zustand"
import type { Question } from "../types"

interface QuestionState {
  questions: Question[]
  loading: boolean
  error: string | null
  setQuestions: (questions: Question[]) => void
  addQuestion: (question: Question) => void
  updateQuestion: (question: Question) => void
  removeQuestion: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useQuestionStore = create<QuestionState>((set) => ({
  questions: [],
  loading: false,
  error: null,
  setQuestions: (questions) => set({ questions }),
  addQuestion: (question) => set((state) => ({ questions: [...state.questions, question] })),
  updateQuestion: (updatedQuestion) =>
    set((state) => ({
      questions: state.questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)),
    })),
  removeQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
