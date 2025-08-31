import { Response } from "express";
import jwt from "jsonwebtoken";

//success response with data and default status code
export const ok = (res: Response, data: any, statusCode: number = 200) => {
  res.status(statusCode).json({
    ok: true,
    data,
  });
};

//failure response with error message and default status code
export const fail = (
  res: Response,
  message: string,
  statusCode: number = 400
) => {
  res.status(statusCode).json({
    ok: false,
    message,
  });
};

//sign jwt token
interface userData {
  userEmail: string;
}
export const signToken = (data: userData) => {
  //get secret key from env
  const secretKey = process.env.SECRET_KEY || "";
  //sign the jwt and return
  const token = jwt.sign(data, secretKey);
  return token;
};
