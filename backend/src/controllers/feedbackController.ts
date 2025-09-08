import express, { Request, Response } from "express";
import { fail, ok } from "../utils/utils";
import db from "../db/db.schema";
import { AIGenerator } from "../utils/ai";

// interface created for userProfile
interface Profile {
  id: number;
  userId: number;
  job: string;
  experience: string;
  interviewType: string;
}

// TODO: All the question pertaining to a particular practice session and all the answers will be listed here

class FeedbackController {
  async getFeedback(req: Request, res: Response) {
    // need the practice id
    // need the user id
    const { practiceId } = req.params;
    const { id } = req.user;

    try {
      // query the db to get all the questions and answer to a particular practice session
      // use both practiceId and userId to make the query strict
      const questionAnswerQuery = db.prepare(
        `SELECT question, answer FROM qa WHERE practiceId=? AND userId=?`
      );
      const result = questionAnswerQuery.all(practiceId, id);
      if (result.length == 0) {
        return fail(res, "There is no practice session for this user", 403);
      }

      // if the question and answer found push it to the AI
      // I also need to get the profile -> job description, expereince and the interviewType
      // get all the profiles

      const profileDataQuery = db.prepare(
        `SELECT * FROM profiles WHERE userId=?`
      );
      const profileResult = profileDataQuery.get(id) as Profile;

      const promptToGenerateFeedback = `You are an AI interview coach. The user will provide three inputs: their profile (job role = ${profileResult.job}, interview type=${profileResult.interviewType}, and experience = ${profileResult.experience}), the question they were asked in the interview, and their answer. Based on these inputs, analyze the quality of the user’s response in the context of their role, experience level, and interview type. Provide constructive text-based feedback under 250 words. Your feedback should highlight strengths, identify areas of improvement, and suggest how the answer could be improved to better fit the expectations of the role and interview type. Keep the feedback professional, concise, and tailored to the users context`;

      // Generated Response from the AI
      const responseFromAI = AIGenerator(promptToGenerateFeedback);
      return ok(res, responseFromAI, 201);
    } catch (error) {
      console.log(error);
      return fail(res, "Internal server error", 500);
    }
  }
}
export default FeedbackController;
