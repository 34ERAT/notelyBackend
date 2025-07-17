import { Router } from "express";
import authRouter from "./auth.routes";
import noteRouter from "./note.routes";
//TODO: PATCH /api/user/ update user's primary information (and the avatar url as well).
const router = Router();
router.use("/auth", authRouter);
router.use("/notes", noteRouter);
export default router;
