import express, { Request, Response } from "express";
import userSchema from "../schemas/userSchema";
import { ok, fail } from "../utils/utils";
import db from "../db/db.schema";
import bcrypt from "bcrypt";
import { signToken } from "../utils/utils";
import is from "zod/v4/locales/is.cjs";

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
      const token = signToken(data);

      //send cookie
      res.cookie("token", token);
      //@ts-ignore
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

  //login
  async login(req: Request, res: Response) {
    //get email and password from the body
    const { email, password } = req.body;

    //if either no email or password return fail response
    if (!email || !password)
      return fail(res, "Email and Password are required", 403);

    //validate email & password
    const validation = userSchema.safeParse({ email, password });

    //if validation fails return fail response
    if (!validation.success) {
      return fail(res, validation.error.message, 403);
    }

    //find the user in the databse
    try {
      const userData = db
        .prepare("SELECT * FROM users WHERE email=?")
        .get(email.trim());
      //if no user data found
      if (!userData) return fail(res, "Please sign up  to continue", 403);

      //password verification
      const isPasswordValid = await bcrypt.compare(
        password.trim(),
        //@ts-ignore
        userData?.password
      );
      if (!isPasswordValid) return fail(res, "Invalid password", 402);

      //if pwssword verifed than sign jwt token
      const data = {
        //@ts-ignore
        userEmail: userData?.email,
      };

      //signing the token
      const token = signToken(data);

      //send cookie
      res.cookie("token", token);
      //send response
      //@ts-ignore
      return ok(res, { email: userData?.email }, 200);
    } catch (error) {
      // Handle error
      return fail(res, "Something went wrong. Please try again", 500);
    }
  }
}

export default UserController;
