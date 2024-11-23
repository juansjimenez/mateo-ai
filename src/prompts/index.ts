import { Exercise } from "../types";
import { paesMathUnits } from "../assets/paes-math-units";

const classifyPrompt = (exercise: Exercise): string => {
  const contents = JSON.stringify(paesMathUnits, null, 2);
  const predictedUnitAndSubject = '{ unit: string, subject: string }';
  const prompt = `Consider the following JSON that has a structure of math subjects and its units\n\n${contents}\n\nNow consider the following exercise\n\n${exercise.statement}\n\nReturn a JSON only, no additional text, with the predicted unit and subject of the exercise in this format\n\n${predictedUnitAndSubject}`;
  return prompt;
}

const assignDifficultyPrompt = (exercise: Exercise): string => {
  const prompt = `Consider the following exercise\n\n${exercise.statement}\n\nReturn a number only, that represents the difficulty in scale 1-10, where 10 is ultra difficult and 1 is easy, considering that a grad high school student will answer the question `;
  return prompt;
}

export {
  classifyPrompt,
  assignDifficultyPrompt,
}