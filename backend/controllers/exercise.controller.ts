import { Request, Response, NextFunction } from "express";
import {
  fetchExercises,
  fetchExercisesByCategory,
} from "../models/exercise.model";

export const getExercises = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  fetchExercises()
    .then((exercises: any[]) => {
      res.status(200).send({ exercises });
    })
    .catch((err: any) => {
      next(err);
    });
};

export const getExercisesByCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category = req.params.category;

  fetchExercisesByCategory(category)
    .then((exercises: any[]) => {
      res.status(200).send({ exercises });
    })
    .catch((err: any) => {
      next(err);
    });
};
