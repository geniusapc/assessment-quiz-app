
export * from "./questions"
export * from "./auth"

export interface ApiError {
    message: string
    status?: number
}

export interface ApiResponse<T> {
    data: T,
    message: string,
    statusCode: number,
    success: boolean,
}


export type ApiResult<T> = Promise<ApiResponse<T>>;
