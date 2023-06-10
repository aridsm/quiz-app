export interface Question {
  question: string;
  item: string | null;
  correctAnswer: number | string | string[];
  otherAnswers: string[] | number[];
}
