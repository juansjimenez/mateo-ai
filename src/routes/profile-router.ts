import { Router } from "express";
import { get, getAll, getMongoConnection } from "../integrations/mongo";

const profileRouter = Router();

profileRouter.get('/all', async (req, res) => {
  const db = await getMongoConnection('profiles');
  const profiles = await getAll(db, 'profiles');
  
  res.status(201).json({ message: profiles});
});

profileRouter.get('/get/:name', async (req, res) => {
  console.log('GET /:name');
  const { name } = req.params;

  const db = await getMongoConnection('profiles');
  const profiles = await get(db, 'profiles', { name});
  
  res.status(201).json({ message: profiles});
});

profileRouter.post('/update', async (req, res) => {
  const rawBody = req.body;

  res.status(201).json({ message: rawBody });
});

export default profileRouter;