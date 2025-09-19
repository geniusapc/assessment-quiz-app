import { Request, Response } from "express";
import * as authService from "@/services/auth.service";
import { ApiResponse } from "@/utils/response";
import { HttpStatus } from "@/utils/httpStatus";
import { asyncHandler } from "@/utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.register(email, password);

    return ApiResponse.success(res, user, "User registered successfully", HttpStatus.CREATED);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    return ApiResponse.success(res, result, "Login successful", HttpStatus.OK);
});
