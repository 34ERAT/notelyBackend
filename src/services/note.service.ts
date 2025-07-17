import { Note } from "@prisma/client";
import dbConnection from "../utils/dbConnection";

export async function newNote(noteRequest: Note) {
  const note = await dbConnection.note.create({
    data: noteRequest,
    omit: { isDelete: true, userId: true },
  });
  return note;
}
export async function getNotesByUserId(userId: string, deleted: boolean) {
  const notes = await dbConnection.note.findMany({
    where: { userId, AND: { isDelete: deleted } },
    omit: { isDelete: true, userId: true, content: true },
  });
  return notes;
}
export async function getNote(id: string, userId: string) {
  const note = await dbConnection.note.findUnique({
    where: { id, AND: { userId, isDelete: false } },
    omit: { isDelete: true, userId: true },
  });
  return note;
}
export async function updateNote(note: Note) {
  const { userId, id, ...rest } = note;
  const patchednote = await dbConnection.note.update({
    where: {
      id,
      AND: { userId, isDelete: false },
    },
    data: { ...rest },
    omit: { isDelete: true, userId: true },
  });
  return patchednote;
}
export async function restoreNoteById(id: string, userId: string) {
  const note = await dbConnection.note.update({
    where: {
      id,
      AND: { userId, isDelete: true },
    },
    data: { isDelete: false },
    omit: { isDelete: true, userId: true },
  });
  return note;
}
export async function deleteNoteById(id: string, userId: string) {
  const note = await dbConnection.note.update({
    where: { id, AND: { userId, isDelete: false } },
    data: { isDelete: true },
  });
  return note;
}
