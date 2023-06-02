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
  isCountry: boolean | undefined;
  acceptAnswerMode: boolean;
  countdown: number | false; // segundos
  geoQuizType: GeoQuizType | null;
}
