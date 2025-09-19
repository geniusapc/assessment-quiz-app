import { Request, Response, NextFunction } from 'express';
import { AccessTokenPayload, verifyAccessToken } from '@/utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization as string | undefined;
        if (!header) return res.status(401).json({ success: false, message: 'No token' });
        const parts = header.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ success: false, message: 'Invalid token format' });

        const payload = verifyAccessToken(parts[1]!) as AccessTokenPayload;
        (req as any).user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
