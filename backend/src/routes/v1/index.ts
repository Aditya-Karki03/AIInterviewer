import express from "express";
import { userAuth } from "../../middleware/userAuth";
import { authRouter } from "./authRoutes";
import { profileRouter } from "./profileRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { questionRouter } from "./questionRoutes";

const appRouterV1 = express.Router();

// login & sign up route
appRouterV1.use("/api/v1/user", authRouter);

// user profile route
// userAuth middleware to ensure only authenticated users can access this route
appRouterV1.use("/api/v1/profile", userAuth, profileRouter);

//dashboard route
appRouterV1.use("/api/v1/dashboard", userAuth, dashboardRoutes);

//question route
appRouterV1.use("/api/v1/question", userAuth, questionRouter);

export default appRouterV1;
