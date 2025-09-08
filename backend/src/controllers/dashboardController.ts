import { Request, Response } from "express";
import db from "../db/db.schema";
import { fail, ok } from "../utils/utils";

class DashboardController {
  getDashboardData = async (req: Request, res: Response) => {
    // TODO: send Job Role, Expertise level, Skills, Interview Type
    // TODO: Send a list of practice Sessions done as well

    // I have the user's id I can get all the data from there
    // have to use JOIN query to get the skillNames from the skills table

    const { id } = req.user;
    try {
      // query to get job, experience, interviewType
      const profileData = db
        .prepare(
          "SELECT id, job, experience, interviewType FROM profiles WHERE userId = ?"
        )
        .get(id);

      // query to get skillNames from skills table

      // join query thinking process
      // what do we want? : all skillNames for a particular profile
      // where does the skillNames live? : inside the skill table
      // connection between profile and skills lives in skillProfileTableCmd
      // I must connect skills table with skillProfileTable
      // what cols connect them? : skillId links to skills.id & profileId to profiles.id
      // query: give me all skills (skills.skillName) where skills.id matches skillProfile.skillId
      // and skillProfile.profileId matches my target profile

      const allSkillsForAProfile = db
        .prepare(
          `SELECT skillName FROM skills s JOIN skill_profile sp ON  s.id=sp.skillId WHERE sp.profileId=? `
        )
        //@ts-ignore
        .all(profileData?.id);

      // & save it in db

      const result = {
        profileDetails: profileData,

        skills: allSkillsForAProfile,
      };

      //send the response
      return ok(res, result, 201);
    } catch (error) {
      return fail(res, "Internal Server Error", 500);
    }
  };
}
export default DashboardController;
