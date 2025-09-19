import { type ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

type ButtonProps = {
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "destructive";
    children: ReactNode;
    onClick?: () => void;
};

export function Button({
    type = "button",
    loading = false,
    disabled = false,
    variant = "primary",
    children,
    onClick,
}: ButtonProps) {
    const baseStyles =
        "w-full flex justify-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed";

    const variants: Record<typeof variant, string> = {
        primary:
            "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 border border-transparent",
        secondary:
            "text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-gray-400 border border-gray-300",
        destructive:
            "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]}`}
        >
            {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>{children}</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}
