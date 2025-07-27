import { Router } from "express";
import { updateAvatar } from "../controllers";
import saveToCloudinaryMiddlewares from "../middlewares/saveToCloudinary.middlewares";

const imageRouter = Router();
imageRouter.post("/avatar", saveToCloudinaryMiddlewares, updateAvatar);
export default imageRouter;
