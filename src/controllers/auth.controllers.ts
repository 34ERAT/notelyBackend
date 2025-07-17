import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import {
  loginRequest,
  registerRequest,
  resetPasswordRequest,
} from "../validations";
import { createUser, loginUser, resetPassword } from "../services";
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
    res.cookie("accessToken", token?.accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60),
    });
    res.status(200).json({ message: "success" });
  },
);
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.json({ message: "logged out" });
});

export const patchPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, oldPassword } = await resetPasswordRequest.parseAsync(
      req.body,
    );
    const userId = req.userId as string;
    const newpass = await resetPassword(userId, oldPassword, password);
    if (!newpass) next(new Error());
    res.status(200).json({ message: "password reset succefull" });
  },
);
