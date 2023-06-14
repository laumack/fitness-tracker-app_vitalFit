import { Router } from "express";
import {
  getExercises,
  getExercisesByCategory,
} from "../controllers/exercise.controller";

const exerciseRouter = Router();

exerciseRouter.route("/").get(getExercises);

exerciseRouter.route("/:category").get(getExercisesByCategory);

export default exerciseRouter;
