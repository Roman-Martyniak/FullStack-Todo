import UserEntity from "entity/User";
import { AppDataSource } from "typeorm.config";

export const userRepository = AppDataSource.getRepository(UserEntity);

export default userRepository;
