import { AnswerMode } from "~/enums/answerMode";
import { GeographyQuizType } from "~/enums/geographyQuizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface GameSetting {
  quizName: string;
  category: QuizCategoryType | null;
  answerMode: AnswerMode;
  numberOfQuestions: number;
  quizType: GeographyQuizType | undefined;
  isCountry: boolean | undefined;
}
