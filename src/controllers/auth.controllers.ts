import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import { loginRequest, registerRequest } from "../validations";
import { createUser, loginUser } from "../services";
import { User } from "@prisma/client";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { confirmPassword, ...newUser } = await registerRequest.parseAsync(
      req.body,
    );
    const user = await createUser(newUser as User);
    if (user) {
      res.status(201).json({ messsage: "user created successfully" });
      return;
    }
    next(new Error());
  },
);
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email, password } = await loginRequest.parseAsync(
      req.body,
    );
    const token = await loginUser(
      (userName as string) || (email as string),
      password,
    );
    if (!token) next(new Error());

    res.status(200).json(token);
  },
);
