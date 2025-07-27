import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import { upload } from "../services";

export const imageUpload = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      res.status(400).send("no image was uploaded");
      return;
    }
    const imageUrl = await upload(req.file.buffer);
    if (!imageUrl) {
      next(new Error("image url not found"));
      return;
    }
    res.status(200).json({ url: imageUrl });
  },
);
