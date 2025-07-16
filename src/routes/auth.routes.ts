import { Router } from "express";
import { login, register } from "../controllers";
const authRouter = Router();
//TODO: POST /api/auth/register: register a user
authRouter.post("/register", register);
//TODO: POST /api/auth/login: login a user.
authRouter.post("/login", login);
//TODO: POST /api/auth/logout: logout a user.
// router.post("/logout");
//TODO: POST /api/auth/password: update a specific user's password.
// router.post("/password");

export default authRouter;
