import { NextFunction, Request, Response } from "express";

export default function asyncHandler(callback: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
