import { Request, Response, NextFunction } from "express";

export const customErr = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.code && err.msg) {
    res.status(err.code).send({ msg: err.msg });
  } else {
    next(err);
  }
};

export const errLog = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error!" });
};
