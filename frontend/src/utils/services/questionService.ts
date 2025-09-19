import { apiV1 } from "../api"
import type {  ApiResult, CreateQuestionData, Question, UpdateQuestionData } from "../../types"


export const questionService = {
  async getAllQuestions(): ApiResult<Question[]> {
    const response = await apiV1.get("/questions")
    return response.data
  },

  async createQuestion(data: CreateQuestionData): ApiResult<Question> {
    const response = await apiV1.post("/questions", data)
    return response.data
  },

  async updateQuestion(data: UpdateQuestionData): ApiResult<Question> {
    const response = await apiV1.put(`/questions/${data.id}`, {
      questionText: data.questionText,
      options: data.options,
      correctAnswer: data.correctAnswer,
    })
    return response.data
  },

  async deleteQuestion(id: string): Promise<void> {
    await apiV1.delete(`/questions/${id}`)
  },
}
