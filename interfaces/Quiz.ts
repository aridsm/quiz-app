import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface Quiz {
  name: string;
  id: number;
  category: QuizCategoryType;
  acceptAnswerMode: boolean; // se o usuário pode escolher o modo de resposta
  source: string;
}
