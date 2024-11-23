import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { classifyRouter, profileRouter } from './routes';
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/profiles', profileRouter);
app.use('/classify', classifyRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});