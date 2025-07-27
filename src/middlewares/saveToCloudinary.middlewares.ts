import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import { upload } from "../services";

export default asyncHandler(
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
    req.avatar = imageUrl;
    next();
  },
);
