import { Router } from "express";
import { uuid } from 'uuidv4';
import { get, getAll, upsert, getMongoConnection, insertMany } from "../integrations/mongo";
import { Exercise, PersonalizedExercise, PersonalizeExercisesBody, Profile } from '../types';
import { personalizeExercises } from '../helpers';
import { disconnect } from 'mongoose';


const personalizedExerciseRouter = Router();

personalizedExerciseRouter.get('/all', async (req, res) => {
  const db = await getMongoConnection();
  const personalizedExercises: PersonalizedExercise[] = await getAll(db, 'personalized-exercises');
  
  res.status(200).json({ message: personalizedExercises});
});

personalizedExerciseRouter.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  const db = await getMongoConnection();
  const personalizedExercise: PersonalizedExercise = await get(db, 'personalized-exercises', { identifier});
  
  res.status(200).json({ message: personalizedExercise});
});

personalizedExerciseRouter.post('/', async (req, res) => {
  const body = req.body;
  const identifier = uuid();

  const db = await getMongoConnection();
  const upsertedPersonalizedExercise: PersonalizedExercise = await upsert(db, 'personalized-exercises', body, { identifier });

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

  const exercises: Exercise[] = await getAll(db, 'exercises', filter);
  await disconnect();


  const profile: Profile = await get(db, 'profiles', { identifier: profileIdentifier });

  const randomFiveExercises: Exercise[] = exercises.sort(() => 0.5 - Math.random()).slice(0, 5);
  console.log({
    randomFiveExercises,
  })
  const personalizedExercises = await personalizeExercises({
    profileIdentifier,
    exercises: randomFiveExercises,
    preferences: profile.preferences,
  })
  await disconnect();

  await insertMany(db, 'personalized-exercises', personalizedExercises);

  res.status(201).json({ message: personalizedExercises })
});



export default personalizedExerciseRouter;