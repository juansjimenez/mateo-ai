import { uuid } from 'uuidv4';
import { askChatGPT } from '../integrations/chatgpt';
import { personalizePrompt } from '../prompts';
import { Exercise, PersonalizedExercise, Preference } from '../types';

interface PersonalizeExercisesParams {
  profileIdentifier: string;
  exercises: Exercise[];
  preferences: Preference[];
}
export async function personalizeExercises({
  profileIdentifier,
  exercises,
  preferences,
}: PersonalizeExercisesParams): Promise<PersonalizedExercise[]> {
  const exercisePromises = exercises.map(async (exercise) => {
    const prompt = personalizePrompt({
      exercise,
      preferences,
    })

    const personalizedStatement = await askChatGPT(prompt);

    return {
      ...exercise, 
      identifier: uuid(),
      statement: personalizedStatement,
      profileIdentifier,
      originalExerciseIdentifier: exercise.identifier,
      preferences,
    };
  })

  const personalizedExercises = await Promise.all(exercisePromises);
  return personalizedExercises;
}