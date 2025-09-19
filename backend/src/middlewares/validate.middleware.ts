import { HttpStatus } from '@/utils/http-status';
import { ApiResponse } from '@/utils/api-response';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log({ errors })
    console.log(errors.array()[0])
    if (!errors.isEmpty()) return ApiResponse.error(res, errors.array()[0]?.msg, HttpStatus.UNPROCESSABLE_ENTITY);


    next();
};
