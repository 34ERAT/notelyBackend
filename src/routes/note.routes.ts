import { Router } from "express";
import { allNotes, createNote, deleteNotes } from "../controllers";

const noteRouter = Router();
noteRouter.route("/").post(createNote).get(allNotes);
//TODO: GET /api/entries/trash: get all deleted entries.
noteRouter.get("/trash", deleteNotes);
//TODO: GET /api/entry/:id: get a specific entry
//
//TODO: PATCH /api/entry/:id: update a specific entry
//
//TODO: PATCH /api/entry/restore/:id: restore a specific deleted entry.
//
//TODO: DELETE /api/entry/:id: mark a specific entry as deleted.
//
export default noteRouter;
