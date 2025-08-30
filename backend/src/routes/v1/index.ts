import express from "express";

const appRouterV1 = express.Router();

//login routes
appRouterV1.use("/login", (req, res) => {
  res.send("Login route");
});

//register routes
appRouterV1.use("/register", (req, res) => {
  res.send("Register route");
});

export default appRouterV1;
