import e, { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import { noteRequest, notesParams } from "../validations";
import {
  bookMarks,
  deleteNoteById,
  getNote,
  getNotesByUserId,
  newNote,
  restoreNoteById,
  updateNote,
} from "../services/note.service";
import { Note } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
export const createNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newnote = await noteRequest.parseAsync(req.body);
    const userId = req.userId;
    const createdNote = await newNote({ userId, ...newnote } as Note);
    if (!createdNote) {
      next(new Error());
      return;
    }
    res.status(201).json(createdNote);
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
      next(
        new PrismaClientKnownRequestError("note was not found", {
          code: "P2001",
          clientVersion: "N\/A",
          meta: { target: ["id"] },
        }),
      );
      return;
    }
    res.status(200).json(note);
  },
);
export const patchNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await notesParams.parseAsync(req.params);
    const patchedNote = await noteRequest.parseAsync(req.body);
    const note = await updateNote({
      id,
      userId: req.userId,
      ...patchedNote,
    } as Note);
    if (!patchedNote) {
      next(new Error());
      return;
    }
    res.status(200).json(note);
  },
);
export const restoreNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await notesParams.parseAsync(req.params);
    const note = await restoreNoteById(id, req.userId as string);
    if (!note) {
      next(new Error());
      return;
    }
    res.status(200).json({ message: " restored successfuly" });
  },
);
export const deleteNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await notesParams.parseAsync(req.params);
    const note = await deleteNoteById(id, req.userId as string);
    if (!note) {
      next(new Error());
      return;
    }
    res.status(200).json({ message: "note deleted successfully" });
  },
);
export const allBookMarks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const notes = await bookMarks(req.userId as string);
    if (!notes) {
      next(new Error("laking notes"));
      return;
    }
    res.status(200).json(notes);
  },
);
export const bookMarkNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await notesParams.parseAsync(req.params);
    const userId = req.userId as string;
    const note = await updateNote({ id, userId, BookMarked: true } as Note);
    if (!note) {
      next(new Error("note not found or something is wrongh"));
    }
    res.status(200).json({ message: "note bookMarked successfully" });
  },
);
