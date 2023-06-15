import { Router } from "express";
import {
  getMealPlan,
} from "../controllers/mealPlan.controller";

const exerciseRouter = Router();

exerciseRouter.route("/:name").get(getMealPlan);

export default exerciseRouter;
