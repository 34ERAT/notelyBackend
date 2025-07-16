import { Router } from "express";
import { register } from "../controllers";
const authRouter = Router();
//TODO: POST /api/auth/register: register a user
authRouter.post("/register", register);
//TODO: POST /api/auth/login: login a user.
// router.post("/login");
//TODO: POST /api/auth/logout: logout a user.
// router.post("/logout");
//TODO: POST /api/auth/password: update a specific user's password.
// router.post("/password");

export default authRouter;
