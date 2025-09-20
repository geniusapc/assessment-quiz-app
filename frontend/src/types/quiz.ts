export interface QuizAnswer {
    questionId: string
    answer: number
}

export interface QuizResult {
    score: number,
    total: number,
    correct: number,
    timeTaken: number,
    answers: QuizAnswer[]
}