import express from "express";
import FeedbackController from "../../controllers/feedbackController";
export const feedbackRouter = express.Router();

// create the object for the feedback controller
const feedbackController = new FeedbackController();

feedbackRouter.get("/get-feedback/:practiceId", feedbackController.getFeedback);
