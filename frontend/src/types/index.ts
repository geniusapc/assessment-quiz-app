export interface User {
    id: string
    email: string
    name?: string
}

export interface AuthResponse {
    data: {
        accessToken: string
        user: User
    },
    message: string,
    statusCode: number,
    success: boolean,
}

export interface ApiError {
    message: string
    status?: number
}
