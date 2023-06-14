import { Router } from "express";
import exerciseRouter from "./exercise.router";
// import userRouter from "./user.router";
// import mealsRouter from "./meals.router";

const apiRouter = Router();

apiRouter.use("/exercises", exerciseRouter);
// apiRouter.use("/users", userRouter);
// apiRouter.use("/meals", mealsRouter);

export default apiRouter;
