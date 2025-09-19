import { z } from "zod"

// Auth schemas
export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>