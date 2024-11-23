import { Router } from "express";
import { get, getAll, getMongoConnection } from "../integrations/mongo";

const exerciseRouter = Router();

exerciseRouter.get('/all', async (req, res) => {
  const db = await getMongoConnection('exercises');
  const exercises = await getAll(db, 'exercises');
  
  res.status(201).json({ message: exercises});
});

exerciseRouter.get('/get/:identifier', async (req, res) => {
  const { identifier } = req.params;

  const db = await getMongoConnection('exercises');
  const exercises = await get(db, 'exercises', { identifier});
  
  res.status(201).json({ message: exercises});
});

exerciseRouter.post('/update', async (req, res) => {
  const rawBody = req.body;

  res.status(201).json({ message: rawBody });
});

export default exerciseRouter;