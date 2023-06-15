import { Router } from "express";
import {
  getMealById,
} from "../controllers/meals.controller";

const exerciseRouter = Router();

exerciseRouter.route("/:id").get(getMealById);

export default exerciseRouter;
