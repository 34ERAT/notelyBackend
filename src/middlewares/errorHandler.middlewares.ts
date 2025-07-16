import { NextFunction, Request, Response } from "express";

export default function (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log(error);
  res.status(500).json({
    message: "something went wrong",
  });
}
