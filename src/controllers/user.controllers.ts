import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import { profileRequest } from "../validations";
import { User } from "@prisma/client";
import { getProfile, updateProfile } from "../services/user.service";

export const patchProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const modifiedProfile = await profileRequest.parseAsync(req.body);
    const profile = await updateProfile({
      id: req.userId as string,
      ...modifiedProfile,
    } as User);
    if (!profile) {
      next(new Error());
      return;
    }
    res.status(200).json(profile);
  },
);
export const profile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const profile = await getProfile(req.userId as string);
    if (!profile) {
      next(new Error());
      return;
    }
    res.status(200).json(profile);
  },
);
