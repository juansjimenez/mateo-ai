import { Router } from "express";
import { uuid } from 'uuidv4';
import { get, getAll, upsert, getMongoConnection } from "../integrations/mongo";
import { Profile } from "../types";
import { disconnect } from 'mongoose';

const profileRouter = Router();

profileRouter.get('/all', async (req, res) => {
  const db = await getMongoConnection();
  const profiles: Profile[] = await getAll(db, 'profiles');
  
  await disconnect();
  res.status(200).json({ message: profiles});
});

profileRouter.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  const db = await getMongoConnection();
  const profile: Profile = await get(db, 'profiles', { identifier});
  
  await disconnect();
  res.status(200).json({ message: profile});
});

profileRouter.post('/:identifier?', async (req, res) => {
  const {
    body, 
    params
  } = req;
  const identifier = params.identifier || uuid();

  const db = await getMongoConnection();
  const upsertedProfile = await upsert(db, 'profiles', body as Profile, { identifier });

  await disconnect();
  res.status(201).json({ message: upsertedProfile });
});

export default profileRouter;