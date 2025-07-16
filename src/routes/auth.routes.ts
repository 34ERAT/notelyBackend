import { Router } from "express";
import { login, logout, patchPassword, register } from "../controllers";
import { verifyUser } from "../middlewares/verifyUser.middlewares";
const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", verifyUser, logout);
//TODO: POST /api/auth/password: update a specific user's password.
authRouter.patch("/password", verifyUser, patchPassword);

export default authRouter;
