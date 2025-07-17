import { Router } from "express";
import { allNotes, createNote, deleteNotes, findNote } from "../controllers";

const noteRouter = Router();
noteRouter.route("/").post(createNote).get(allNotes);
noteRouter.get("/trash", deleteNotes);
//TODO: GET /api/entry/:id: get a specific entry
noteRouter.route("/:id").get(findNote);
//TODO: PATCH /api/entry/:id: update a specific entry
//
//TODO: PATCH /api/entry/restore/:id: restore a specific deleted entry.
//
//TODO: DELETE /api/entry/:id: mark a specific entry as deleted.
//
export default noteRouter;
