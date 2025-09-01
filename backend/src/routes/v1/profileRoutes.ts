import express from "express";
import ProfileController from "../../controllers/profileController";

export const profileRouter = express.Router();

// create objects of controllers
const profileController = new ProfileController();

// create profile
profileRouter.post("/create", profileController.postProfile);
