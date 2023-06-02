import { AnswerMode } from "~/enums/answerMode";
import { GeographyAnswerType } from "~/enums/geographyAnswerType";
import { GeographyQuizType } from "~/enums/geographyQuizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface GameSetting {
  quizName: string;
  category: QuizCategoryType | null;
  answerMode: AnswerMode | null;
  numberOfQuestions: number;
  quizType: GeographyQuizType | undefined;
  isCountry: boolean | undefined;
  geoQuizType: GeographyAnswerType | undefined;
  acceptAnswerMode: boolean;
  countdown: number | false; // segundos
}
