import { Question } from "./Question";
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { AnswerMode } from "~/enums/answerMode";
import { GeoQuizType } from "~/enums/geoQuizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { QuizType } from "~/enums/quizType";
import { AnswerSimilarity } from "~/enums/answerSimilarity";

export interface CurrentGame {
  title: string;
  totalQuestions: number | null;
  correctAnswers: number;
  totalLives: number;
  lives: number;
  xpGained: number;
  coinsGained: number;
  questions: Question[];
  quizId: undefined | QuizType;
  geoQuizType: GeoQuizType | null;
  answerMode: null | AnswerMode;
  category: null | QuizCategoryType;
  currentQuestionIndex: number;
  status: CurrentGameStatus;
  stars: number;
  infiniteMode: boolean;
  answerSimilarity: AnswerSimilarity;
  skipChances: number;
}
