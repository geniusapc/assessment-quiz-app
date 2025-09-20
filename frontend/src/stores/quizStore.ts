import { create } from "zustand"
import type { Question, QuizAnswer, QuizResult } from "../types"

interface QuizState {
  questions: Question[]
  currentQuestionIndex: number
  answers: QuizAnswer[]
  startTime: number | null
  endTime: number | null
  result: QuizResult | null
  loading: boolean
  error: string | null

  // Actions
  setQuestions: (questions: Question[]) => void
  setCurrentQuestionIndex: (index: number) => void
  setAnswer: (questionId: string, answer: number) => void
  startQuiz: () => void
  endQuiz: () => void
  setResult: (result: QuizResult) => void
  resetQuiz: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Getters
  getCurrentQuestion: () => Question | null
  getAnswer: (questionId: string) => number | null
  getElapsedTime: () => number
  isLastQuestion: () => boolean
  isFirstQuestion: () => boolean
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  startTime: null,
  endTime: null,
  result: null,
  loading: false,
  error: null,

  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setAnswer: (questionId, answer) =>
    set((state) => {
      const existingAnswerIndex = state.answers.findIndex((a) => a.questionId === questionId)
      const newAnswer: QuizAnswer = { questionId, answer }

      if (existingAnswerIndex >= 0) {
        const newAnswers = [...state.answers]
        newAnswers[existingAnswerIndex] = newAnswer
        return { answers: newAnswers }
      } else {
        return { answers: [...state.answers, newAnswer] }
      }
    }),

  startQuiz: () => set({ startTime: Date.now(), endTime: null, result: null }),
  endQuiz: () => set({ endTime: Date.now() }),
  setResult: (result) => set({ result }),
  resetQuiz: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      startTime: null,
      endTime: null,
      result: null,
      error: null,
    }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  getCurrentQuestion: () => {
    const { questions, currentQuestionIndex } = get()
    return questions[currentQuestionIndex] || null
  },

  getAnswer: (questionId) => {
    const { answers } = get()
    const answer = answers.find((a) => a.questionId === questionId)
    return answer?.answer ?? null
  },

  getElapsedTime: () => {
    const { startTime, endTime } = get()
    if (!startTime) return 0
    const end = endTime || Date.now()
    return Math.floor((end - startTime) / 1000)
  },

  isLastQuestion: () => {
    const { questions, currentQuestionIndex } = get()
    return currentQuestionIndex === questions.length - 1
  },

  isFirstQuestion: () => {
    const { currentQuestionIndex } = get()
    return currentQuestionIndex === 0
  },
}))
