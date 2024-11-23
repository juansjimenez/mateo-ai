import { Exercise, PersonalizedExerciseFull } from "../types";

interface UnitData {
  unitId: string;
  accuracy: number;
}

interface SubjectData {
  subjectId: string;
  accuracy: number;
}

interface DataPoint {
  timestamp: Date;
  accuracy: number;
}

interface HistoryAnalysis {
  globalAccuracy: number;
  strengths: {
    subject: SubjectData[]
    units: UnitData[];
  },
  weaknesses: {
    subject: SubjectData[]
    units: UnitData[];
  }
}


function analyzeHistory(history: PersonalizedExerciseFull[]): HistoryAnalysis{
  const globalAccuracy = history.reduce((acc, curr) => acc + (curr.isCorrect ? 1 : 0), 0) / history.length;

  const subjects: Record<string, PersonalizedExerciseFull[]> = {};
  const units: Record<string, PersonalizedExerciseFull[]> = {};

  for (const exercise of history) {
    const originalExercise: Exercise = exercise.originalExerciseFull;

    if (!subjects[originalExercise.subjectId!]) {
      subjects[originalExercise.subjectId!] = [];
    }
    if (!units[originalExercise.unitId!]) {
      units[originalExercise.unitId!] = [];
    }

    subjects[originalExercise.subjectId!].push(exercise);
    units[originalExercise.unitId!].push(exercise);
  }

  const accuracyBySubject: SubjectData[] = Object.entries(subjects).map(([subjectId, exercises]) => {
    const accuracy = exercises.reduce((acc, curr) => acc + (curr.isCorrect ? 1 : 0), 0) / exercises.length;
    return { subjectId, accuracy };
  });

  const accuracyByUnit: UnitData[] = Object.entries(units).map(([unitId, exercises]) => {
    const accuracy = exercises.reduce((acc, curr) => acc + (curr.isCorrect ? 1 : 0), 0) / exercises.length;
    return { unitId, accuracy };
  });

  let strengths = {
    subject: [] as SubjectData[],
    units: [] as UnitData[],
  }
  let weaknesses = {
    subject: [] as SubjectData[],
    units: [] as UnitData[],
  }

  const sortedSubjects = accuracyBySubject.sort((a, b) => a.accuracy - b.accuracy);
  const sortedUnits = accuracyByUnit.sort((a, b) => a.accuracy - b.accuracy);

  strengths.subject = sortedSubjects.slice(0, 3);
  strengths.units = sortedUnits.slice(0, 3);

  weaknesses.subject = sortedSubjects.slice(-3);
  weaknesses.units = sortedUnits.slice(-3);


  const historyAnalysis: HistoryAnalysis = {
    globalAccuracy,
    strengths,
    weaknesses,
  };

  return historyAnalysis;
}

export { analyzeHistory }