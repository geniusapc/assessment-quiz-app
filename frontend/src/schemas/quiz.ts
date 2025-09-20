import z from "zod"

export const quizAnswerSchema = z.object({
    questionId: z.string(),
    answer: z.number().min(0),
})

export const quizSubmissionSchema = z.object({
    answers: z.array(quizAnswerSchema),
    timeSpent: z.number().min(0),
})