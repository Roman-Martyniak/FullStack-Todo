import { AppDataSource } from "typeorm.config";
import { Quote } from "../entity/Todo";

export async function seedQuotes(connection: typeof AppDataSource) {
    const quoteRepository = connection.getRepository(Quote);

    const quotesData = [{ todo: "One" }, { todo: "Two" }];

    await quoteRepository.save(quotesData);
}

export default seedQuotes;
