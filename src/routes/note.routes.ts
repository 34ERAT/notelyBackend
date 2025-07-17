import { Router } from "express";
import { verifyUser } from "../middlewares";
import { createNote } from "../controllers";

const noteRouter = Router();
//TODO: POST /api/entries: create a new entry.
noteRouter.route("/").post(verifyUser, createNote);
//TODO: GET /api/entries or GET /api/notes: get all entries/notes belonging to a user.
//
//TODO: GET /api/entries/trash: get all deleted entries.
//
//TODO: GET /api/entry/:id: get a specific entry
//
//TODO: PATCH /api/entry/:id: update a specific entry
//
//TODO: PATCH /api/entry/restore/:id: restore a specific deleted entry.
//
//TODO: DELETE /api/entry/:id: mark a specific entry as deleted.
//
export default noteRouter;
