import express from "express";
import DashboardController from "../../controllers/dashboardController";
export const dashboardRoutes = express.Router();

const dashboardController = new DashboardController();
dashboardRoutes.get("/get-dashboard", dashboardController.getDashboardData);
