import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await AuthService.login(payload);

    res.cookie("accessToken", result.accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 7
    });
    res.cookie("refreshToken", result.refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 30
    });

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Login Successfully!",
        data: null
    });
});


export const AuthController = {
    login,
};