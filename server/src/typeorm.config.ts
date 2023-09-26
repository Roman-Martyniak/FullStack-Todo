import { DataSource } from "typeorm";
import UserEntity from "./entity/User";
import { Quote } from "entity/Todo";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "chinook.db",
    synchronize: true,
    logging: true,
    entities: [Quote], // Use class names as strings
    migrations: [],
    subscribers: [],
});
