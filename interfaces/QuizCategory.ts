import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface QuizCategory {
  id: QuizCategoryType;
  count: number;
  name: string;
}
