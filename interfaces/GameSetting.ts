import { AnswerMode } from "~/enums/answerMode";
import { GeoQuizType } from "~/enums/geoQuizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { QuizType } from "~/enums/quizType";

export interface GameSetting {
  quizId: QuizType | undefined;
  quizName: string;
  category: QuizCategoryType | null;
  answerMode: AnswerMode | null;
  numberOfQuestions: number;
  acceptAnswerMode: boolean;
  geoQuizType: GeoQuizType | null;
  infiniteMode: boolean;
}
