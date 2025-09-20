import { Request, Response } from "express";
import { asyncHandler } from "@/utils/async-handler";
import { ApiResponse } from "@/utils/api-response";
import * as questionService from "@/services/questions.service";

export const listQuestions = asyncHandler(async (req: Request, res: Response) => {
    const questions = await questionService.listQuestionsForQuiz();
    return ApiResponse.success(res, questions, "Questions retrieved successfully");
});

export const submitAnswers = asyncHandler(async (req: Request, res: Response) => {
    const result = await questionService.submitAnswers(req.body);
    return ApiResponse.success(res, result, "Quiz submitted successfully");
});