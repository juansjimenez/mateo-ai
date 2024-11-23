import { Exercise, Preference } from "../types";
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

const personalizePrompt = ({
  exercise,
  preferences,
}: {
  exercise: Exercise;
  preferences: Preference[];
}): string => {
  const preferencesString = preferences.map(preference => preference.value).join(', ');
  const prompt = `Tome el siguiente problema matematico:\n\n${exercise.statement}\n\nPersonaliza el enunciado del problema de manera que sea divertido o narrativo, relacionándolo con las siguientes tematicas a usar: ${preferencesString}.\n\nSi música está presente en las temáticas: usa conceptos generales (festivales, géneros como rock o pop, instrumentos) o menciona artistas populares, como Taylor Swift, Bad Bunny o BTS, pero no te bases solamente en esto, usa tu creatividad.\n\nSi deportes está presente en las temáticas: relaciónalo con situaciones generales (partidos, entrenamientos, competencias) o menciona deportistas famosos como Lionel Messi, Simone Biles, o LeBron James.\n\nSi películas está presente en las temáticas: usa temas generales (estrenos, géneros como acción o comedia), menciona películas populares como Avengers, El Señor de los Anillos, o Titanic, o menciona actores famosos como Leonardo DiCaprio o Jacob Elordi.\n\nNo personalizar con todas las temáticas, solamente con las especificadas para usar inicialmente. Mantén el fondo matemático del problema intacto, pero transforma el contexto para hacerlo temáticamente relevante con las preferencias a usar dadas. Las personas resolviendo estos problemas tienen en promedio 18 años, considera esto para las referencias culturales que uses para personalizar el problema.\n\nNo agregues nada más a la respuesta aparte del problema inicial personalizado.\n\nEntrega respuestas breves, no te excedas mucho mas que el largo original del problema.`
  return prompt;
};

export {
  classifyPrompt,
  assignDifficultyPrompt,
  personalizePrompt,
}