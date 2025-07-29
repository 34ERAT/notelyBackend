import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.uitl";
import { bookMarkToogle, noteRequest, notesParams } from "../validations";
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
import { marked } from "marked";
import { toMarkDown } from "../utils";
export const createNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newnote = await noteRequest.parseAsync(req.body);
    const userId = req.userId;
    const createdNote = await newNote({
      userId,
      ...newnote,
      content: toMarkDown(newnote.content),
    } as Note);
    if (!createdNote) {
      next(new Error());
      return;
    }
    res
      .status(201)
      .json({ ...createdNote, content: await marked(createdNote.content) });
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
    const content = await marked(note.content);
    res.status(200).json({ ...note, content });
  },
);
export const patchNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = await notesParams.parseAsync(req.params);
    let patchedNote = await noteRequest.parseAsync(req.body);
    patchedNote = { ...patchedNote, content: toMarkDown(patchedNote.content) };
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
    const { BookMarked } = await bookMarkToogle.parseAsync(req.body);
    const note = await updateNote({ id, userId, BookMarked } as Note);
    if (!note) {
      next(new Error("note not found or something is wrongh"));
    }
    res.status(200).json({ message: "note bookMarked successfully" });
  },
);
