import express, { Request, Response } from "express";
import dotenv from "dotenv";
import appRouterV1 from "./routes/v1";

//to use env variables
dotenv.config();

//initializing express application
const app = express();

const port = process.env.PORT || 3000;

//middleware to use parse the body
app.use(express.json());

//routing every request to version 1 routes
app.use(appRouterV1);

//server listening port
app.listen(port, () => {
  console.log(`app is listening at port`, port);
});
