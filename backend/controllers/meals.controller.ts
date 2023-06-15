import { Request, Response, NextFunction } from "express";
import { fetchRecipeByMealId } from "../models/meals.model";

export const getMealById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  fetchRecipeByMealId(id)
    .then((meal: any) => {
      res.status(200).send({ meal });
    })
    .catch((err: any) => {
      next(err);
    });
};
