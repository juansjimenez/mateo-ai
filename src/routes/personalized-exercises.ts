import { Router } from "express";
import { uuid } from 'uuidv4';
import { get, getAll, upsert, getMongoConnection, insertMany } from "../integrations/mongo";
import { Exercise, PersonalizedExercise, PersonalizeExercisesBody, Profile } from '../types';
import { analyzeHistory, personalizeExercises } from '../helpers';
import { disconnect } from 'mongoose';
import { askChatGPT } from '../integrations/chatgpt';
import { solveExercisePrompt } from '../prompts';


const personalizedExerciseRouter = Router();

personalizedExerciseRouter.get('/all', async (req, res) => {
  const db = await getMongoConnection();
  const personalizedExercises: PersonalizedExercise[] = await getAll(db, 'personalized-exercises');
  
  await disconnect();
  res.status(200).json({ message: personalizedExercises});
});

personalizedExerciseRouter.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  const db = await getMongoConnection();
  const personalizedExercise: PersonalizedExercise = await get(db, 'personalized-exercises', { identifier});
  
  await disconnect();
  res.status(200).json({ message: personalizedExercise});
});

personalizedExerciseRouter.post('/', async (req, res) => {
  const body = req.body;
  const identifier = uuid();

  const db = await getMongoConnection();
  const upsertedPersonalizedExercise: PersonalizedExercise = await upsert(db, 'personalized-exercises', body, { identifier });

  await disconnect();
  res.status(201).json({ message: upsertedPersonalizedExercise });
});

personalizedExerciseRouter.post('/personalize', async (req, res) => {
  const {
    profileIdentifier,
    subjectIdentifier,
    unitIdentifier,
  }: PersonalizeExercisesBody = req.body;

  const filter = {
    subjectId: subjectIdentifier,
    unitId: unitIdentifier,
  }

  const db = await getMongoConnection();

  const profile: Profile = await get(db, 'profiles', { identifier: profileIdentifier });

  const exercises: Exercise[] = await getAll(db, 'exercises', filter);
  const randomFiveExercises: Exercise[] = exercises.sort(() => 0.5 - Math.random()).slice(0, 5);

  const personalizedExercises = await personalizeExercises({
    profileIdentifier,
    exercises: randomFiveExercises,
    preferences: profile.preferences,
  })

  console.log({
    personalizedExercises,
  })

  await insertMany(db, 'personalized-exercises', personalizedExercises);

  await disconnect();
  res.status(201).json({ message: personalizedExercises })
});

personalizedExerciseRouter.get('/history/:profileIdentifier', async (req, res) => {
  const { profileIdentifier } = req.params;

  const db = await getMongoConnection();
  const personalizedExercises: PersonalizedExercise[] = await getAll(db, 'personalized-exercises', { profileIdentifier });

  const originalExercises = await getAll(db, 'exercises', { identifier: { $in: personalizedExercises.map((pe) => pe.originalExerciseIdentifier) } });

  const personalizedExercisesWithOriginalExercises = personalizedExercises.map((pe) => {
    const originalExercise = originalExercises.find((oe: Exercise) => oe.identifier === pe.originalExerciseIdentifier);
    return {
      ...pe,
      originalExerciseFull: originalExercise,
    }
  });

  const historyAnalysis = analyzeHistory(personalizedExercisesWithOriginalExercises);

  await disconnect();
  res.status(200).json({ historyAnalysis });
});


personalizedExerciseRouter.post('/submit-answer', async (req, res) => {
  const { identifier,  alternativeIndex} = req.body;

  const db = await getMongoConnection();
  const personalizedExercise: PersonalizedExercise = await get(db, 'personalized-exercises', { identifier });

  const submittedAlternative = personalizedExercise.alternatives[alternativeIndex];

  const newData = {
    submittedAnswer: submittedAlternative, 
    isCorrect: submittedAlternative.isCorrect,
    answeredAt: new Date(),
  }

  const upsertedPersonalizedExercise: PersonalizedExercise = await upsert(db, 'personalized-exercises', newData, { identifier });

  await disconnect();
  res.status(201).json({ message: upsertedPersonalizedExercise });
});


personalizedExerciseRouter.get('/solution-explanation/:identifier', async (req, res) => {
  const { identifier } = req.params;
  const db = await getMongoConnection();
  const personalizedExercise: PersonalizedExercise = await get(db, 'personalized-exercises', { identifier });
  const prompt = solveExercisePrompt(personalizedExercise);
  const solutionExplanation = await askChatGPT(prompt);

  await upsert(db, 'personalized-exercises', { solutionExplanation }, { identifier });

  await disconnect();
  res.status(200).json({ message: solutionExplanation });
});

export default personalizedExerciseRouter;