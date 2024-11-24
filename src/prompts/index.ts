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
  const prompt = `Tome el siguiente problema matematico:\n\n${exercise.statement}\n\nPersonaliza el enunciado del problema de manera que sea divertido o narrativo, relacionándolo con las siguientes tematicas a usar: ${preferencesString}.\n\nDe estas temáticas, selecciona solo una para personalizar. Si música es la temática seleccionada: usa conceptos generales (festivales, géneros, instrumentos) o menciona artistas populares, pero no te bases solamente en esto, usa tu creatividad.\n\nSi deportes es la temática seleccionada: personaliza con situaciones generales (partidos, entrenamientos, competencias) o menciona deportistas famosos como Lionel Messi, Alexis Sanchez, o LeBron James.\n\nSi películas es la temática seleccionada: usa temas generales (estrenos, géneros como acción o comedia), menciona películas populares como Avengers, El Señor de los Anillos, o Titanic, o menciona actores famosos como Leonardo DiCaprio o Matt Damon.\n\nMantén el fondo matemático del problema intacto, pero transforma el contexto para hacerlo temáticamente relevante con las temática seleccionada. Las personas resolviendo estos problemas tienen en promedio 18 años, considera esto para las referencias culturales que uses para personalizar el problema.\n\nNo agregues nada más a la respuesta aparte del problema inicial personalizado.\n\nEntrega respuestas breves, no te excedas mucho mas que el largo original del problema.`
  return prompt;
};

const solveExercisePrompt = (exercise: Exercise): string => {
  const prompt = `Explícame en pocas palabras, como si fuera un estudiante de secundaria, como resolver este ejercicio paso a paso, y menciona los principios o propiedades usados para llegar a la alternativa correcta\n\n${JSON.stringify(exercise, null, 2)}`;
  return prompt;
}

export {
  classifyPrompt,
  assignDifficultyPrompt,
  personalizePrompt,
  solveExercisePrompt,
}