import { Router } from "express";
import {
  login,
  logout,
  patchPassword,
  register,
  renewToken,
} from "../controllers";
import { verifyUser } from "../middlewares";
const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", verifyUser, logout);
authRouter.patch("/password", verifyUser, patchPassword);
authRouter.post("/refresh", renewToken);
export default authRouter;
