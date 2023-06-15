import { Router } from "express";
import exerciseRouter from "./exercise.router";
import mealsRouter from "./meals.router";

const apiRouter = Router();

apiRouter.use("/exercises", exerciseRouter);
apiRouter.use("/meals", mealsRouter);

export default apiRouter;
