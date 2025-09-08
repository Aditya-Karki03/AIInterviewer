import express, { Request, Response } from "express";
import { fail, ok } from "../utils/utils";
import db from "../db/db.schema";

class ProfileController {
  //send profile
  async postProfile(req: Request, res: Response) {
    //get data out of the body
    const { job, experience, interviewType, skillNames } = req.body;

    //extracting userId from req.user
    const { id } = req.user;

    //all fields are required
    if (!job || !experience || !interviewType || !skillNames)
      return fail(res, "All fields are required", 403);

    //create profile
    try {
      //prepare the query to insert
      const insQueryProfiles = db.prepare(
        `INSERT INTO profiles (userId, job, experience, interviewType) VALUES (?,?,?,?)`
      );

      //execute the insert query to profiles and get profileId in return
      const profileId = insQueryProfiles.run(
        id, // this is user's id
        job.trim(),
        experience,
        interviewType
      ).lastInsertRowid;

      // prepare the skills insertion query
      // IGNORE because if a duplicate value comes up no new rows would be entered and no error
      // skills is a unique col
      const insQuerySkills = db.prepare(
        `INSERT OR IGNORE INTO skills (skillName) VALUES (?)`
      );

      // execute the insert query to skills table
      // skillName is an array hence running in a loop
      // TODO: add transaction a better method if more than 50 array
      // insert skills into table and get lastInsertRowId in array format in return
      // WRONG ❌ if duplicate skillName the lastInsertRowid will return 0 (Invalid foreign key)

      // const skillIds = skillNames.map(
      //   (skill: string) => insQuerySkills.run(skill.trim()).lastInsertRowid
      // );

      // RIGHT ✅
      const getSkillsIdQuery = db.prepare(
        "SELECT id FROM skills WHERE skillName=?"
      );
      const skillIds = skillNames.map((skill: string) => {
        insQuerySkills.run(skill.trim());
        const row = getSkillsIdQuery.get(skill.trim());
        // @ts-ignore
        return row.id;
      });

      //insert into the skill_profile as well
      const insQuerySkillProfile = db.prepare(
        "INSERT INTO skill_profile (profileId, skillId) VALUES (?,?)"
      );
      for (const skillId of skillIds) {
        insQuerySkillProfile.run(profileId, skillId);
      }

      //get skill data
      // const skillData = db
      //   .prepare("SELECT skillName FROM skills WHERE id=?")
      //   .get(skillResult.lastInsertRowid);

      //get profile data to return
      const profileData = db
        .prepare(
          "SELECT job, experience, interviewType FROM profiles WHERE id=?"
        )
        .get(profileId);

      //creating result data
      const result = {
        profile: profileData,
        skill: skillNames,
      };

      //return sucess response
      return ok(res, result, 201);
    } catch (error) {
      // Handle error if skills already exists
      if (String(error).includes("UNIQUE")) {
        return fail(res, "SKill already exists", 409);
      }

      return fail(res, "Internal Server Error", 500);
    }
  }
}
export default ProfileController;
