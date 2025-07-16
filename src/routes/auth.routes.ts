import { Router } from "express";
import { login, logout, register } from "../controllers";
const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
//TODO: POST /api/auth/password: update a specific user's password.
// router.post("/password");

export default authRouter;
