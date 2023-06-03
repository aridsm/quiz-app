import { defineStore } from "pinia";
import { ref } from "vue";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { QuizType } from "~/enums/quizType";
import { Quiz } from "~/interfaces/Quiz";

export const useQuizzes = defineStore("useQuizzes", () => {
  const quizzes = ref<Quiz[]>([
    {
      name: "Bandeiras de Países",
      category: QuizCategoryType.Geography,
      id: QuizType.CountryFlag,
      acceptAnswerMode: true,
      tags: ["geografia", "paises"],
    },
    {
      name: "Matemática Básica",
      category: QuizCategoryType.Mathematics,
      id: QuizType.BasicMaths,
      acceptAnswerMode: true,
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
      id: QuizType.HumanAnatomy,
      acceptAnswerMode: false,
      tags: ["corpo humano", "corpo", "humano", "ciências", "biologia"],
    },
    {
      name: "Reino Animal",
      category: QuizCategoryType.Biology,
      id: QuizType.AnimalKingdom,
      acceptAnswerMode: false,
      tags: ["animais", "biologia"],
    },
    {
      name: "Bandeiras de Estados do Brasil",
      category: QuizCategoryType.Geography,
      id: QuizType.BrazilStatesFlag,
      acceptAnswerMode: true,
      tags: ["brazil", "geografia"],
    },
    {
      name: "Raízes e Potências",
      category: QuizCategoryType.Mathematics,
      id: QuizType.RootsAndPowers,
      acceptAnswerMode: true,
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
      name: "Reino Planta",
      category: QuizCategoryType.Biology,
      id: QuizType.PlantaeKingdom,
      acceptAnswerMode: false,
      tags: ["plantas", "biologia"],
    },
    {
      name: "Capitais de Países",
      category: QuizCategoryType.Geography,
      id: QuizType.CountryCapital,
      acceptAnswerMode: true,
      tags: ["capital", "paises", "geografia"],
    },
    {
      name: "Capitais de Estados do Brasil",
      category: QuizCategoryType.Geography,
      id: QuizType.BrazilStatesCapital,
      acceptAnswerMode: true,
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
