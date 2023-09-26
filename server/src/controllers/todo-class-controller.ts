import { JsonController, Get, Post, Put, Delete, Param, Body, Res, HttpError, Req } from "routing-controllers";
import { Repository } from "typeorm";
import { ApiResponse } from "../helpers/ApiRespose";
import { AppDataSource } from "../typeorm.config";
import { Request, Response } from "express";
import { Quote } from "../entity/Todo";
import { ApiError } from "../helpers/ApiError";

@JsonController("/todo")
export class TodoClassController {
    constructor(private todoRepository: Repository<Quote>) {
        this.todoRepository = AppDataSource.getRepository(Quote);
    }

    @Get()
    async getAll(@Req() req: Request, @Res() res: Response) {
        try {
            const todos = await this.todoRepository.find();
            const apiResponse = new ApiResponse(true, todos);
            return res.json(apiResponse);
        } catch (error) {
            console.error(error);
            throw new ApiError(500, { message: "Помилка при виконанні запиту до бази даних" });
        }
    }

    @Get()
    async getTodo(@Req() req: Request, @Res() res: Response) {
        const { id } = req.params;
        try {
            const todo = await this.todoRepository.findOne({ where: { id: Number(id) } });
            const apiResponse = new ApiResponse(true, todo);

            if (!todo) {
                throw new ApiError(404, { message: "Запис не знайдено" });
            }

            return res.status(201).json(apiResponse);
        } catch (error) {
            console.error(error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, { message: "Помилка при виконанні запиту до бази даних" });
        }
    }

    @Post()
    async addTodo(@Req() req: Request, @Res() res: Response) {
        const { todo } = req.body;
        if (!todo) {
            return res.status(400).json({ message: "Error creating todo" });
        }
        try {
            const newTodo = this.todoRepository.create({ todo });
            await this.todoRepository.save(newTodo);
            console.log(`Додано новий запис до todo: ${todo}`);
            const apiResponse = new ApiResponse(true, newTodo, "Запис успішно додано до бази даних");
            return res.status(201).json(apiResponse);
        } catch (error) {
            console.error(error);
            throw new ApiError(500, { message: "Помилка при виконанні запиту до бази даних" });
        }
    }

    @Put()
    async updateTodo(@Req() req: Request, @Res() res: Response) {
        const { todo } = req.body;
        const { id } = req.params;
        try {
            const existingTodo = await this.todoRepository.findOne({ where: { id: Number(id) } });

            if (!existingTodo) {
                throw new ApiError(404, { message: "Запис не знайдено" });
            }

            existingTodo.todo = req.body.todo;

            const todoUpdate = { ...existingTodo };
            await this.todoRepository.save(todoUpdate);
            console.log(`Запис з ID ${id} було оновлено з новим todo: ${todo}`);
            const apiResponse = new ApiResponse(true, todoUpdate, `Запис з ID ${id} було оновлено`);

            return res.status(200).json(apiResponse);
        } catch (error) {
            console.error(error);
            throw new ApiError(500, { message: "Помилка при виконанні запиту до бази даних" });
        }
    }

    @Delete()
    async deleteTodo(@Req() req: Request, @Res() res: Response) {
        const { id } = req.params;
        try {
            const result = await this.todoRepository.delete({ id: Number(id) });

            if (result.affected === 0) {
                throw new ApiError(404, { message: "Запис не знайдено" });
            }

            console.log(`Запис з ID ${id} було видалено з бази даних`);
            const apiResponse = new ApiResponse(true, result, `Запис з ID ${id} було видалено з бази даних`);
            return res.status(201).json(apiResponse);
        } catch (error) {
            console.error(error);
            throw new ApiError(500, { message: "Помилка при виконанні запиту до бази даних" });
        }
    }
}
