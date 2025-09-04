import express from "express";
import QuestionController from "../../controllers/questionController";
import { userAuth } from "../../middleware/userAuth";

export const questionRouter = express.Router();

// create objects of controllers
const questionController = new QuestionController();

// create questions and return questions
questionRouter.post(
  "/generate-questions",
  userAuth,
  questionController.generateNewQuestions
);

// get questinos and answers for a particular session
questionRouter.get(
  "/get-questions",
  userAuth,
  questionController.getGeneratedQuestions
);
