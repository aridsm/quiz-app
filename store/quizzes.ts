import { defineStore } from "pinia";
import { ref } from "vue";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { Quiz } from "~/interfaces/Quiz";

export const useQuizzes = defineStore("useQuizzes", () => {
  const quizzes = ref<Quiz[]>([
    {
      name: "Bandeiras de Países",
      category: QuizCategoryType.Geography,
      id: 1,
    },
    {
      name: "Matemática Básica",
      category: QuizCategoryType.Mathematics,
      id: 2,
    },
    {
      name: "Anatomia Humana",
      category: QuizCategoryType.Biology,
      id: 3,
    },
    {
      name: "Reino Animal",
      category: QuizCategoryType.Biology,
      id: 4,
    },
    {
      name: "Bandeiras de Estados do Brasil",
      category: QuizCategoryType.Geography,
      id: 5,
    },
    {
      name: "Raízes e Potências",
      category: QuizCategoryType.Mathematics,
      id: 6,
    },
    {
      name: "Capitais de Países",
      category: QuizCategoryType.Geography,
      id: 7,
    },
    {
      name: "Bandeira de Países",
      category: QuizCategoryType.Biology,
      id: 8,
    },
    {
      name: "Capitais de Estados do Brasil",
      category: QuizCategoryType.Geography,
      id: 9,
    },
  ]);

  return { quizzes };
});
