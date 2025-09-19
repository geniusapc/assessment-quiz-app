import { useState } from "react"
import { Brain } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { AuthForm } from "../components/auth"
import type { AuthFormData } from "../utils/services/authService"

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const { loading, error, authenticate, clearError } = useAuth()

    const handleFormSubmit = (formData: AuthFormData) => {
        authenticate(isLogin, formData)
    }

    const toggleAuthMode = () => {
        setIsLogin(!isLogin)
        clearError()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-300 hover:shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-blue-100 rounded-2xl">
                                <Brain className="h-10 w-10 text-blue-600" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-gray-600">
                            {isLogin ? "Sign in to access your quiz dashboard" : "Join us to start creating and taking quizzes"}
                        </p>
                    </div>

                    <AuthForm
                        isLogin={isLogin}
                        onSubmit={handleFormSubmit}
                        loading={loading}
                        error={error}
                        onErrorClear={clearError}
                    />

                    {/* Toggle */}
                    <div className="mt-6 text-center pt-4 border-t border-gray-100">
                        <p className="text-gray-600">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                type="button"
                                onClick={toggleAuthMode}
                                className="ml-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                disabled={loading}
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}