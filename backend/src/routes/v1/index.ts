import express from "express";
import UserController from "../../controllers/userController";

const appRouterV1 = express.Router();

//create objects of controllers
const userController = new UserController();

//login routes
appRouterV1.use("/login", (req, res) => {
  res.send("Login route");
});

//register route
appRouterV1.post("/register", userController.register);

export default appRouterV1;
