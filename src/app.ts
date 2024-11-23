import express from 'express';
import { profileRouter } from './routes';
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/profiles', profileRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});