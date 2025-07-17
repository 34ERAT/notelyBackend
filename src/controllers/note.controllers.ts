import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import { newNoteRequest, userIdRequest } from "../validations";
import { newNote } from "../services/note.service";
import { Note } from "@prisma/client";

export const createNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const noteRequest = await newNoteRequest.parseAsync(req.body);
    const userId = await userIdRequest.parseAsync(req.userId);
    const note = await newNote({ userId, ...noteRequest } as Note);
    if (!note) {
      next(new Error());
      return;
    }
    res.status(201).json(note);
  },
);
