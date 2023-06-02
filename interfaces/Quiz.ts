import { GeographyQuizType } from "~/enums/geographyQuizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface Quiz {
  name: string;
  id: number;
  category: QuizCategoryType;
  tags: string[];
  quizType: GeographyQuizType | undefined;
  isCountry: boolean | undefined;
}
