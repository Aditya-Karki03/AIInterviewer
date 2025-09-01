import express, { Request, Response, NextFunction } from "express";
import { ok, fail } from "../utils/utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../db/db.schema";

interface userInfoType {
  id: number;
  email: string;
}

// globally declaring that we are adding a user type on the Request object
// we are using interface Request because the Request interface is written in interface by Express
// and since we are using interface here as well both of them are merged instead of replacing it
// Express is the name of the module
declare global {
  namespace Express {
    interface Request {
      user: userInfoType;
    }
  }
}

//all the request comes in goes through this middleware
// it checks if the jwt is valid
export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  //token comes in cookie
  const { token } = req.cookies;

  //if no token
  if (!token) return fail(res, "Unauthorized", 403);

  try {
    const { userEmail } = jwt.verify(
      token,
      process.env.SECRET_KEY || ""
    ) as JwtPayload;

    //find the user with this id if not exist return error
    const userInfo = db
      .prepare("SELECT id, email FROM users WHERE email=?")
      .get(userEmail);

    if (!userInfo) return fail(res, "Unauthorized", 403);

    // put the userInfo into the req object
    req.user = userInfo as userInfoType;

    // call the next function
    next();
  } catch (error) {
    return fail(res, "Unauthorized", 403);
  }
};
