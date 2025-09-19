import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"
import { authService, type LoginCredentials, type RegisterCredentials } from "../utils/services/authService"
import { loginSchema, registerSchema } from "../schemas"
import { validateWithSchema, getFirstError } from "../utils/validation"


export type IValidAuthFormData = LoginCredentials & RegisterCredentials


export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuthStore()
  const navigate = useNavigate()

  // TODO generate type for the formData


  const validateForm = (isLogin: boolean, formData: IValidAuthFormData) => {
    const schema = isLogin ? loginSchema : registerSchema
    const dataToValidate = isLogin
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password }

    const result = validateWithSchema(schema, dataToValidate)

    if (!result.success) {
      setError(getFirstError(result.errors))
      return false
    }

    return true
  }

  const authenticate = async (isLogin: boolean, formData: IValidAuthFormData) => {
    if (!validateForm(isLogin, formData)) return false

    setLoading(true)
    setError("")

    try {
      let authResponse

      if (isLogin) {
        const credentials: LoginCredentials = {
          email: formData.email,
          password: formData.password,
        }
        authResponse = await authService.login(credentials)
      } else {
        const credentials: RegisterCredentials = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }
        authResponse = await authService.register(credentials)
      }

      login(authResponse)
      navigate("/questions")
      return true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {

      setError(err.response?.data?.message || "Authentication failed. Please try again.")
      return false
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError("")

  return {
    loading,
    error,
    authenticate,
    clearError,
  }
}
