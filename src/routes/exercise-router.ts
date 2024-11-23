import { Router } from "express";
import { uuid } from 'uuidv4';
import { get, getAll, upsert, getMongoConnection } from "../integrations/mongo";
import { Exercise } from '../types';


const exerciseRouter = Router();

exerciseRouter.get('/all', async (req, res) => {
  const db = await getMongoConnection('exercises');
  const exercises: Exercise[] = await getAll(db, 'exercises');
  
  res.status(200).json({ message: exercises});
});

exerciseRouter.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  const db = await getMongoConnection('exercises');
  const exercise: Exercise = await get(db, 'exercises', { identifier});
  
  res.status(200).json({ message: exercise});
});

exerciseRouter.post('/:identifier?', async (req, res) => {
  const {
    body, 
    params
  } = req;
  const identifier = params.identifier || uuid();

  const db = await getMongoConnection('exercises');
  const uspertedExercise: Exercise = await upsert(db, 'exercises', body, { identifier });

  res.status(201).json({ message: uspertedExercise });
});

export default exerciseRouter;