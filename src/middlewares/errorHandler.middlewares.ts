import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { json, NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { MulterError } from "multer";
import z, { ZodError } from "zod";
import ca from "zod/v4/locales/ca.cjs";

export default function (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    const pretryError = z.prettifyError(error);
    res.status(400).json({ message: pretryError });
    console.log(error);
    return;
  }
  //
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2001":
        res
          .status(404)
          .json({ message: "The specified Record does not exist" });
        console.error(error);
        break;
      case "P2002":
        res.status(400).json({
          message: ` ${error.meta?.target as string} record already exist`,
        });
        break;
      case "P2025":
        res.status(404).json({ message: error.meta?.cause });
        break;
      default:
        res.status(400).json({ message: "something is wrong with your data " });
        console.error(error);
        break;
    }
    return;
  }
  if (error instanceof JsonWebTokenError) {
    res.status(401).json({ message: "invalid token  login again " });
    return;
  }
  if (error instanceof TokenExpiredError) {
    res.status(401).json({ message: "expried token refersh or login again" });
    return;
  }
  if (error instanceof MulterError) {
    switch (error.code) {
      case "MISSING_FIELD_NAME":
        res.status(400).json({ message: "avater field is required" });
        break;
      default:
        res
          .status(400)
          .json({ message: "something is wrong with you request" });
        console.error(error);
    }
    return;
  }
  console.log(error);
  res.status(500).json({
    message: "something went wrong",
  });
}
