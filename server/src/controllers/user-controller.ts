import { Request, Response, NextFunction } from "express";
import { HttpError } from "helpers/HttpError";
import { Controller, Get, Post, Put, Delete, Param, Body, Res } from "routing-controllers";

@Controller("/users")
export class UserController {
    async registration(re: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {}
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {}
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {}
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {}
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {}
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(400).json(["123"]);
        } catch (error) {
            return res.status(404).json(new HttpError(404, "Помилка"));
        }
    }
}

export default new UserController();
