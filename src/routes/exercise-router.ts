import { Router } from "express";
import { uuid } from 'uuidv4';
import { get, getAll, upsert, getMongoConnection } from "../integrations/mongo";
import { Exercise } from '../types';
import { askChatGPT } from "../integrations/chatgpt";
import { solveExercisePrompt } from "../prompts";
import { disconnect } from 'mongoose';


const exerciseRouter = Router();

exerciseRouter.get('/all', async (req, res) => {
  const db = await getMongoConnection();
  const exercises: Exercise[] = await getAll(db, 'exercises');
  
  await disconnect();
  res.status(200).json({ message: exercises});
});


exerciseRouter.post('/solve', async (req, res) => {
  const { identifier } = req.body;
  console.log('Solving exercise:', identifier);
  const db = await getMongoConnection();
  console.log('AA')
  const exercise = await get(db, 'exercises', { identifier });

  console.log('Exercise found:', exercise);

  if (!exercise) {
    await disconnect();
    res.status(404).json({ message: 'Exercise not found' });
    return;
  }

  if (exercise.explanation) {
    await disconnect();
    res.status(400).json({ message: 'Exercise already solved', exercise });
    return;
  }

  console.log('Solving exercise ...');

  const solverPrompt = solveExercisePrompt(exercise);
  const explanation = await askChatGPT(solverPrompt);

  console.log('Explanation:', explanation);

  const newExercise = {
    ...exercise,
    explanation,
  };

  const result = await upsert(db, 'exercises', newExercise, { identifier });
  const final = await get(db, 'exercises', { identifier });

  console.log('Exercise solved:', final);

  await disconnect();
  res.status(200).json({ message: 'ok', result, exercise: final });
});

exerciseRouter.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  const db = await getMongoConnection();
  const exercise: Exercise = await get(db, 'exercises', { identifier});
  
  await disconnect();
  res.status(200).json({ message: exercise});
});

exerciseRouter.post('/:identifier?', async (req, res) => {
  const {
    body, 
    params
  } = req;
  const identifier = params.identifier || uuid();

  const db = await getMongoConnection();
  const uspertedExercise: Exercise = await upsert(db, 'exercises', body, { identifier });

  await disconnect();
  res.status(201).json({ message: uspertedExercise });
});

export default exerciseRouter;