import { GameStatus } from "~/enums/gameStatus";
import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface GamePlayed {
  name: string;
  status: GameStatus;
  totalQuestions: number;
  correctQuestions: number;
  earnedCoinds: number;
  earnedXp: number;
  category: QuizCategoryType;
  id: number;
}
