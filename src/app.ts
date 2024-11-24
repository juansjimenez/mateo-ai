import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
const cors = require('cors');
import express from "express";
import { Server } from "socket.io";

import {
  classifyRouter,
  exerciseRouter,
  personalizedExerciseRouter,
  profileRouter,
  subjectRouter,
} from "./routes";

const app = express();
const port = process.env.PORT || 3000;

const httpserver = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const io = new Server(httpserver, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"], 
  },
});
  

app.use(bodyParser.json());
app.use(cors());
app.use("/profiles", profileRouter);
app.use("/classify", classifyRouter);
app.use("/exercises", exerciseRouter);
app.use("/personalized-exercises", personalizedExerciseRouter);
app.use("/subjects", subjectRouter);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("message", msg);
  });
});
