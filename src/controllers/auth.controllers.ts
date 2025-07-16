import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import { registerUser } from "../validations";
import { createUser } from "../services";
import { User } from "@prisma/client";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { confirmPassword, ...newUser } = await registerUser.parseAsync(
      req.body,
    );
    const user = await createUser(newUser as User);
    if (user) {
      res.status(201).json({ messsage: "user created successfuly" });
      return;
    }
    next(new Error());
  },
);
