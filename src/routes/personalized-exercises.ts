import { Router } from "express";
import { uuid } from 'uuidv4';
import { get, getAll, upsert, getMongoConnection } from "../integrations/mongo";


const personalizedExerciseRouter = Router();

personalizedExerciseRouter.get('/all', async (req, res) => {
  const db = await getMongoConnection('personalized-exercises');
  const personalizedExercises = await getAll(db, 'personalized-exercises');
  
  res.status(200).json({ message: personalizedExercises});
});

personalizedExerciseRouter.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  const db = await getMongoConnection('personalized-exercises');
  const personalizedExercises = await get(db, 'personalized-exercises', { identifier});
  
  res.status(200).json({ message: personalizedExercises});
});

personalizedExerciseRouter.post('/:identifier?', async (req, res) => {
  const {
    body, 
    params
  } = req;
  const identifier = params.identifier || uuid();

  const db = await getMongoConnection('personalized-exercises');
  const upsertedPersonalizedExercise = await upsert(db, 'personalized-exercises', body, { identifier });

  res.status(201).json({ message: upsertedPersonalizedExercise });
});

export default personalizedExerciseRouter;