import { Router } from "express";
import { patchProfile, profile } from "../controllers/user.controllers";

const userRouter = Router();
userRouter.route("/").patch(patchProfile).get(profile);
export default userRouter;
