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
        ? "flex items-center justify-center min-h-screen"
        : "flex items-center justify-center py-16"

    return (
        <div className={containerClass}>
            <div className=" flex flex-col items-center text-center">
                <LoadingSpinner size={size} />
                {message && <p className="mt-4 text-gray-600">{message}</p>}
            </div>
        </div>
    )
}
