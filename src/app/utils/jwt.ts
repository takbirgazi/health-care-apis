import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const generateToken = (payload: { email: string, role: string }, secret: Secret, expiresIn: string) => {
    return jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn
    } as SignOptions)
};