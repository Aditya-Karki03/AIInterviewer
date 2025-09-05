import express from "express";
import QuestionController from "../../controllers/questionController";

export const questionRouter = express.Router();

// create objects of controllers
const questionController = new QuestionController();

// create questions and return questions
questionRouter.post(
  "/generate-questions",
  questionController.generateNewQuestions
);

// get questinos and answers for a particular session
questionRouter.get("/get-questions", questionController.getGeneratedQuestions);

// submit the answers
questionRouter.post("/send-answer/:id", questionController.submitAnswers);
