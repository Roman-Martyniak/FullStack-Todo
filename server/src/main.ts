import express, { Request, RequestHandler, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { createExpressServer } from "routing-controllers";
import cookieParser from "cookie-parser";
import "reflect-metadata";

import { todoRouter } from "./routes/api/todo-router";
import * as Swagger from "./swagger/openApi.json";
import { userRouter } from "./routes/api/users";
import { AppDataSource } from "typeorm.config";

import { TodoClassController } from "controllers/todo-class-controller";
import { UserController } from "controllers/user-controller";
import { ApiError } from "helpers";

const app = createExpressServer({
    controllers: [TodoClassController, UserController],
});

dotenv.config();

const port = process.env.PORT;
const specs = swaggerJsdoc(Swagger);

const isDevelopment = app.get("env") === "development";
const logFormat = isDevelopment ? "dev" : "short";

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");

        // await seedQuotes(AppDataSource);

        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(logger(logFormat));
        app.use(cors() as RequestHandler);
        app.use(express.json());
        app.use(express.static("public"));

        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

        app.use("/api/todo", todoRouter);
        app.use("/users", userRouter);

        app.listen(port, () => {
            console.log(`Server started on port ${port}!`);
        });
    })
    .catch(err => {
        console.error("Error during Data Source initialization:", err);

        app.use((_req: Request, res: Response) => {
            throw new ApiError(404, { message: "Not Found" });
        });
    });
