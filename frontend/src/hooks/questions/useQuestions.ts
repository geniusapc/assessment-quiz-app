// hooks/questions/useQuestions.ts
import { useEffect } from "react"
import { useAppStore } from "../../stores/appStore"
import { useQuestionStore } from "../../stores/questionStore"
import { questionService } from "../../utils/services/questionService"

export function useQuestions() {
    const { questions, loading, error, setQuestions, setLoading, setError } = useQuestionStore()
    const { addNotification } = useAppStore()

    useEffect(() => {
        loadQuestions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadQuestions = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await questionService.getAllQuestions()
            setQuestions(data.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Failed to load questions"
            setError(errorMessage)
            addNotification({
                type: "error",
                title: "Error Loading Questions",
                message: errorMessage,
            })
        } finally {
            setLoading(false)
        }
    }

    return { questions, loading, error, reload: loadQuestions }
}
