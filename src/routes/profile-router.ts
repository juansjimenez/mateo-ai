import { Router } from "express";
import { uuid } from 'uuidv4';
import { get, getAll, upsert, getMongoConnection } from "../integrations/mongo";

const profileRouter = Router();

profileRouter.get('/all', async (req, res) => {
  const db = await getMongoConnection('profiles');
  const profiles = await getAll(db, 'profiles');
  
  res.status(201).json({ message: profiles});
});

profileRouter.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  const db = await getMongoConnection('profiles');
  const profiles = await get(db, 'profiles', { identifier});
  
  res.status(201).json({ message: profiles});
});

profileRouter.post('/:identifier?', async (req, res) => {
  const {
    body, 
    params
  } = req;
  const identifier = params.identifier || uuid();

  const db = await getMongoConnection('profiles');
  const upsertedProfile = await upsert(db, 'profiles', body, { identifier });

  res.status(201).json({ message: upsertedProfile });
});

export default profileRouter;