import { Router } from "express";

const profileRouter = Router();

profileRouter.get('/all', (req, res) => {
  console.log('GET /all');

  res.status(201).json({ message: 'GET /all' });
});

profileRouter.get('/get/:userId', (req, res) => {
  console.log('GET /:userId');
  const { userId } = req.params;

  res.status(200).json({ message: userId });
});

profileRouter.post('/update', (req, res) => {
  const rawBody = req.body;

  res.status(201).json({ message: rawBody });
});

export default profileRouter;