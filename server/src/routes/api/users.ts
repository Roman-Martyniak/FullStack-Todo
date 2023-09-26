import { Router } from "express";
import userController from "../../controllers/user-controller";
const userRouter = Router();

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.post("/activate/:link", userController.activate);
userRouter.post("/refresh", userController.refresh);
userRouter.get("/users", userController.getUsers);

export { userRouter };
