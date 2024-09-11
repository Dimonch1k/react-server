import express from "express";
import postRouter from "./routes/PostRouter.mjs";
import feedbackRouter from "./routes/FeedbackRouter.mjs";
import dbConnection from "./db/index.mjs";

dbConnection.on("error", console.error.bind("MongoDB connection error"));
dbConnection.on("connected", console.log.bind("MongoDB connection success"));

const app = express();
const port = 4000;

app.use(express.json());

app.use("/api/posts", postRouter);
app.use("/api/feedbacks", feedbackRouter);

app.get("/", (req, res) => {
  res.send("Start Page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
