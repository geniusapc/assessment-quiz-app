import { Request, Response, NextFunction } from 'express';
import { AccessTokenPayload, verifyAccessToken } from '@/utils/jwt';
import { ApiResponse } from '@/utils/api-response';
import { HttpStatus } from '@/utils/http-status';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization as string | undefined;
        if (!header) return ApiResponse.error(res, 'No token provided', HttpStatus.FORBIDDEN)
        const parts = header.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') return ApiResponse.error(res, 'Invalid token format', HttpStatus.FORBIDDEN);

        const payload = verifyAccessToken(parts[1]!) as AccessTokenPayload;
        (req as any).user = payload;
        next();
    } catch (err) {
        return ApiResponse.error(res, 'Invalid token', HttpStatus.FORBIDDEN)
    }
};
