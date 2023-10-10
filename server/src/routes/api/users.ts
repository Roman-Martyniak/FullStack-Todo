import { Router } from "express";

import { UserController } from "../../controllers/user-controller";
import { AppDataSource } from "typeorm.config";
import UserEntity from "entity/User";
import { TokenEntity } from "entity/Token";
import TokenService from "../../service/token-service";
import { UserService } from "../../service/user-service";

const userRepository = AppDataSource.getRepository(UserEntity);
const tokenRepository = AppDataSource.getRepository(TokenEntity);

const userService = new UserService(userRepository, tokenRepository);
const tokenService = new TokenService(tokenRepository);

const userController = new UserController(userService, tokenService);
const userRouter = Router();

userRouter.post("/registration", userController.registration.bind(userController));
userRouter.post("/login", userController.login.bind(userController));
userRouter.post("/logout", userController.logout.bind(userController));
userRouter.get("/activate/:link", userController.activate.bind(userController));
userRouter.get("/refresh", userController.refresh.bind(userController));
userRouter.get("/", userController.getUsers.bind(userController));

export { userRouter };
