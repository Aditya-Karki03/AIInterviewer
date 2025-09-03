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

      //execute the insert query to profiles
      const profileResult = insQueryProfiles.run(
        id, // this is user's id
        job.trim(),
        experience,
        interviewType
      );

      //prepare the skills insertion query
      const insQuerySkills = db.prepare(
        `INSERT INTO skills (skillName) VALUES (?)`
      );

      // execute the insert query to skills table
      // skillName is an array hence running in a loop
      // TODO: add transaction a better method if more than 50 array
      for (const skill of skillNames) {
        insQuerySkills.run(skill.trim());
      }

      //get skill data
      // const skillData = db
      //   .prepare("SELECT skillName FROM skills WHERE id=?")
      //   .get(skillResult.lastInsertRowid);

      //get profile data
      const profileData = db
        .prepare(
          "SELECT job, experience, interviewType FROM profiles WHERE id=?"
        )
        .get(profileResult.lastInsertRowid);

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
