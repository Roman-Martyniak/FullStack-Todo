import { Request, Response } from "express";
import { AppDataSource } from "../typeorm.config";

import { Quote } from "../entity/Todo";
import { HttpError } from "../helpers/HttpError";
import { TodoController } from "./interfaces/todo-controller-interface";

const todoRepository = AppDataSource.getRepository(Quote);

export const getAll = async (req: Request, res: Response) => {
    try {
        const todos = await todoRepository.find();
        return res.status(200).json({ success: true, data: todos });
    } catch (error) {
        console.error(error);
        return res.status(500).json(new HttpError(500, "Помилка при виконанні запиту до бази даних"));
    }
};

export const getTodo = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json(new HttpError(400, "ID повинен бути числом"));
        }

        const todo = await todoRepository.findOne({ where: { id: id } });

        if (!todo) {
            return res.status(404).json(new HttpError(404, "Запис не знайдено"));
        }

        return res.status(200).json({ success: true, data: todo });
    } catch (error) {
        console.error(error);
        return res.status(500).json(new HttpError(500, "Помилка при виконанні запиту до бази даних"));
    }
};

export const addTodo = async (req: Request, res: Response) => {
    try {
        const { todo } = req.body;
        const newTodo = todoRepository.create({ todo });
        await todoRepository.save(newTodo);
        console.log(`Додано новий запис до todo: ${todo}`);
        return res.status(201).json({ success: true, message: "Запис успішно додано до бази даних" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(new HttpError(500, "Помилка при виконанні запиту до бази даних"));
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json(new HttpError(400, "ID повинен бути числом"));
        }

        const { todo } = req.body;
        const existingTodo = await todoRepository.findOne({ where: { id: id } });

        if (!existingTodo) {
            return res.status(404).json(new HttpError(404, "Запис не знайдено"));
        }

        existingTodo.todo = todo;
        await todoRepository.save(existingTodo);
        console.log(`Запис з ID ${id} було оновлено з новим todo: ${todo}`);
        return res.status(200).json({ success: true, message: `Запис з ID ${id} було оновлено` });
    } catch (error) {
        console.error(error);
        return res.status(500).json(new HttpError(500, "Помилка при виконанні запиту до бази даних"));
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json(new HttpError(400, "ID повинен бути числом"));
        }

        const result = await todoRepository.delete(id);

        if (result.affected === 0) {
            return res.status(404).json(new HttpError(404, "Запис не знайдено"));
        }

        console.log(`Запис з ID ${id} було видалено з бази даних`);
        return res.status(200).json({
            success: true,
            message: `Запис з ID ${id} було видалено з бази даних`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json(new HttpError(500, "Помилка при виконанні запиту до бази даних"));
    }
};

export default TodoController;
