import express, { Request, Response } from "express";
import userSchema from "../schemas/userSchema";
import { ok, fail } from "../utils/utils";
import db from "../db/db.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  //register user
  async register(req: Request, res: Response) {
    const { email, password } = req.body;

    //if either no email or password
    if (!email || !password)
      return fail(res, "Email and Password are required", 403);

    //validate email & password
    const validation = userSchema.safeParse({ email, password });

    //validation failure scenario
    if (!validation.success) {
      return fail(res, validation?.error?.message);
    }

    //hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      //insert user into the db command
      const insertUser = db.prepare(
        `INSERT INTO users (email, password) VALUES(?,?)`
      );

      //execute insert user command
      const returnVal = insertUser.run(email?.trim(), hashedPassword);

      //get user email inside the userData object
      const userData = db
        .prepare("SELECT email FROM users WHERE id=?")
        .get(returnVal.lastInsertRowid);

      // getting the jwt secret key
      const jwtSecret = process.env.SECRET_KEY || "";
      //data to be signed
      const data = {
        //@ts-ignore
        userEmail: userData?.email,
      };

      //signing the token
      const token = jwt.sign(data, jwtSecret);

      //send cookie
      res.cookie("token", token);
      //    @ts-ignore
      return ok(res, { email: userData?.email }, 201);
    } catch (error) {
      // Handle error if email already exists
      if (String(error).includes("UNIQUE")) {
        return fail(res, "Email already exists.", 403);
      }

      // Handle other errors
      return fail(res, "Something went wrong. Please try again", 500);
    }
  }
}

export default UserController;
