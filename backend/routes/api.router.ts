import { Router } from "express";
import exerciseRouter from "./exercise.router";
import mealsRouter from "./meals.router";
import mealPlanRouter from "./mealPlan.router";

const apiRouter = Router();

apiRouter.use("/exercises", exerciseRouter);
apiRouter.use("/recipe", mealsRouter);
apiRouter.use("/meal-plan", mealPlanRouter);

export default apiRouter;
