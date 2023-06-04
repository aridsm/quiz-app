export interface Question {
  question: string;
  item: string | number | null;
  correctAnswer: number | string | string[];
  otherAnswers: string[] | number[];
}
