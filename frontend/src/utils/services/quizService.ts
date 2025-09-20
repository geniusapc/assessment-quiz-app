import { apiV1 } from "../api"
import type { ApiResult, Question, QuizAnswer, QuizResult } from "../../types"

export interface QuizSubmission {
  answers: QuizAnswer[]
  timeTaken: number
}

export const quizService = {
  async startQuiz(): ApiResult<Question[]> {
    const response = await apiV1.get("/quiz/start")
    return response.data
  },

  async submitQuiz(submission: QuizSubmission): ApiResult<QuizResult> {
    const response = await apiV1.post("/quiz/submit", submission)
    return response.data
  },
}
