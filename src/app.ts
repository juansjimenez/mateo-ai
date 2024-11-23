import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import {
  classifyRouter,
  exerciseRouter,
  profileRouter,
  personalizedExerciseRouter,
} from './routes';
import bodyParser from 'body-parser';

import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const port = process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server);


app.use(bodyParser.json());
app.use('/profiles', profileRouter);
app.use('/classify', classifyRouter);
app.use('/exercises', exerciseRouter);
app.use('/personalized-exercises', personalizedExerciseRouter);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/health', (req, res) => {
  res.status(200).send('OK PATOAPATOPOAPOT');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('ekko message', msg);
  });
});