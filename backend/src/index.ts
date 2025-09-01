import express, { Request, Response } from "express";
import dotenv from "dotenv";
import appRouterV1 from "./routes/v1";
import db, {
  userTableCmd,
  practiceSessionTableCmd,
  profileTableCmd,
  qaTableCmd,
  skillProfileTableCmd,
  skillTableCmd,
  userPracticeSessionTableCmd,
} from "./db/db.schema";
import cookies from "cookie-parser";

// to use env variables
dotenv.config();

// initializing express application
const app = express();

const port = process.env.PORT || 3000;

// middleware to use parse the body
app.use(express.json());

// middleware to parse the cookies
app.use(cookies());

// execute create table commands
db.exec(
  userTableCmd +
    practiceSessionTableCmd +
    profileTableCmd +
    qaTableCmd +
    skillProfileTableCmd +
    skillTableCmd +
    userPracticeSessionTableCmd
);

// routing every request to version 1 routes
app.use(appRouterV1);

// server listening port
app.listen(port, () => {
  console.log(`app is listening at port`, port);
});
