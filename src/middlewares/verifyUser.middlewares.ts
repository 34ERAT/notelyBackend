import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/config";
import asyncHandler from "../utils/asyncHandler.uitl";
import { validatedId } from "../validations";
import { Payload } from "../types";

export const verifyUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    if (!accessToken) {
      res.status(404).json({ message: "no token found " });
      return;
    }
    const decode = verify(accessToken, config.jwtSecret);
    if (!decode) {
      res.status(404).json({ message: "no token found or invalid_type" });
      return;
    }
    req.userId = await validatedId.parseAsync((decode as Payload).id);
    next();
  },
);
