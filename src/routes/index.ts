import { Router } from "express";
import authRouter from "./auth.routes";
//TODO: POST /api/entries: create a new entry.
//
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
//TODO: PATCH /api/user/ update user's primary information (and the avatar url as well).
const router = Router();
router.use("/auth", authRouter);
export default router;
