import express from "express";
import config from "./config/config";
const app = express();
const port = config.port;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.info(`server running on ::: \t ${port}`);
});
