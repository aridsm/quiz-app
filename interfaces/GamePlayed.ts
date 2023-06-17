import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface GamePlayed {
  name: string;
  status: CurrentGameStatus;
  totalQuestions: number | null;
  correctQuestions: number;
  earnedCoins: number;
  earnedXp: number;
  category: QuizCategoryType;
  id: number;
}
