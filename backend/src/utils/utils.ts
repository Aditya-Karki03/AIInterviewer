import { Response } from "express";

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
