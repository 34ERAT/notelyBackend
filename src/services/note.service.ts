import { Note } from "@prisma/client";
import dbConnection from "../utils/dbConnection";

export async function newNote(noteRequest: Note) {
  const note = await dbConnection.note.create({
    data: noteRequest,
    omit: { isDelete: true, userId: true },
  });
  return note;
}
