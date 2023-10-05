import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Body, Res, Req, UseBefore } from "routing-controllers";
import { Repository } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv, { config } from "dotenv";
import uuid from "uuid";
import { validationResult } from "express-validator";

import { ApiError } from "helpers/ApiError";
import { AppDataSource } from "typeorm.config";
import UserEntity from "entity/User";
import { ApiResponse } from "../helpers";
import { userRepository } from "repositories/UserRepository";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserService } from "../../service/user-service";
import TokenService from "../../service/token-service";
import { TokenEntity } from "entity/Token";

dotenv.config();
const { JWT_ACCESS_SECRET_KEY } = process.env;
const { CLIENT_URL } = process.env;

@JsonController("/")
export class UserController {
    private userService: UserService;
    private tokenService: TokenService;

    constructor(
        private userRepository: Repository<UserEntity>,
        private tokenRepository: Repository<TokenEntity>
    ) {
        this.userRepository = AppDataSource.getRepository(UserEntity);
        this.userService = new UserService(userRepository, tokenRepository);
        this.tokenService = new TokenService(tokenRepository);
    }

    @Post("/registration")
    async registration(@Req() req: Request, @Res() res: Response, next: NextFunction) {
        const { name, email, password } = req.body;
        // try {
        //     const user = await userRepository.findOneBy({ email });
        //     if (user) {
        //         return new ApiError(400, { message: "Email are exist" });
        //     }
        //     const hashPassword = await bcrypt.hash(password, 10);
        //     const activationLink = uuid.v4();

        //     const newUser = userRepository.create({
        //         name,
        //         email,
        //         password: hashPassword,
        //         activationLink,
        //     });
        //     await userRepository.save(newUser);
        //     const { password: _, ...userReg } = newUser;
        //     const apiResponse = new ApiResponse(true, newUser);
        //     return res.status(201).json(apiResponse);
        // } catch (error) {
        //     return new ApiError(404, { message: "Error" });
        // }
        try {
            // const errors = validationResult(req);
            // if (errors.isEmpty()) {
            //     return next(new ApiError(400, { message: "Error validation" }));
            // }
            const userData = await this.userService.registration(name, email, password, this.tokenService);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    @Post("/login")
    async login(@Req() req: Request, @Res() res: Response) {
        try {
            const { email, password } = req.body;

            // try {
            //     const user = await userRepository.findOne({ where: { email } });
            //     if (!user) {
            //         return res.status(401).json(new ApiError(401, { message: "Email or password is wrong" }));
            //     }

            //     const verifyPass = await bcrypt.compare(password, user.password);
            //     if (!verifyPass) {
            //         return res.status(401).json(new ApiError(401, { message: "Email or password is wrong" }));
            //     }

            //     if (!JWT_ACCESS_SECRET_KEY) {
            //         throw new ApiError(400, { message: "JWT secret key is not defined." });
            //     }

            //     const token = jwt.sign({ id: user.id }, JWT_ACCESS_SECRET_KEY, { expiresIn: "23h" });
            //     const { password: _, ...userLogin } = user;

            //     const apiResponse = new ApiResponse(true, user);
            //     return res.status(200).json({ token, user: userLogin });
            // } catch (error) {
            //     console.error("Error:", error);
            //     return res.status(404).json(new ApiError(404, { message: "Error" }));
            // }
            const user = await this.userService.login(email, password, this.tokenService);

            if (user instanceof ApiError) {
                // Обробляємо помилку, якщо `user` є типом ApiError
                return res.status(user.status).json(user);
            } else {
                // Обробляємо успішний результат, якщо `user` містить refreshToken
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
            // const token = req.headers.authorization?.split(" ")[1];

            // if (!token) {
            //     return next(new ApiError(401, { message: "Token not provided" }));
            // }

            // res.json({ message: "Logout successful" });
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

    @Post("/activate")
    // @UseBefore(authMiddleware)
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
    @UseBefore(authMiddleware)
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
            const getUser = await this.userRepository.find();
            const apiResponse = new ApiResponse(true, getUser);
            return res.json(apiResponse);
        } catch (error) {
            return res.status(400).json(new ApiError(400, { message: "Error" }));
        }
    }
}
