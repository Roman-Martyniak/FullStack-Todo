import { Router } from "express";
import { body } from "express-validator";

import { UserController } from "../../controllers/user-controller";
import { AppDataSource } from "typeorm.config";
import UserEntity from "entity/User";
import { TokenEntity } from "entity/Token";

const userRepository = AppDataSource.getRepository(UserEntity);
const tokenRepository = AppDataSource.getRepository(TokenEntity);

const userController = new UserController(userRepository, tokenRepository);
const userRouter = Router();

userRouter.post(
    "/registration",
    // body("name").notEmpty(),
    // body("email").isEmail(),
    // body("password").isLength({ min: 3, max: 32 }),
    userController.registration.bind(userController)
);
userRouter.post("/login", userController.login.bind(userController));
userRouter.post("/logout", userController.logout.bind(userController));
userRouter.post("/activate/:link", userController.activate.bind(userController));
userRouter.post("/refresh", userController.refresh.bind(userController));
userRouter.get("/", userController.getUsers.bind(userController));

export { userRouter };
