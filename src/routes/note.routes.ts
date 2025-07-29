import { Router } from "express";
import {
  allBookMarks,
  allNotes,
  bookMarkNote,
  createNote,
  deleteNote,
  deleteNotes,
  findNote,
  patchNote,
  restoreNote,
} from "../controllers";

const noteRouter = Router();
noteRouter.route("/").post(createNote).get(allNotes);
noteRouter.get("/trash", deleteNotes);
noteRouter.get("/bookmarks", allBookMarks);
noteRouter.route("/:id").get(findNote).patch(patchNote).delete(deleteNote);
noteRouter.patch("/restore/:id", restoreNote);
noteRouter.patch("/bookmarks/:id", bookMarkNote);
export default noteRouter;
