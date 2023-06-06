import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface GamePlayed {
  name: string;
  status: CurrentGameStatus;
  totalQuestions: number;
  correctQuestions: number;
  earnedCoins: number;
  earnedXp: number;
  category: QuizCategoryType | null;
  id: number;
}
