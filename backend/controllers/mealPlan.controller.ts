import { Request, Response, NextFunction } from "express";
import { fetchMealPlan } from "../models/mealPlan.model";

export const getMealPlan = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.params.name;

  fetchMealPlan(name)
    .then((meal: any) => {
      res.status(200).send({ meal });
    })
    .catch((err: any) => {
      next(err);
    });
};
