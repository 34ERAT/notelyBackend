import { Router } from "express";
import authRouter from "./auth.routes";
import noteRouter from "./note.routes";
import { verifyUser } from "../middlewares";
import userRouter from "./user.routes";
//TODO: PATCH /api/user/ update user's primary information (and the avatar url as well).
const router = Router();
router.use("/auth", authRouter);
router.use("/notes", verifyUser, noteRouter);
router.use("/user", verifyUser, userRouter);
export default router;
