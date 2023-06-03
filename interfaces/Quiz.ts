import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface Quiz {
  name: string;
  id: number;
  category: QuizCategoryType;
  tags: string[];
  acceptAnswerMode: boolean; // se o usuário pode escolher o modo de resposta
}
