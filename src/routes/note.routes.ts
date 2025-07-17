import { Router } from "express";
import {
  allNotes,
  createNote,
  deleteNotes,
  findNote,
  patchNote,
} from "../controllers";

const noteRouter = Router();
noteRouter.route("/").post(createNote).get(allNotes);
noteRouter.get("/trash", deleteNotes);
noteRouter
  .route("/:id")
  .get(findNote)
  //TODO: PATCH /api/entry/:id: update a specific entry
  .patch(patchNote);
//TODO: PATCH /api/entry/restore/:id: restore a specific deleted entry.
//
//TODO: DELETE /api/entry/:id: mark a specific entry as deleted.
//
export default noteRouter;
