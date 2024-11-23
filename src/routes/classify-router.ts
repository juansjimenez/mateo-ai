import { Router } from "express";
import { getMongoConnection, upsert } from "../integrations/mongo";
import { askGemini } from "../integrations/gemini";
import { dynamoToMongoPrompt } from "../prompts";

const classifyRouter = Router();

classifyRouter.get('/new', async (req, res) => {
  const response = await askGemini(dynamoToMongoPrompt);

  const cleanData = JSON.parse(response);


  const db = await getMongoConnection('mateo');
  const clasify = await upsert(db, 'exercises', cleanData);
  
  res.status(201).json({ message: clasify});
});


export default classifyRouter;