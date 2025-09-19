import { HttpStatus } from '@/utils/httpStatus';
import { ApiResponse } from '@/utils/response';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return ApiResponse.error(res, errors.array()[0]?.msg, HttpStatus.UNPROCESSABLE_ENTITY);


    next();
};
