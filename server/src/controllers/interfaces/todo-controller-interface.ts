import { Response, Request } from "express";

export interface TodoController {
    getAll: DefaultRoute;
    getTodo: DefaultRoute;
    addTodo: DefaultRoute;
    deleteTodo: DefaultRoute;
    updateTodo: DefaultRoute;
}

export type DefaultRoute = (req: Request, res: Response) => void;
