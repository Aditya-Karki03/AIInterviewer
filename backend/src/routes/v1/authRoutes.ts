import express from "express";
import UserController from "../../controllers/userController";
export const authRouter = express.Router();

// create objects of controllers
const userController = new UserController();

// register route
authRouter.post("/register", userController.register);

// login route
authRouter.post("/login", userController.login);
