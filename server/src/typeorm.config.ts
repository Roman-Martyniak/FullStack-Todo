import { DataSource } from "typeorm";
import UserEntity from "./entity/User";
import { Quote } from "entity/Todo";
import { TokenEntity } from "entity/Token";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "chinook.db",
    synchronize: true,
    logging: true,
    entities: [Quote, UserEntity, TokenEntity],
    migrations: [],
    subscribers: [],
});
