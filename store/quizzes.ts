import { defineStore } from "pinia";
import { ref } from "vue";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { QuizType } from "~/enums/quizType";
import { Quiz } from "~/interfaces/Quiz";
import normalizeString from "~/utilities/normalizeString";

export const useQuizzes = defineStore("useQuizzes", () => {
  const quizzes = ref<Quiz[]>([
    {
      name: "Bandeiras de Países",
      category: QuizCategoryType.Geography,
      id: QuizType.CountryFlag,
      acceptAnswerMode: true,
      source: "quizzes/geography/countries.json",
    },
    {
      name: "Matemática Básica",
      category: QuizCategoryType.Mathematics,
      id: QuizType.BasicMaths,
      acceptAnswerMode: false,
      source: "quizzes/mathematics/basicMath.json",
    },
    {
      name: "O corpo humano",
      category: QuizCategoryType.Biology,
      id: QuizType.HumanAnatomy,
      acceptAnswerMode: false,
      source: "quizzes/biology/humanBody.json",
    },
    {
      name: "Reino Animal",
      category: QuizCategoryType.Biology,
      id: QuizType.AnimalKingdom,
      acceptAnswerMode: false,
      source: "quizzes/biology/animalKingdom.json",
    },
    {
      name: "Bandeiras de Estados do Brasil",
      category: QuizCategoryType.Geography,
      id: QuizType.BrazilStatesFlag,
      acceptAnswerMode: true,
      source: "quizzes/geography/brazil.json",
    },
    {
      name: "Raízes e Potências",
      category: QuizCategoryType.Mathematics,
      id: QuizType.RootsAndPowers,
      acceptAnswerMode: true,
      source: "quizzes/mathematics/rootAndPowers.json",
    },
    {
      name: "Reino Planta",
      category: QuizCategoryType.Biology,
      id: QuizType.PlantaeKingdom,
      acceptAnswerMode: false,
      source: "quizzes/biology/plantaeKingdom.json",
    },
    {
      name: "Capitais de Países",
      category: QuizCategoryType.Geography,
      id: QuizType.CountryCapital,
      acceptAnswerMode: true,
      source: "quizzes/geography/countries.json",
    },
    {
      name: "Capitais de Estados do Brasil",
      category: QuizCategoryType.Geography,
      id: QuizType.BrazilStatesCapital,
      acceptAnswerMode: true,
      source: "quizzes/geography/brazil.json",
    },
  ]);

  function filterBy({
    category,
    name = "",
  }: {
    category?: QuizCategoryType;
    name?: string;
  }) {
    const searchNameNormalized = normalizeString(name);
    const filteredByName = quizzes.value.filter((quiz: Quiz) => {
      const quizNameNormalized = normalizeString(quiz.name);
      const includesName = quizNameNormalized
        .toLowerCase()
        .includes(searchNameNormalized);

      return includesName;
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
