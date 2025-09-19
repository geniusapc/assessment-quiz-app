import z from "zod";

export const questionSchema = z.object({
    questionText: z.string().min(1, "Question text is required").min(10, "Question text must be at least 10 characters long"),
    options: z
        .array(z.string().min(1, "Option cannot be empty"))
        .min(2, "At least 2 answer options are required")
        .max(6, "Maximum 6 answer options allowed"),
    correctAnswer: z.number().min(0, "Please select a valid correct answer"),
})