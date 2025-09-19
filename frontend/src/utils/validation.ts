import { z } from "zod"

export function validateWithSchema<T>(schema: z.ZodSchema<T>, data: unknown) {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => err.message)
      return { success: false, errors }
    }
    return { success: false, errors: ["Validation failed"] }
  }
}

export function getFirstError(errors?: string[]): string {
  return errors?.[0] || "Validation failed"
}

export function validateFormData<T>(schema: z.ZodSchema<T>, data: unknown) {
  try {
    const validatedData = schema.parse(data)
    return { isValid: true, errors: {}, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach((err) => {
        const path = err.path.join(".")
        errors[path] = err.message
      })
      return { isValid: false, errors }
    }
    return { isValid: false, errors: { general: "Validation failed" } }
  }
}
