import express, { Request, RequestHandler, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { createExpressServer } from "routing-controllers";
import "reflect-metadata";

import { todoRouter } from "./routes/api/todo-router";
import { HttpError } from "./helpers/HttpError";
import * as Swagger from "./swagger/openApi.json";
import { userRouter } from "./routes/api/users";
import { AppDataSource } from "typeorm.config";

import { TodoClassController } from "controllers/todo-class-controller";
import seedQuotes from "./seeds/todo-seed";
import { TodoController } from "./controllers/interfaces/todo-controller-interface";

const app = createExpressServer({
    controllers: [TodoClassController],
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
    })
    .catch(err => {
        console.error("Error during Data Source initialization:", err);
    });

app.use(bodyParser.json());
app.use(logger(logFormat));
app.use(cors() as RequestHandler);
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use("/api/todo", todoRouter);
app.use("/api/", userRouter);

app.use((_req: Request, res: Response) => {
    throw new HttpError(404, "Not Found");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});
