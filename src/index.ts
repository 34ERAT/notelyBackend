import express from "express";
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.info(`server running on ::: \t ${port}`);
});
