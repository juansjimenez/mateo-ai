type DifficultyLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type AnswerIndex = 0 | 1 | 2 | 3 | 4;

interface Exercise {
  id: string;
  unitId: string;
  difficulty: DifficultyLevel;
  statement: string;
  alternatives: string[];
  answerIndex: AnswerIndex;
  tags?: string[];
  imageUrl?: string;
}