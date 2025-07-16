import { Router } from "express";
import { login, logout, register } from "../controllers";
import router from ".";
const authRouter = Router();
//TODO: POST /api/auth/register: register a user
authRouter.post("/register", register);
//TODO: POST /api/auth/login: login a user.
authRouter.post("/login", login);
//TODO: POST /api/auth/logout: logout a user.
authRouter.post("/logout", logout);
//TODO: POST /api/auth/password: update a specific user's password.
// router.post("/password");

export default authRouter;
