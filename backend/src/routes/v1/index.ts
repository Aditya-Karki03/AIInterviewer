import express from "express";
import UserController from "../../controllers/userController";

const appRouterV1 = express.Router();

//create objects of controllers
const userController = new UserController();

//login route
appRouterV1.use("/login", userController.login);

//register route
appRouterV1.post("/register", userController.register);

export default appRouterV1;
