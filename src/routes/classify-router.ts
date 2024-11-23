import { Router } from "express";
import * as he from "he";
import { askChatGPT } from "../integrations/chatgpt";
import { get, getMongoConnection, upsert } from "../integrations/mongo";
import { assignDifficultyPrompt, classifyPrompt } from "../prompts";
import { Exercise } from "../types";

const classifyRouter = Router();
function transformLatexToPlainText(inputText: string): string {
  inputText = inputText.replace(/\\frac{([^}]+)}{([^}]+)}/g, "$1/$2");
  inputText = inputText.replace(/\\textbf{([^}]+)}/g, "$1 (bold)");
  inputText = inputText.replace(/\\textit{([^}]+)}/g, "$1 (italic)");
  inputText = inputText.replace(/\$([^$]+)\$/g, "$1");
  inputText = inputText.replace(/\\textsubscript{([^}]+)}/g, "$_{$1}$");
  inputText = inputText.replace(/\\textsuperscript{([^}]+)}/g, "$^{1}$");
  inputText = inputText.replace(/\\dfrac{([^}]+)}{([^}]+)}/g, "$1/$2");
  inputText = inputText.replace(/\\tfrac{([^}]+)}{([^}]+)}/g, "$1/$2");
  inputText = inputText.replace(/\\[a-zA-Z]+\{[^}]*\}/g, "");
  return inputText;
}

function removeHtmlAndWhitespace(inputText: string): string {
  let result = inputText.replace(/<[^>]+>/g, "");
  result = result.replace(/\s+/g, " ").trim();

  return result;
}

function clean(text: string): string {
  return decodeHtmlEntities(
    transformLatexToPlainText(removeHtmlAndWhitespace(text))
  );
}

function transformInput(input: any): Exercise {
  const question = input.question.S;
  const alternatives = input.alternatives.L.map(
    (alternative: any, index: number) => {
      return {
        index: index,
        text: clean(alternative.M.text.S), // Remove HTML tags from text
        isCorrect: alternative.M.isCorrect.BOOL,
      };
    }
  );

  return {
    identifier: input.id_question.N,
    statement: clean(question), // Remove HTML tags from question
    alternatives: alternatives,
  };
}

function decodeHtmlEntities(inputText: string): string {
  // Use the `he` library to decode all HTML entities into UTF-8 characters
  return he.decode(inputText);
}

classifyRouter.post("/new", async (req, res) => {
  const response = transformInput(req.body);

  const db = await getMongoConnection("exercises");
  const result = await upsert(db, "exercises", response, {
    identifier: response.identifier,
  });

  const success = result.upsertedCount === 1;

  res.status(201).json({ result, success });
});

classifyRouter.post("/assign-subject", async (req, res) => {
  const identifier = req.body.identifier;
  const db = await getMongoConnection("exercises");
  const exercise = await get(db, "exercises", { identifier });

  if (!exercise) {
    throw new Error("Exercise not found");
  }

  const prompt = classifyPrompt(exercise);
  const prediction = await askChatGPT(prompt);

  console.log("Prediction:", prediction);

  const { unit, subject } = JSON.parse(prediction);

  const difficultyPrompt = assignDifficultyPrompt(exercise);
  const difficulty = await askChatGPT(difficultyPrompt);

  const newExercise = {
    ...exercise,
    subjectId: subject,
    unitId: unit,
    difficulty: Number(difficulty),
  };

  const result = await upsert(db, "exercises", newExercise, { identifier });
  const success = result.upsertedCount === 1;

  res.status(201).json({ result, success });
});

export default classifyRouter;
