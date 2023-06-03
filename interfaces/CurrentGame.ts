import { AnswerMode } from "~/enums/answerMode";
import { GeoQuizType } from "~/enums/geoQuizType";
import { QuizType } from "~/enums/quizType";

export interface CurrentGame {
  title: string;
  totalQuestions: number;
  correctAnswers: number;
  lives: number;
  xpGained: number;
  coinsGained: number;
  questions: any[];
  quizId: undefined | QuizType;
  geoQuizType: GeoQuizType | null;
  answerMode: null | AnswerMode;
}
