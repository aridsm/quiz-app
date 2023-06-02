export interface CurrentGame {
  title: string;
  totalQuestions: number;
  correctAnswers: number;
  lives: number;
  xpGained: number;
  coinsGained: number;
  questions: [];
}
