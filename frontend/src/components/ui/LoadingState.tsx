import LoadingSpinner from "./LoadingSpinner"

type LoadingStateProps = {
    message?: string
    size?: "sm" | "md" | "lg"
    fullScreen?: boolean
}

export default function LoadingState({
    message = "Loading...",
    size = "md",
    fullScreen = false,
}: LoadingStateProps) {
    const containerClass = fullScreen
        ? " min-h-screen"
        : ""

    return (
        <div className={`flex items-center justify-center ${containerClass}`}>
            <div className="flex flex-col items-center text-center">
                <LoadingSpinner size={size} />
                {message && <p className="mt-4 text-gray-600">{message}</p>}
            </div>
        </div>
    )
}
