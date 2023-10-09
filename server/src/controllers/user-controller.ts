import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Body, Res, Req, UseBefore } from "routing-controllers";
import dotenv, { config } from "dotenv";

import { ApiError } from "helpers/ApiError";
import { ApiResponse } from "../helpers";
import { userRepository } from "repositories/UserRepository";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserService } from "../../service/user-service";
import TokenService from "../../service/token-service";
import tokenRepository from "repositories/TokenRepository";

dotenv.config();

@JsonController("/")
export class UserController {
    constructor(
        private userService: UserService,
        private tokenService: TokenService
    ) {
        this.userService = new UserService(userRepository, tokenRepository);
        this.tokenService = new TokenService(tokenRepository);
    }

    @Post("/registration")
    async registration(@Req() req: Request, @Res() res: Response, next: NextFunction) {
        const { name, email, password } = req.body;
        try {
            const userData = await this.userService.registration(name, email, password, this.tokenService);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    @Post("/login")
    async login(@Req() req: Request, @Res() res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.userService.login(email, password, this.tokenService);

            if (user instanceof ApiError) {
                return res.status(user.status).json(user);
            } else {
                const { refreshToken, accessToken } = user;
                res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
                const { password: _, ...userLogin } = user.user;
                const apiResponse = new ApiResponse(true, userLogin);
                return res.status(200).json({ token: accessToken, user: userLogin });
            }
        } catch (e) {
            console.log(e);
        }
    }

    @Post("/logout")
    @UseBefore(authMiddleware)
    async logout(@Req() req: Request, @Res() res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const token = await this.userService.logout(refreshToken, this.tokenService);
            res.clearCookie("refreshToken");
            return res.json(token);
        } catch (error) {
            console.error("Error:", error);
            return next(new ApiError(500, { message: "Internal Server Error" }));
            next();
        }
    }

    @Get("/activate/:link")
    async activate(@Req() req: Request, @Res() res: Response, next: NextFunction) {
        const { link } = req.body;
        try {
            const activationLink = req.params.link;
            await this.userService.activate(link);
            return res.redirect("http://localhost:5173");
        } catch (error) {
            console.log(error);
        }
    }

    @Post("/refresh")
    async refresh(@Req() req: Request, @Res() res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await this.userService.refresh(refreshToken, this.tokenService);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (error) {
            console.log(error);
        }
    }

    @Get()
    async getUsers(@Req() req: Request, @Res() res: Response, next: NextFunction) {
        try {
            const getUser = await this.userService.getUsers();
            const apiResponse = new ApiResponse(true, getUser);
            return res.json(apiResponse);
        } catch (error) {
            return res.status(400).json(new ApiError(400, { message: "Error" }));
        }
    }
}
