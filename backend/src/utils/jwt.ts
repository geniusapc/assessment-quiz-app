import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '@/config/env';


export interface AccessTokenPayload {
    userId: number;
    email: string;
    role?: string;
}

export const signAccessToken = async (payload: AccessTokenPayload) => {

    const options: SignOptions = {
        expiresIn: env.ACCESS_EXPIRY as unknown as number,
    };
    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, options);
};



export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET);
};

