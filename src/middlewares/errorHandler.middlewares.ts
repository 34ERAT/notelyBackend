import { NextFunction, Request, Response } from "express";

export default function (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  //TODO: handle zode errors
  //
  //TODO: handle prisma errors
  //
  //TODO: handle jwt errors
  console.log(error);
  res.status(500).json({
    message: "something went wrong",
  });
}
