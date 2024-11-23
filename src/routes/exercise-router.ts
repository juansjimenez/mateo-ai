import { Router } from "express";
import { uuid } from 'uuidv4';
import { get, getAll, upsert, getMongoConnection } from "../integrations/mongo";
import { askChatGPT } from "../integrations/chatgpt";
import { solveExercisePrompt } from "../prompts";


const exerciseRouter = Router();

exerciseRouter.get('/all', async (req, res) => {
  const db = await getMongoConnection('exercises');
  const exercises = await getAll(db, 'exercises');
  
  res.status(200).json({ message: exercises});
});

exerciseRouter.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  const db = await getMongoConnection('exercises');
  const exercises = await get(db, 'exercises', { identifier});
  
  res.status(200).json({ message: exercises});
});

exerciseRouter.post('/:identifier?', async (req, res) => {
  const {
    body, 
    params
  } = req;
  const identifier = params.identifier || uuid();

  const db = await getMongoConnection('exercises');
  const uspertedExercise = await upsert(db, 'exercises', body, { identifier });

  res.status(201).json({ message: uspertedExercise });
});

exerciseRouter.post('/solve', async (req, res) => {
  const { identifier } = req.body;

  const db = await getMongoConnection('exercises');
  const exercise = await get(db, 'exercises', { identifier });

  if (!exercise) {
    res.status(404).json({ message: 'Exercise not found' });
    return;
  }

  if (exercise.explanation) {
    res.status(400).json({ message: 'Exercise already solved', exercise });
    return;
  }

  const solverPrompt = solveExercisePrompt(exercise);
  const explanation = await askChatGPT(solverPrompt);

  const newExercise = {
    ...exercise,
    explanation,
  };

  const result = await upsert(db, 'exercises', newExercise, { identifier });
  const final = await get(db, 'exercises', { identifier });

  res.status(200).json({ message: 'ok', result, exercise: final });
});

export default exerciseRouter;