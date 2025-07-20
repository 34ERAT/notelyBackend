import express from "express";
import config from "./config/config";
import router from "./routes";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.middlewares";
import cors from "cors";
const app = express();
const port = config.port;
app.use(
  cors({
    origin: config.origin || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.info(`server running on ::: \t ${port}`);
});
