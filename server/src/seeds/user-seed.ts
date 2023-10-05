import { AppDataSource } from "typeorm.config";
import { UserEntity } from "./../entity/User";

export async function seedQuotes(connection: typeof AppDataSource) {
    const quoteRepository = connection.getRepository(UserEntity);

    const quotesData = [{ email: "123@gmail.com", password: "" }];

    await quoteRepository.save(quotesData);
}

export default seedQuotes;
