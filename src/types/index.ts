interface Subject {
  identifier: string;
  name: string;
}

interface Unit {
  identifier: string;
  name: string;
  subjectId: string;
  tags?: string[];
}

type DifficultyLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type AnswerIndex = 0 | 1 | 2 | 3 | 4;

interface Exercise {
  identifier: string;
  statement: string;
  alternatives: string[];
  answerIndex?: AnswerIndex;
  subjectId?: string;
  unitId?: string;
  difficulty?: DifficultyLevel;
  tags?: string[];
  imageUrl?: string;
}

export type {
  Subject,
  Unit,
  DifficultyLevel,
  Exercise,
  AnswerIndex,
};  