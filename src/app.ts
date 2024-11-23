import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import express from "express";
import {
  classifyRouter,
  exerciseRouter,
  personalizedExerciseRouter,
  profileRouter,
  subjectRouter,
} from "./routes";

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 3000;

const server = createServer(app);
const httpserver = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const io = new Server(httpserver, {
  cors: {
    origin: "*",
  },
});
app.set("socketio", io);

app.use(bodyParser.json());
app.use("/profiles", profileRouter);
app.use("/classify", classifyRouter);
app.use("/exercises", exerciseRouter);
app.use("/personalized-exercises", personalizedExerciseRouter);
app.use("/subjects", subjectRouter);

app.get("/health", (req, res) => {
  res.status(200).send("OK PATOAPATOPOAPOT");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("message", msg);
  });
});
