import { Request, Response, NextFunction } from "express";
import { ApiError } from "helpers";
import jwt from "jsonwebtoken";
import userRepository from "repositories/UserRepository";

type JwtPayload = {
    id: number;
};
const {JWT_ACCESS_SECRET_KEY} = process.env;
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new ApiError(401, { message: "Not authorized" }));
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            return next(new ApiError(401, { message: "Token not provided" }));
        }

        const { id } = jwt.verify(token, JWT_ACCESS_SECRET_KEY || "") as JwtPayload;
        if (!id) {
            return next(new ApiError(401, { message: "Invalid token" }));
        }

        const user = await userRepository.findOneBy({ id });
        if (!user) {
            return next(new ApiError(401, { message: "User not found" }));
        }

        res.locals.user = user;

        next();
    } catch (error) {
        next(error);
    }
};
