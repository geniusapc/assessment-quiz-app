// src/controllers/questions.controller.ts
import { Request, Response } from 'express';
import * as questionService from '../services/questions.service';
import { asyncHandler } from '@/utils/async-handler';
import { ApiResponse } from '@/utils/api-response';
import { HttpStatus } from '@/utils/http-status';

export const listQuestions = asyncHandler(async (req: Request, res: Response) => {
  const questions = await questionService.listQuestions();
  return ApiResponse.success(res, questions, 'Questions retrieved successfully');
});

export const getQuestion = asyncHandler(async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id!, 10);
  const question = await questionService.getQuestion(questionId);

  if (!question) {
    return ApiResponse.error(res, 'Question not found', HttpStatus.NOT_FOUND);
  }

  return ApiResponse.success(res, question, 'Question retrieved successfully');
});

export const createQuestion = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId as number;
  const payload = req.body;

  const question = await questionService.createQuestion(payload, userId);
  return ApiResponse.success(res, question, 'Question created successfully', HttpStatus.CREATED);
});

export const updateQuestion = asyncHandler(async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id!, 10);
  const payload = req.body;

  const question = await questionService.updateQuestion(questionId, payload);

  if (!question) {
    return ApiResponse.error(res, 'Question not found', HttpStatus.NOT_FOUND);
  }

  return ApiResponse.success(res, question, 'Question updated successfully');
});

export const deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id!, 10);

  const deleted = await questionService.deleteQuestion(questionId);

  if (!deleted) {
    return ApiResponse.error(res, 'Question not found', HttpStatus.NOT_FOUND);
  }

  return ApiResponse.success(res, null, 'Question deleted successfully', HttpStatus.NO_CONTENT);
});

export const getUserQuestions = asyncHandler(async (req: Request, res: Response) => {
  const questions = await questionService.getQuestions();

  return ApiResponse.success(res, questions, 'Questions retrieved successfully');
});