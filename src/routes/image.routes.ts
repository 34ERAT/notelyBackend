import { Router } from "express";
import { imageUpload } from "../controllers";

const imageRouter = Router();
imageRouter.post("/upload", imageUpload);
export default imageRouter;
