import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import z, { ZodError } from "zod";

export default function (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    const pretryError = z.prettifyError(error);
    res.status(400).json({ message: pretryError });
    return;
  }
  //
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2001":
        res.status(404).json({ message: "record not exist" });
        break;
      case "P2002":
        res.status(400).json({
          message: ` ${error.meta?.target as string} record already exist`,
        });
        break;
      default:
        res.status(400).json({ message: "something is wrong with your data " });
        break;
    }
    return;
  }
  if (Error instanceof JsonWebTokenError) {
    res.status(409).json({ message: "invalid token or expried login again" });
    return;
  }
  console.log(error);
  res.status(500).json({
    message: "something went wrong",
  });
}
