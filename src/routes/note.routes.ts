import { Router } from "express";
import {
  allNotes,
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
noteRouter.route("/:id").get(findNote).patch(patchNote).delete(deleteNote);
noteRouter.patch("/restore/:id", restoreNote);
export default noteRouter;
