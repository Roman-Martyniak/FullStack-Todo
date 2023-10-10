import { Router } from "express";

import validateEmptyBody from "../../middlewares/validateEmptyBody";
import { addSchema } from "../../schemas/todo-schema";
import validateBody from "../../middlewares/validateBody";
import { TodoClassController } from "../../controllers/todo-class-controller";
import { AppDataSource } from "../../typeorm.config";
import { Quote } from "../../entity/Todo";

export const todoRepository = AppDataSource.getRepository(Quote);

const TodoController = new TodoClassController(todoRepository);
const validateMiddleware = validateBody(addSchema);
const todoRouter = Router();

// GET All
todoRouter.get("/", TodoController.getAll.bind(TodoController));

// GET by ID
todoRouter.get("/:id", TodoController.getTodo.bind(TodoController));

// POST
todoRouter.post("/", validateMiddleware, TodoController.addTodo.bind(TodoController));

// PUT:/Completed
todoRouter.put("/:id/completed", validateEmptyBody, TodoController.changeCompleted.bind(TodoController));

// PUT
todoRouter.put("/:id", validateEmptyBody, TodoController.updateTodo.bind(TodoController));

// DELETE
todoRouter.delete("/:id", TodoController.deleteTodo.bind(TodoController));

export { todoRouter };
