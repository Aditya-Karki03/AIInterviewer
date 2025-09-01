import express from "express";
import { userAuth } from "../../middleware/userAuth";
import { authRouter } from "./authRoutes";
import { profileRouter } from "./profileRoutes";

const appRouterV1 = express.Router();

// login & sign up route
appRouterV1.use("/api/v1/user", authRouter);

// user profile route
// userAuth middleware to ensure only authenticated users can access this route
appRouterV1.use("/api/v1/profile", userAuth, profileRouter);

export default appRouterV1;
