import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import { newNoteRequest, userIdRequest } from "../validations";
import { getNotesByUserId, newNote } from "../services/note.service";
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
export const allNotes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = await userIdRequest.parseAsync(req.userId);
    const userNotes = await getNotesByUserId(userId);
    if (!userNotes) {
      next(new Error());
      return;
    }
    res.status(200).json(userNotes);
  },
);
