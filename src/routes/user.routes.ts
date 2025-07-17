import { Router } from "express";
import { patchProfile } from "../controllers/user.controllers";

const userRouter = Router();
userRouter.patch("/", patchProfile);
export default userRouter;
