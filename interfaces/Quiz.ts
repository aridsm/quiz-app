import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface Quiz {
  name: string;
  id: number;
  category: QuizCategoryType;
}
