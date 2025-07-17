import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import { newNoteRequest, notesParams } from "../validations";
import { getNote, getNotesByUserId, newNote } from "../services/note.service";
import { Note } from "@prisma/client";
export const createNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const noteRequest = await newNoteRequest.parseAsync(req.body);
    const userId = req.userId;
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
    const userNotes = await getNotesByUserId(req.userId as string, false);
    if (!userNotes) {
      next(new Error());
      return;
    }
    res.status(200).json(userNotes);
  },
);
export const deleteNotes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const trash = await getNotesByUserId(req.userId as string, true);
    if (!trash) {
      next(new Error());
      return;
    }
    res.status(200).json(trash);
  },
);
export const findNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await notesParams.parseAsync(req.params);
    const note = await getNote(id, req.userId as string);
    if (!note) {
      next(new Error());
      return;
    }
    res.status(200).json(note);
  },
);
