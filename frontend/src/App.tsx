import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom"
import { useAuthStore } from "./stores/authStore"
import AuthPage from "./pages/AuthPage"
import { ProtectedRoute, RouteGuard } from "./components/routing"
import { NotificationToast } from "./components/ui"
import QuestionsPage from "./pages/QuestionsPage"
import { Layout } from "./components/layout"
import QuizPage from "./pages/QuizPage"
import ResultsPage from "./pages/ResultsPage"

function App() {
  const { isAuthenticated } = useAuthStore()

  return (

    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <RouteGuard>
          <Routes>
            <Route path="/auth" element={isAuthenticated ? <Navigate to="/questions" replace /> : <AuthPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/questions" replace />} />
              <Route
                path="questions"
                element={
                  <ProtectedRoute>
                    <QuestionsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="quiz" element={<QuizPage />} />
              <Route path="results" element={<ResultsPage />} />

            </Route>
            <Route path="*" element={<Navigate to="/questions" replace />} />
          </Routes>
        </RouteGuard>
        <NotificationToast />
      </div>
    </BrowserRouter>
  )
}

export default App
