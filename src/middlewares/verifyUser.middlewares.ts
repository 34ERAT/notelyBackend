import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/config";
import asyncHandler from "../utils/asyncHandler.uitl";
import { userIdRequest } from "../validations";

export const verifyUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      res.status(404).json({ message: "no cookies found" });
      return;
    }
    type Payload = {
      id: string;
      userName: string;
      iat: number;
      exp: number;
    };
    const decode = verify(accessToken, config.jwtsecret);
    if (!decode) {
      res.status(404).json({ message: "no token found or invalid_type" });
      return;
    }
    req.userId = await userIdRequest.parseAsync((decode as Payload).id);
    next();
  },
);
