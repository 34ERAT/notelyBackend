import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import {
  loginRequest,
  registerRequest,
  resetPasswordRequest,
} from "../validations";
import { createUser, loginUser, resetPassword } from "../services";
import { User } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";
import config from "../config/config";
import { Payload } from "../types";

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
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userName, email, password } = await loginRequest.parseAsync(
      req.body,
    );
    const token = await loginUser(
      (userName as string).trim() || (email as string).trim(),
      password,
    );
    if (!token) {
      res.status(401).json({ message: "invalid userName or password" });
      return;
    }
    res.cookie("refreshToken", token?.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ accessToken: token?.accessToken });
  },
);
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("refreshToken");
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
export const renewToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(401).json({ message: "no refresh token provided" });
      return;
    }
    const { id, userName } = verify(
      refreshToken,
      config.jwtSecretRefresh,
    ) as Payload;

    const accessToken = sign({ id, userName }, config.jwtSecret, {
      expiresIn: "15m",
    });
    if (!accessToken) {
      next(new Error());
    }
    res.status(200).json({ accessToken });
  },
);
