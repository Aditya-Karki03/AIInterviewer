import express, { Request, Response } from "express";
import db from "../db/db.schema";
import { fail, ok } from "../utils/utils";
import { GoogleGenAI } from "@google/genai";

interface SkillName {
  skillName: string;
}

interface DbProfile {
  id: number;
  job: string;
  experience: string;
  interviewType: string;
}

class QuestionController {
  // To Generate all 10 questions
  async generateNewQuestions(req: Request, res: Response) {
    // get the loggedin user id
    const { id } = req.user;

    // initialize a new ai obj using gemini api key
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // get job, expereince, interviewType, skills of a particular user

    try {
      // query to get job, experience, interviewType
      const profileData = db
        .prepare(
          "SELECT id, job, experience, interviewType FROM profiles WHERE userId = ?"
        )
        .get(id) as DbProfile;

      // query to get skillNames from skills table

      const allSkillsForAProfile = db
        .prepare(
          `SELECT skillName FROM skills s JOIN skill_profile sp ON  s.id=sp.skillId WHERE sp.profileId=? `
        )
        //@ts-ignore
        .all(profileData?.id);

      // prompt
      const prompt = `
    You are an AI Interview Question Generator.
    Generate 10 interview questions based on the following:
    Job Role: ${profileData?.job}   
    Experience Level: ${profileData?.experience}
    Interview Type: ${profileData?.interviewType}
    Skills: ${allSkillsForAProfile}

    Return the result as a strict JSON array of strings, with no extra text or formatting.
Example:
[
  "Question 1",
  "Question 2"
]

 
`;

      // response
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt.trim(),
      });

      //convert the string to array using JSON prase method and pass response.text as string
      const questionsArray = JSON.parse(response.text as string);

      // after question generated push it into db
      // 3 related tables to question-answer
      // 1.practice_sessions 2. qa 3. user_practice_sessions
      // insert to practice_sessions to get practice id to be used on qa
      // insert to user_practice_sessions
      // insert to qa table

      // insert with default values because only id is there which is autoincrement
      const insPracticeSessionQuery = db.prepare(
        "INSERT INTO practice_sessions DEFAULT VALUES"
      );

      // run the query to get practiceSessionId
      const practiceSessionId = insPracticeSessionQuery.run().lastInsertRowid;

      // insert into user_practice_session
      const insUserPracticeQuery = db.prepare(
        "INSERT INTO user_practice_sessions (userId, practiceSessionId) VALUES (?,?)"
      );
      const userPraticeId = insUserPracticeQuery.run(
        id,
        practiceSessionId
      ).lastInsertRowid;

      console.log("USER PRACTICE ID: ", userPraticeId);

      // insert into qa table
      const insQATableQuery = db.prepare(
        "INSERT INTO qa (userId, practiceId, question) VALUES (?,?,?)"
      );
      // run the above query in a loop in order to insert the questions
      questionsArray.forEach((question: string) => {
        insQATableQuery.run(id, userPraticeId, question);
      });

      return ok(res, questionsArray, 201);
    } catch (error) {
      console.log(error);
      return fail(res, "Internal Server Error", 500);
    }
  }

  // get questions
  async getGeneratedQuestions(req: Request, res: Response) {
    // user needs to give for which practice session is he asking about?
    // practice id is needed

    // get practiceId and userId
    const { practiceId } = req.query;
    const { id } = req.user;
    try {
      const getQuestionsAndAnswersQuery = db.prepare(
        "SELECT * FROM qa WHERE userId=? AND practiceId = ? "
      );
      const questionsAndAnswers = getQuestionsAndAnswersQuery.all(id, 3);
      console.log(questionsAndAnswers);
    } catch (error) {
      console.log(error);
      return fail(res, "Internal Server Error", 500);
    }
  }
}

export default QuestionController;
