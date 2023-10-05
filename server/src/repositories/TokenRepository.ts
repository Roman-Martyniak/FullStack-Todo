import TokenEntity from "entity/Token";
import { AppDataSource } from "typeorm.config";

export const tokenRepository = AppDataSource.getRepository(TokenEntity);

export default tokenRepository;
