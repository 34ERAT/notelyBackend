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
