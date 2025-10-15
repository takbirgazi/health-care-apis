import { UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelper } from "../../utils/jwt";
import ApiError from "../../errors/ApiError";
import statusCode from "http-status";



const login = async (payload: { email: string, password: string }) => {

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    const isCorrectPwd = await bcrypt.compare(payload.password, user.password);

    if (!isCorrectPwd) {
        throw new ApiError(statusCode.BAD_REQUEST, "Password Is In Correct!")
    }
    const accessToken = jwtHelper.generateToken({ email: user.email, role: user.role }, config.JWT.JWT_SECRET as string, config.JWT.JWT_EXPIRE as string);
    const refreshToken = jwtHelper.generateToken({ email: user.email, role: user.role }, config.JWT.JWT_REFRESH_SECRET as string, config.JWT.JWT_REFRESH_EXPIRE as string);

    return {
        accessToken,
        refreshToken
    }
};

export const AuthService = {
    login,
}