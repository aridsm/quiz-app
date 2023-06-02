import { defineStore } from "pinia";
import { ref } from "vue";
import { GeographyQuizType } from "~/enums/geographyQuizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { Quiz } from "~/interfaces/Quiz";

export const useQuizzes = defineStore("useQuizzes", () => {
  const quizzes = ref<Quiz[]>([
    {
      name: "Bandeiras de Países",
      category: QuizCategoryType.Geography,
      id: 1,
      quizType: GeographyQuizType.Flag,
      isCountry: true,
      tags: ["geografia", "paises"],
    },
    {
      name: "Matemática Básica",
      category: QuizCategoryType.Mathematics,
      id: 2,
      quizType: undefined,
      isCountry: undefined,
      tags: [
        "matematica",
        "numero",
        "cálculos",
        "calculos",
        "contas",
        "basica",
      ],
    },
    {
      name: "Anatomia Humana",
      category: QuizCategoryType.Biology,
      id: 3,
      quizType: undefined,
      isCountry: undefined,
      tags: ["corpo humano", "corpo", "humano", "ciências", "biologia"],
    },
    {
      name: "Reino Animal",
      category: QuizCategoryType.Biology,
      id: 4,
      quizType: undefined,
      isCountry: undefined,
      tags: ["animais", "biologia"],
    },
    {
      name: "Bandeiras de Estados do Brasil",
      category: QuizCategoryType.Geography,
      id: 5,
      quizType: GeographyQuizType.Flag,
      isCountry: false,
      tags: ["brazil", "geografia"],
    },
    {
      name: "Raízes e Potências",
      category: QuizCategoryType.Mathematics,
      id: 6,
      quizType: undefined,
      isCountry: undefined,
      tags: [
        "raizes",
        "potencias",
        "matematica",
        "calculos",
        "cálculos",
        "contas",
      ],
    },
    {
      name: "Capitais de Países",
      category: QuizCategoryType.Geography,
      id: 7,
      quizType: GeographyQuizType.Capital,
      isCountry: true,
      tags: ["capital", "paises", "geografia"],
    },
    {
      name: "Bandeira de Países",
      category: QuizCategoryType.Biology,
      id: 8,
      quizType: undefined,
      isCountry: undefined,
      tags: [],
    },
    {
      name: "Capitais de Estados do Brasil",
      category: QuizCategoryType.Geography,
      id: 9,
      quizType: GeographyQuizType.Capital,
      isCountry: false,
      tags: ["brazil", "capital", "geografia"],
    },
  ]);

  function filterBy({
    category,
    name = "",
  }: {
    category?: QuizCategoryType;
    name?: string;
  }) {
    const filteredByName = quizzes.value.filter((quiz: Quiz) => {
      const includesName = quiz.name.toLowerCase().includes(name.toLowerCase());

      const includesTags = quiz.tags.some((tag: string) =>
        tag.toLowerCase().includes(name.toLowerCase())
      );

      return includesName || includesTags;
    });

    let quizzesFiltered: Quiz[] = filteredByName;

    if (category) {
      quizzesFiltered = filteredByName.filter((quiz: Quiz) => {
        return quiz.category === category;
      });
    }
    return quizzesFiltered;
  }

  return { quizzes, filterBy };
});
