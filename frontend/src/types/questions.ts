export interface Question {
    id: string
    questionText: string
    options: string[]
    correctAnswer: number
    createdAt?: string
    updatedAt?: string
}


export interface CreateQuestionData {
    questionText: string
    options: string[]
    correctAnswer: number
}

export interface UpdateQuestionData extends CreateQuestionData {
    id: string
}
